export const categories = [
  "全部单块",
  "音箱与前级",
  "箱体",
  "失真与过载",
  "均衡与动态",
  "调制与移调",
  "延迟与混响",
  "工具与加载器",
];
export const origins = ["全部来源", "原厂", "Marketplace", "Guitar Essentials"];
export const costs = ["全部", "随固件", "免费", "付费", "特别版"];
export const normalize = (s) =>
  String(s)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[×]/g, "x")
    .replace(/[\s_\-–—/*]+/g, "");
export function searchText(b) {
  return normalize(
    [
      b.name,
      ...b.aliases,
      b.vendor,
      b.description,
      b.category,
      b.subCategory,
      b.origin,
      b.cost,
      ...b.controls.map((c) =>
        [
          c.name,
          c.group,
          c.description,
          ...(c.options || []).map((o) => o.label),
        ].join(" "),
      ),
    ].join(" "),
  );
}
export function filterBlocks(
  blocks,
  {
    query = "",
    category = "全部单块",
    origin = "全部来源",
    cost = "全部",
    coverage = "全部资料",
  } = {},
) {
  const words = query.trim().split(/\s+/).filter(Boolean).map(normalize);
  return blocks.filter(
    (b) =>
      (category === "全部单块" || b.category === category) &&
      (origin === "全部来源" || b.origin === origin) &&
      (cost === "全部" || b.cost === cost) &&
      (coverage === "全部资料" ||
        (coverage === "有面板说明"
          ? b.controls.length > 0
          : b.controls.length === 0)) &&
      words.every((w) => searchText(b).includes(w)),
  );
}
export function readRoute(hash) {
  const p = new URLSearchParams(hash.replace(/^#/, ""));
  return {
    id: p.get("block") || "",
    query: p.get("q") || "",
    category: categories.includes(p.get("category"))
      ? p.get("category")
      : "全部单块",
    origin: origins.includes(p.get("origin")) ? p.get("origin") : "全部来源",
    cost: costs.includes(p.get("cost")) ? p.get("cost") : "全部",
    coverage: ["有面板说明", "面板待核实"].includes(p.get("coverage"))
      ? p.get("coverage")
      : "全部资料",
  };
}
export function writeRoute(s) {
  const p = new URLSearchParams();
  if (s.id) p.set("block", s.id);
  if (s.query) p.set("q", s.query);
  if (s.category !== "全部单块") p.set("category", s.category);
  if (s.origin !== "全部来源") p.set("origin", s.origin);
  if (s.cost !== "全部") p.set("cost", s.cost);
  if (s.coverage !== "全部资料") p.set("coverage", s.coverage);
  return "#" + p.toString();
}
export const number = (n) =>
  Number.isFinite(n) ? Number(n.toFixed(3)).toString() : String(n ?? "");
