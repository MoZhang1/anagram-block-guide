import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import {
  filterBlocks,
  readRoute,
  writeRoute,
  categories,
  normalize,
} from "../src/catalog.mjs";
const data = JSON.parse(
  fs.readFileSync(new URL("../src/data/catalog.json", import.meta.url)),
);
const b = data.blocks;
const control = (block, name) => b.find(x => x.name === block).controls.find(c => c.name === name);
test('specific controls retain their documented meaning', () => {
  assert.match(control('Vintage Microtubes','Level').description, /过载支路/);
  assert.match(control('Pirkko Chorus Deluxe','Width').description, /音高调制/);
  assert.match(control('Cognate Hologram','Width').description, /Mid\/Side/);
  assert.match(control('Cognate Polymath','Attack').adjustment, /负值渐入/);
  assert.match(control('Bass 3500','Low Pass').description, /100 Hz/);
  assert.match(control('Bass 3500','High Pass').description, /10 kHz/);
  assert.match(control('Bass Driver','Bass Freq').description, /频率/);
  assert(!control('Bass Driver','Bass Freq').description.includes('Q'));
  assert.match(control('Gentle','Low Cut').description, /开关/);
  assert.match(control('Gain','Gain').adjustment, /0 dB/);
});
test('original names, exact image labels and bounded coordinates are preserved', () => {
  for (const block of b) for (const c of block.controls) for (const r of c.panelRefs || []) {
    assert(block.images[r.imageIndex]?.panel, `${block.name}: ${c.name}`);
    assert(r.label && r.method === 'exact-label');
    assert(r.box.length === 4 && r.box.every(n => n >= 0 && n <= 1));
    assert(r.box[0] + r.box[2] <= 1.001);
    assert(r.box[1] + r.box[3] <= 1.001);
  }
  assert.equal(control('Harmonic Booster','Character').panelRefs[0].label, 'CHRCTR');
  assert.equal(control('Harmonic Booster','Bass').panelRefs.length, 0);
  assert.equal(control('Sonic Enhancer','Enhance').panelRefs.find(r=>r.imageIndex === 1).label, 'ENHANCE');
  assert.equal(control('Cognate Polymath','Attack').panelRefs[0].imageIndex, 2);
});
test('editorial advice and manufacturer function sources stay distinct', () => {
  assert(control('Sonic Enhancer','Enhance').explanationSource.startsWith('https://marketplace.anagram.shop/'));
  assert.match(control('Harmonic Booster','Boost').explanationBasis, /实体/);
  assert.equal(control('Harmonic Booster','Boost').range, undefined);
  assert.match(control('Cognate Kinetic','Vactrol').explanationBasis, /待核实/);
  assert(b.flatMap(x=>x.controls).filter(c=>c.adjustment).length > 900);
  assert(!fs.readFileSync(new URL('../src/main.jsx',import.meta.url),'utf8').includes('这个单块做什么'));
});
test('parameter listening advice participates in search', () => {
  assert(filterBlocks(b,{query:'负值渐入'}).some(x=>x.name === 'Cognate Polymath'));
});
test("scope matches official snapshots", () => {
  assert.equal(b.length, 233);
  assert.equal(b.filter((x) => x.origin === "原厂").length, 121);
  assert.equal(b.filter((x) => x.origin === "Marketplace").length, 97);
  assert.equal(b.filter((x) => x.origin === "Guitar Essentials").length, 15);
  assert.equal(new Set(b.map((x) => x.id)).size, b.length);
});
test("every entry has images, Chinese introduction and sources", () => {
  for (const x of b) {
    assert(x.images.length, x.name);
    assert(/[\u4e00-\u9fff]/.test(x.description), x.name);
    assert(x.sources.length, x.name);
    assert(categories.includes(x.category), x.name);
    for (const i of x.images) {
      assert(!i.src.startsWith("http"), x.name + " image not local");
      assert(
        fs.existsSync(new URL("../public/" + i.src, import.meta.url)),
        i.src,
      );
    }
  }
});
test("all ordinary factory and Marketplace entries have panel explanations", () => {
  for (const x of b.filter((x) => x.origin !== "Guitar Essentials")) {
    assert(x.controls.length, x.name);
    for (const c of x.controls)
      assert(/[\u4e00-\u9fff]/.test(c.description), x.name + " " + c.name);
  }
});
test("marketplace parameter data has ranges and provenance", () => {
  for (const x of b.filter((x) => x.origin === "Marketplace")) {
    assert(x.sources.some((s) => s.url.startsWith("https://api.mod.audio/")));
    for (const c of x.controls.filter((c) => c.evidence === "metadata")) {
      assert(c.symbol);
      assert(Number.isFinite(c.range.minimum));
      assert(c.range.maximum >= c.range.minimum);
      assert(Number.isFinite(c.range.default));
    }
  }
});
test("search recognizes former name and Chinese effects", () => {
  assert(
    filterBlocks(b, { query: "Peggy Bass" }).some(
      (x) => x.name === "70s Peggy",
    ),
  );
  assert(
    filterBlocks(b, { query: "sonic enhancer" }).some(
      (x) => x.name === "Sonic Enhancer",
    ),
  );
  assert(filterBlocks(b, { query: "八度" }).some((x) => x.name === "Octa"));
  assert(
    filterBlocks(b, { query: "Definition" }).some(
      (x) => x.name === "Sonic Enhancer",
    ),
  );
  assert.equal(filterBlocks(b, { query: "zzzz-no-match-987" }).length, 0);
});
test("filters intersect and can be reset", () => {
  const r = filterBlocks(b, {
    origin: "Marketplace",
    cost: "免费",
    category: "均衡与动态",
  });
  assert(r.length > 0);
  assert(
    r.every(
      (x) =>
        x.origin === "Marketplace" &&
        x.cost === "免费" &&
        x.category === "均衡与动态",
    ),
  );
  assert.equal(filterBlocks(b).length, 233);
  assert.equal(filterBlocks(b, { coverage: "面板待核实" }).length, 15);
  assert.equal(filterBlocks(b, { coverage: "可图文定位" }).length, 128);
  assert.equal(readRoute('#coverage=' + encodeURIComponent('可图文定位')).coverage, '可图文定位');
});
test("share route survives encoding, unknown filters are sanitized", () => {
  const s = {
    id: "market-sonic-enhancer",
    query: "低频 增强",
    category: "均衡与动态",
    origin: "Marketplace",
    cost: "免费",
    coverage: "有面板说明",
  };
  assert.deepEqual(readRoute(writeRoute(s)), s);
  assert.equal(readRoute("#category=garbage").category, "全部单块");
  assert.equal(normalize("Uè Uè"), normalize("ue ue"));
});
test("private local paths and payloads never enter public data", () => {
  const str = JSON.stringify(data);
  for (const pattern of [
    "/Users/",
    "gho_",
    "Bearer ",
    "Cookie",
    "firmware.tar",
  ])
    assert(!str.includes(pattern), pattern);
});
