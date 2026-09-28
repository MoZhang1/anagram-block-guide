import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import crypto from "node:crypto";
import data from "../src/data/catalog.json" with { type: "json" };
import pixels from "../src/data/pixel-manifest.json" with { type: "json" };
import {
  dexNumbers,
  adjacentBlock,
  readFavorites,
  storeFavorites,
  favoriteKey,
  dexDescription,
} from "../src/dex.mjs";

test("stable dex numbers cover every catalog entry without collisions", () => {
  assert.equal(dexNumbers.size, 233);
  assert.equal(new Set(dexNumbers.values()).size, 233);
  for (const block of data.blocks)
    assert.match(dexNumbers.get(block.id), /^\d{3}$/);
  assert.equal(dexNumbers.get("factory-harmonic-booster"), "001");
  assert.equal(dexNumbers.get("market-sonic-enhancer"), "194");
});
test("all 233 pixel sprites are small PNGs linked to unchanged original pictures", () => {
  assert.equal(Object.keys(pixels).length, 233);
  for (const block of data.blocks) {
    const sprite = pixels[block.id];
    assert.equal(sprite.source, block.images[0].src);
    const source = fs.readFileSync(
      new URL("../public/" + sprite.source, import.meta.url),
    );
    assert.equal(
      crypto.createHash("sha256").update(source).digest("hex"),
      sprite.sourceSha256,
    );
    const png = fs.readFileSync(
      new URL("../public/" + sprite.src, import.meta.url),
    );
    assert.equal(png.subarray(1, 4).toString(), "PNG");
    assert.equal(png.readUInt32BE(16), 40);
    assert.equal(png.readUInt32BE(20), 40);
    assert(png.length < 12000);
  }
});
test("favorite storage validates IDs, deduplicates and tolerates blocked storage", () => {
  const one = data.blocks[0].id;
  const memory = {
    value: JSON.stringify([one, one, "invalid"]),
    getItem() {
      return this.value;
    },
    setItem(k, v) {
      assert.equal(k, favoriteKey);
      this.value = v;
    },
  };
  assert.deepEqual(readFavorites(memory), [one]);
  assert(storeFavorites(memory, [one]));
  assert.deepEqual(readFavorites(memory), [one]);
  memory.value = "broken";
  assert.deepEqual(readFavorites(memory), []);
  const blocked = {
    getItem() {
      throw Error("denied");
    },
    setItem() {
      throw Error("denied");
    },
  };
  assert.deepEqual(readFavorites(blocked), []);
  assert.equal(storeFavorites(blocked, [one]), false);
});
test("navigation wraps inside filtered collection, not across all entries", () => {
  const b = data.blocks.slice(0, 3);
  assert.equal(adjacentBlock(b, b[0].id, -1).id, b[2].id);
  assert.equal(adjacentBlock(b, b[2].id, 1).id, b[0].id);
  assert.equal(adjacentBlock([], b[0].id, 1), null);
});
test("dex copy remains Chinese and does not rewrite source evidence", () => {
  for (const block of data.blocks)
    assert(/[\u4e00-\u9fff]/.test(dexDescription(block)));
  assert.match(dexDescription(data.blocks[0]), /Character/);
  assert.match(data.blocks[0].description, /三段均衡/);
});
