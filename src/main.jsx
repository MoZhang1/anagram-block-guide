import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Search,
  X,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  Heart,
  Share2,
  Check,
  SlidersHorizontal,
  ArrowLeft,
} from "lucide-react";
import data from "./data/catalog.json";
import pixels from "./data/pixel-manifest.json";
import {
  categories,
  origins,
  costs,
  filterBlocks,
  readRoute,
  writeRoute,
} from "./catalog.mjs";
import {
  dexNumbers,
  dexDescription,
  adjacentBlock,
  readFavorites,
  storeFavorites,
} from "./dex.mjs";
import { PanelGuide, Modal, SourceLink } from "./PanelGuide.jsx";
import "./styles.css";

const assetUrl = (path) => import.meta.env.BASE_URL + path;
const initial = readRoute(location.hash);
const resetFilters = {
  query: "",
  category: "全部单块",
  origin: "全部来源",
  cost: "全部",
  coverage: "全部资料",
};
const REPO = "https://github.com/MoZhang1/anagram-block-guide";

function Directory({
  state,
  update,
  blocks,
  selected,
  choose,
  searchRef,
  favorites,
  onlyFavorites,
  setOnlyFavorites,
}) {
  const [advanced, setAdvanced] = useState(false);
  const listRef = useRef(null);
  useEffect(() => {
    listRef.current
      ?.querySelector('[aria-pressed="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [selected?.id]);
  const clear = () => {
    update(resetFilters);
    setOnlyFavorites(false);
  };
  return (
    <div className="lcd directory-screen">
      <div className="search-box">
        <Search size={30} strokeWidth={3} aria-hidden="true" />
        <input
          ref={searchRef}
          type="search"
          value={state.query}
          onChange={(e) => update({ query: e.target.value })}
          placeholder="搜索单块名称"
          aria-label="搜索单块名称、旋钮或音色"
        />
        {state.query && (
          <button onClick={() => update({ query: "" })} aria-label="清空搜索">
            <X size={24} />
          </button>
        )}
      </div>
      <div className="primary-filters">
        <select
          aria-label="属性筛选"
          value={state.category}
          onChange={(e) => update({ category: e.target.value })}
        >
          {categories.map((x) => (
            <option key={x} value={x}>
              {x === "全部单块" ? "全部属性" : x}
            </option>
          ))}
        </select>
        <select
          aria-label="来源筛选"
          value={state.origin}
          onChange={(e) => update({ origin: e.target.value })}
        >
          {origins.map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
      </div>
      <div className="directory-list" ref={listRef} aria-label="单块列表">
        {blocks.length ? (
          blocks.map((b) => (
            <button
              key={b.id}
              onClick={() => choose(b.id)}
              className={"dex-row" + (b.id === selected?.id ? " selected" : "")}
              aria-pressed={b.id === selected?.id}
            >
              <img
                className="pixel-sprite"
                src={assetUrl(pixels[b.id].src)}
                width="56"
                height="56"
                alt=""
                loading="lazy"
              />
              <span className="dex-number">{dexNumbers.get(b.id)}</span>
              <span className="dex-name">{b.name}</span>
              {favorites.includes(b.id) ? (
                <Heart size={17} fill="currentColor" aria-label="已收藏" />
              ) : (
                <ChevronRight className="row-arrow" size={23} strokeWidth={3} />
              )}
            </button>
          ))
        ) : (
          <div className="empty">
            <Search size={36} />
            <h2>没有找到单块</h2>
            <p>试试其他名称，或清除筛选。</p>
            <button className="lcd-button" onClick={clear}>
              清除筛选
            </button>
          </div>
        )}
      </div>
      <div className="directory-status">
        <span aria-live="polite">
          {blocks.length === data.blocks.length ? "收录" : "找到"}{" "}
          {blocks.length} 个条目
        </span>
        <button
          className={advanced ? "active" : ""}
          onClick={() => setAdvanced(!advanced)}
          aria-expanded={advanced}
          aria-label="更多筛选"
          title="更多筛选"
        >
          <SlidersHorizontal size={22} />
        </button>
      </div>
      {advanced && (
        <div className="advanced-filters">
          <label>
            获取方式
            <select
              value={state.cost}
              onChange={(e) => update({ cost: e.target.value })}
            >
              {costs.map((x) => (
                <option key={x}>{x}</option>
              ))}
            </select>
          </label>
          <label>
            资料完整度
            <select
              value={state.coverage}
              onChange={(e) => update({ coverage: e.target.value })}
            >
              {["全部资料", "有面板说明", "可图文定位", "面板待核实"].map(
                (x) => (
                  <option key={x}>{x}</option>
                ),
              )}
            </select>
          </label>
          <label className="check-field">
            <input
              type="checkbox"
              checked={onlyFavorites}
              onChange={(e) => setOnlyFavorites(e.target.checked)}
            />
            只看收藏（{favorites.length}）
          </label>
          <button className="text-button" onClick={clear}>
            清除筛选
          </button>
        </div>
      )}
    </div>
  );
}

function DeviceKeys({ navigate, confirm, back }) {
  return (
    <div className="device-keys">
      <div className="dpad" aria-label="图鉴方向键">
        <button
          className="dpad-up"
          onClick={() => navigate(-1)}
          aria-label="上一个单块"
        >
          <ChevronUp />
        </button>
        <button className="dpad-left" onClick={back} aria-label="返回列表">
          <ChevronLeft />
        </button>
        <i aria-hidden="true" />
        <button
          className="dpad-right"
          onClick={confirm}
          aria-label="查看当前单块"
        >
          <ChevronRight />
        </button>
        <button
          className="dpad-down"
          onClick={() => navigate(1)}
          aria-label="下一个单块"
        >
          <ChevronDown />
        </button>
      </div>
      <button className="hardware-key" onClick={confirm}>
        <i aria-hidden="true" />
        <span>A 确认</span>
      </button>
      <button className="hardware-key" onClick={back}>
        <i aria-hidden="true" />
        <span>B 返回</span>
      </button>
      <div className="speaker" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </div>
    </div>
  );
}

function Detail({
  block,
  onBack,
  navigate,
  favorite,
  toggleFavorite,
  storageNote,
}) {
  const [copied, setCopied] = useState(false);
  const [fallback, setFallback] = useState("");
  const copyTimer = useRef(null);
  useEffect(() => () => clearTimeout(copyTimer.current), []);
  async function share() {
    const url =
      location.href.split("#")[0] + "#block=" + encodeURIComponent(block.id);
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2200);
    } catch {
      setFallback(url);
    }
  }
  if (!block)
    return (
      <main className="lcd detail-screen empty">
        <Search size={40} />
        <h1>暂无匹配条目</h1>
        <p>修改左侧筛选后再试试。</p>
        <button className="lcd-button mobile-back" onClick={onBack}>
          返回列表
        </button>
      </main>
    );
  return (
    <main className="lcd detail-screen" id="detail">
      <div className="detail-scroll">
        <button className="mobile-back text-button" onClick={onBack}>
          <ArrowLeft size={18} />
          返回列表
        </button>
        <div className="index-line">
          <span>No.{dexNumbers.get(block.id)}</span>
          <span className="signal" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </div>
        <h1 className="block-title">{block.name}</h1>
        <div className="type-labels">
          <span>{block.subCategory || block.category}</span>
          <span>
            {block.origin === "Marketplace"
              ? "扩展"
              : block.origin === "Guitar Essentials"
                ? "特别版"
                : block.origin}
          </span>
        </div>
        <div className="dex-entry">{dexDescription(block)}</div>
        <PanelGuide block={block} />
        <details className="provenance">
          <summary>资料与版本</summary>
          <div className="technical-copy">
            <p>
              {block.vendor} · {block.cost}
              {block.price ? ` · ${block.price}（采集时标价）` : ""}
            </p>
            {block.aliases.length > 0 && (
              <p>别名：{block.aliases.join("、")}</p>
            )}
            <p>{block.description}</p>
            {block.setup && (
              <p>
                <strong>调节顺序：</strong>
                {block.setup}
              </p>
            )}
            <p>{block.note}</p>
            <div className="source-links">
              {block.sources.map((s) => (
                <SourceLink key={s.url} url={s.url}>
                  {s.label}
                </SourceLink>
              ))}
            </div>
            <p>
              清单 {data.updated} · 说明修订{" "}
              {data.contentUpdated || data.updated} ·{" "}
              {block.version
                ? `插件 ${block.version}`
                : `KosmOS ${data.firmware}`}
            </p>
            <p>
              像素图由原图缩色生成，仅作列表辨识；右侧使用未处理原图。图片与品牌归各权利人所有。
            </p>
          </div>
        </details>
      </div>
      {fallback && (
        <label className="copy-fallback">
          复制单块链接
          <input readOnly value={fallback} onFocus={(e) => e.target.select()} />
        </label>
      )}
      {storageNote && (
        <p className="storage-note" role="status">
          {storageNote}
        </p>
      )}
      <nav className="detail-actions" aria-label="图鉴操作">
        <button onClick={() => navigate(-1)}>上一单块</button>
        <button onClick={toggleFavorite} aria-pressed={favorite}>
          <Heart size={21} fill={favorite ? "currentColor" : "none"} />
          {favorite ? "已收藏" : "收藏"}
        </button>
        <button onClick={share}>
          {copied ? <Check size={21} /> : <Share2 size={21} />}
          <span aria-live="polite">{copied ? "已复制" : "分享"}</span>
        </button>
        <button onClick={() => navigate(1)}>下一单块</button>
      </nav>
    </main>
  );
}

function About({ close }) {
  return (
    <Modal label="收录说明" close={close}>
      <div className="about-copy technical-copy">
        <h2>收录说明</h2>
        <p>
          截至 {data.updated}，共 121 个原厂条目、97 个 Marketplace 扩展与 15 个
          Guitar Essentials 特别版参考条目。不同箱体／艺术家 IR
          分别计数；条目数不等于独立算法数，也不代表全部已解锁。
        </p>
        <p>
          中文介绍与调节建议是辅助参考，不是厂商认证译本或实机试听结论。资料、范围及版本差异在各单块的“资料与版本”中保留；未核实的参数不猜测。
        </p>
        <p>
          面板热点只标注已有完整英文标签匹配的控件。像素缩略图是原图的低色数版本，右侧始终显示原始图片；外观图不代表完整参数页。
        </p>
        <p>
          收藏只保存于当前浏览器。网站不控制设备，不收集设备数据，不分发付费插件。红色图鉴界面为致敬设计，与
          Darkglass、宝可梦及相关权利人无官方关联。
        </p>
        <p>
          界面字体使用 OFL 授权的 Fusion
          Pixel。图片、品牌与原始面板属于各自权利人。
        </p>
        <SourceLink url={REPO}>GitHub／提交纠错</SourceLink>
      </div>
    </Modal>
  );
}

function App() {
  const [state, setState] = useState({
    ...initial,
    id: initial.id || data.blocks[0].id,
  });
  const [mobileDetail, setMobileDetail] = useState(!!initial.id);
  const [favorites, setFavorites] = useState(() => {
    try {
      return readFavorites(localStorage);
    } catch {
      return [];
    }
  });
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [about, setAbout] = useState(false);
  const [storageNote, setStorageNote] = useState("");
  const searchRef = useRef(null);
  const blocks = useMemo(
    () =>
      filterBlocks(data.blocks, state).filter(
        (b) => !onlyFavorites || favorites.includes(b.id),
      ),
    [state, favorites, onlyFavorites],
  );
  const selected = blocks.find((b) => b.id === state.id) || blocks[0];
  const update = (patch) => setState((s) => ({ ...s, ...patch }));
  const choose = (id) => {
    update({ id });
    setMobileDetail(true);
  };
  const navigate = (direction) => {
    const b = adjacentBlock(blocks, selected?.id, direction);
    if (b) update({ id: b.id });
  };
  const back = () => {
    setMobileDetail(false);
    requestAnimationFrame(() =>
      searchRef.current?.focus({ preventScroll: true }),
    );
  };
  useEffect(() => {
    if (matchMedia("(max-width: 760px)").matches)
      window.scrollTo({ top: 0, behavior: "instant" });
  }, [mobileDetail, selected?.id]);
  function toggleFavorite() {
    if (!selected) return;
    const next = favorites.includes(selected.id)
      ? favorites.filter((id) => id !== selected.id)
      : [...favorites, selected.id];
    setFavorites(next);
    let saved = false;
    try {
      saved = storeFavorites(localStorage, next);
    } catch {
      /* Browser may deny storage access. */
    }
    setStorageNote(saved ? "" : "浏览器未允许保存，收藏仅在本次页面有效。");
  }
  useEffect(() => {
    history.replaceState(
      null,
      "",
      writeRoute({ ...state, id: selected?.id || "" }),
    );
  }, [state, selected?.id]);
  useEffect(() => {
    document.title = selected
      ? selected.name + " · Anagram 单块图鉴"
      : "Anagram 单块图鉴";
  }, [selected]);
  useEffect(() => {
    const route = () => {
      const next = readRoute(location.hash);
      setState(next);
      setOnlyFavorites(false);
      setMobileDetail(!!next.id);
    };
    addEventListener("hashchange", route);
    return () => removeEventListener("hashchange", route);
  }, []);
  useEffect(() => {
    const key = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setMobileDetail(false);
        searchRef.current?.focus();
        return;
      }
      if (e.key === "Escape") {
        setAbout(false);
        return;
      }
      if (
        document.querySelector('[role="dialog"]') ||
        /INPUT|SELECT|TEXTAREA|BUTTON|SUMMARY/.test(e.target.tagName)
      )
        return;
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        navigate(e.key === "ArrowDown" ? 1 : -1);
      }
    };
    addEventListener("keydown", key);
    return () => removeEventListener("keydown", key);
  }, [blocks, selected?.id]);
  return (
    <div className={"pokedex" + (mobileDetail ? " show-detail" : "")}>
      <section className="shell left-shell" aria-label="图鉴目录">
        <header className="device-header">
          <div className="sensor" aria-hidden="true">
            <i />
          </div>
          <div className="indicator-lights" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <div className="header-seam" aria-hidden="true" />
          <a
            className="brand"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              update({ ...resetFilters, id: data.blocks[0].id });
              setOnlyFavorites(false);
              back();
            }}
          >
            ANAGRAM 单块图鉴
          </a>
        </header>
        <Directory
          state={state}
          update={update}
          blocks={blocks}
          selected={selected}
          choose={choose}
          searchRef={searchRef}
          favorites={favorites}
          onlyFavorites={onlyFavorites}
          setOnlyFavorites={setOnlyFavorites}
        />
        <DeviceKeys
          navigate={navigate}
          confirm={() => selected && choose(selected.id)}
          back={back}
        />
        <button
          className="case-screw"
          aria-label="收录说明"
          title="收录说明"
          onClick={() => setAbout(true)}
        >
          +
        </button>
      </section>
      <div className="hinge" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </div>
      <section className="shell right-shell" aria-label="单块详情">
        <Detail
          key={selected?.id || "empty"}
          block={selected}
          onBack={back}
          navigate={navigate}
          favorite={favorites.includes(selected?.id)}
          toggleFavorite={toggleFavorite}
          storageNote={storageNote}
        />
        <footer className="case-footer">
          <span className="footer-vents" aria-hidden="true" />
          <button onClick={() => setAbout(true)}>
            非官方中文图鉴 · 参数以原始资料为准
          </button>
          <span className="footer-vents" aria-hidden="true" />
        </footer>
      </section>
      {about && <About close={() => setAbout(false)} />}
    </div>
  );
}
createRoot(document.getElementById("root")).render(<App />);
