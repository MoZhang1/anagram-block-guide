import data from "./data/catalog.json" with { type: "json" };
import numbers from "./data/dex-numbers.json" with { type: "json" };

// Persisted explicit IDs keep numbering stable when filters/order change.
export const dexNumbers = new Map(Object.entries(numbers));
export const favoriteKey = "anagram-dex:favorites:v1";
const knownIds = new Set(data.blocks.map((block) => block.id));
export function readFavorites(storage) {
  try {
    const value = JSON.parse(storage.getItem(favoriteKey) || "[]");
    return Array.isArray(value)
      ? [...new Set(value.filter((id) => knownIds.has(id)))]
      : [];
  } catch {
    return [];
  }
}
export function storeFavorites(storage, ids) {
  try {
    storage.setItem(
      favoriteKey,
      JSON.stringify(ids.filter((id) => knownIds.has(id))),
    );
    return true;
  } catch {
    return false;
  }
}
const entries = {
  "factory-harmonic-booster":
    "偏爱干净音色的前级。转动 Character，会逐渐显露它的音色轮廓。",
  "factory-vintage-microtubes":
    "带着复古颗粒的过载。Era 改变音色性格，Blend 则决定保留多少干净信号。",
  "factory-microtubes-b3k":
    "声音带着鲜明的颗粒。用 Blend 留住干净信号，再用 Drive 加入过载。",
  "factory-alpha-omicron":
    "拥有两种失真性格。Mod 决定 Alpha 与 Omega 的比例，Blend 留住原本的音色。",
  "factory-gain":
    "只负责电平的朴素单块。让声音变大或变小，不额外加入音色染色。",
  "market-sonic-enhancer":
    "擅长修整声音的厚度与细节。Enhance 与 Definition 分别负责不同的增强处理。",
};
export function dexDescription(block) {
  return entries[block.id] || block.description;
}
export function adjacentBlock(blocks, id, direction) {
  if (!blocks.length) return null;
  const index = Math.max(
    0,
    blocks.findIndex((block) => block.id === id),
  );
  return blocks[(index + direction + blocks.length) % blocks.length];
}
