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
