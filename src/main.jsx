import React, { useState, useMemo, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import {
  Search,
  SlidersHorizontal,
  AudioLines,
  Speaker,
  Boxes,
  Sliders,
  Radio,
  Waves,
  Clock3,
  Plug,
  ArrowLeft,
  ArrowUpRight,
  Link,
  Check,
  X,
  ChevronRight,
  ChevronLeft,
  ZoomIn,
  Info,
} from "lucide-react";
import data from "./data/catalog.json";
import {
  categories,
  origins,
  costs,
  filterBlocks,
  readRoute,
  writeRoute,
  number,
} from "./catalog.mjs";
import "./styles.css";
const REPO = "https://github.com/MoZhang1/anagram-block-guide";
const icons = [
  Boxes,
  Speaker,
  Speaker,
  AudioLines,
  Sliders,
  Radio,
  Waves,
  Plug,
];
const imgUrl = (src) =>
  /^https?:/.test(src) ? src : import.meta.env.BASE_URL + src;
function SourceLink({ url, children }) {
  return (
    <a href={url} target="_blank" rel="noreferrer">
      {children}
      <ArrowUpRight size={13} />
    </a>
  );
}
function Filters({ state, change, blocks, mobileOpen }) {
  return (
    <aside
      className={"filters " + (mobileOpen ? "is-open" : "")}
      aria-label="单块筛选"
    >
      <h2>单块分类</h2>
      <nav>
        {categories.map((c, i) => {
          const Icon = icons[i];
          return (
            <button
              key={c}
              className={state.category === c ? "category active" : "category"}
              onClick={() => change({ category: c })}
              aria-pressed={state.category === c}
            >
              <Icon size={18} />
              <span>{c}</span>
              <small>
                {c === "全部单块"
                  ? blocks.length
                  : blocks.filter((b) => b.category === c).length}
              </small>
            </button>
          );
        })}
      </nav>
      <div className="filter-group">
        <h2>来源筛选</h2>
        {origins.map((o) => (
          <label key={o} className="radio">
            <input
              type="radio"
              name="origin"
              checked={state.origin === o}
              onChange={() => change({ origin: o })}
            />
            <span>{o}</span>
            <small>
              {o === "全部来源"
                ? blocks.length
                : blocks.filter((b) => b.origin === o).length}
            </small>
          </label>
        ))}
      </div>
      <div className="filter-group">
        <label className="field-label" htmlFor="cost">
          获取方式
        </label>
        <select
          id="cost"
          value={state.cost}
          onChange={(e) => change({ cost: e.target.value })}
        >
          {costs.map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
        <label className="field-label" htmlFor="coverage">
          资料完整度
        </label>
        <select
          id="coverage"
          value={state.coverage}
          onChange={(e) => change({ coverage: e.target.value })}
        >
          {["全部资料", "有面板说明", "可图文定位", "面板待核实"].map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
      </div>
      <p className="rail-note">
        非官方中文参考
        <br />
        清单 {data.updated}
        <br />
        说明修订 {data.contentUpdated || data.updated}
        <br />
        KosmOS {data.firmware}
      </p>
    </aside>
  );
}
function BlockList({ blocks, selected, onSelect, reset }) {
  return (
    <section className="results" aria-label="单块列表">
      <div className="list-heading">
        <h2>
          单块列表 <span>({blocks.length})</span>
        </h2>
        <span>按目录顺序</span>
      </div>
      <div className="list-scroll">
        {blocks.length ? (
          blocks.map((b) => (
            <button
              key={b.id}
              className={"block-row " + (selected === b.id ? "selected" : "")}
              onClick={() => onSelect(b.id)}
              aria-pressed={selected === b.id}
            >
              <img src={imgUrl(b.images[0].src)} alt="" loading="lazy" />
              <div>
                <strong>{b.name}</strong>
                <p>{b.vendor}</p>
                <small>
                  {b.category} ·{" "}
                  {b.origin === "原厂"
                    ? "原厂"
                    : b.cost === "免费"
                      ? "免费扩展"
                      : b.origin === "Guitar Essentials"
                        ? "特别版"
                        : "付费扩展"}
                </small>
              </div>
              <ChevronRight className="row-arrow" size={17} />
            </button>
          ))
        ) : (
          <div className="empty">
            <Search size={28} />
            <h3>没有找到匹配的单块</h3>
            <p>
              试试英文名、旋钮名或“压缩”“八度”“免费”。多个关键词用空格分开。
            </p>
            <button className="secondary" onClick={reset}>
              清除全部筛选
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
function ImageGallery({ block }) {
  const [index, setIndex] = useState(0),
    [zoom, setZoom] = useState(false);
  const close = useRef(null),
    trigger = useRef(null);
  useEffect(() => {
    setIndex(0);
    setZoom(false);
  }, [block.id]);
  useEffect(() => {
    if (!zoom) return;
    close.current?.focus();
    const fn = (e) => {
      if (e.key === "Escape") {
        setZoom(false);
        trigger.current?.focus();
      }
      if (e.key === "Tab") {
        e.preventDefault();
        close.current?.focus();
      }
    };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [zoom]);
  const image = block.images[Math.min(index, block.images.length - 1)];
  return (
    <figure className="gallery">
      <button
        ref={trigger}
        className="image-button"
        onClick={() => setZoom(true)}
        aria-label={"放大 " + block.name + " 图片"}
      >
        <img src={imgUrl(image.src)} alt={block.name + " — " + image.caption} />
        <ZoomIn size={18} />
      </button>
      <figcaption>{image.caption}</figcaption>
      {block.images.length > 1 && (
        <div className="gallery-controls">
          <button
            aria-label="上一张图片"
            onClick={() =>
              setIndex((index + block.images.length - 1) % block.images.length)
            }
          >
            <ChevronLeft size={15} />
          </button>
          <span>
            {index + 1} / {block.images.length}
          </span>
          <button
            aria-label="下一张图片"
            onClick={() => setIndex((index + 1) % block.images.length)}
          >
            <ChevronRight size={15} />
          </button>
        </div>
      )}
      {zoom && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={block.name + " 大图"}
          onClick={() => {
            setZoom(false);
            trigger.current?.focus();
          }}
        >
          <button
            ref={close}
            className="close-zoom"
            aria-label="关闭大图"
            onClick={() => {
              setZoom(false);
              trigger.current?.focus();
            }}
          >
            <X />
          </button>
          <img
            src={imgUrl(image.src)}
            alt={block.name + " 放大图片"}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </figure>
  );
}
function PanelReference({ block, selected, onSelect, panelRef }) {
  const images = block.images.map((image, index) => ({ ...image, index })).filter(image => image.panel);
  if (!images.length) return null;
  const image = images.find(i => i.index === selected?.imageIndex) || images.find(i => i.index > 0) || images[0];
  const markers = block.controls.flatMap((c, controlIndex) => (c.panelRefs || [])
    .filter(r => r.imageIndex === image.index).map(r => ({ ...r, controlIndex, name: c.name })));
  return <section className="panel-reference" ref={panelRef} aria-label="面板对照">
    <div className="section-heading"><h2>面板对照</h2><span>{image.index === 0 ? '单块外观 · 非完整参数页' : '官方商店截图'}</span></div>
    <div className="panel-tabs" aria-label="选择参考图片">
      {images.map(i => <button key={i.index} aria-pressed={image.index === i.index} onClick={() => onSelect({ imageIndex: i.index })}>
        {i.index === 0 ? '外观标识' : `面板 ${i.index}`}
      </button>)}
    </div>
    <div className={'panel-image ' + (image.index === 0 ? 'artwork' : '')}>
      <img src={imgUrl(image.src)} alt={block.name + ' ' + (image.index === 0 ? '单块外观标识' : `官方操作面板 ${image.index}`)} />
      {markers.map(m => <button key={m.controlIndex}
        className={'panel-marker ' + (selected?.controlIndex === m.controlIndex ? 'selected' : '')}
        style={{ left: `${m.box[0] * 100}%`, top: `${m.box[1] * 100}%`, width: `${m.box[2] * 100}%`, height: `${m.box[3] * 100}%` }}
        aria-label={'查看 ' + m.name + ' 说明'} title={m.name}
        onClick={() => { onSelect(m); requestAnimationFrame(() => document.getElementById(`control-${block.id}-${m.controlIndex}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })); }} />)}
    </div>
    <p className="panel-caption" aria-live="polite">
      {selected?.label ? `${selected.name || ''} → 图中 ${selected.label}` : '点击图中文字可跳到参数；点击表内“图中位置”可反向定位。'}
    </p>
    <a className="panel-original" href={imgUrl(image.src)} target="_blank" rel="noreferrer">查看原图 ↗</a>
    <p className="table-note">按图片中的英文标签匹配；截图可能来自旧版本，数值不是推荐设置。未匹配的参数不标位置。</p>
  </section>;
}
function ParameterTable({ block }) {
  const [query, setQuery] = useState("");
  const [selectedPanel, setSelectedPanel] = useState(null);
  const panelRef = useRef(null);
  const controls = block.controls.map((c, index) => ({ ...c, index })).filter((c) =>
    (c.name + " " + c.description + " " + (c.adjustment || "") + " " + (c.group || ""))
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  return (
    <section className="parameters">
      <PanelReference block={block} selected={selectedPanel} onSelect={(m) => { setQuery(''); setSelectedPanel(m); }} panelRef={panelRef} />
      <div className="section-heading">
        <h2>参数说明</h2>
        <span>{block.controls.length} 项说明</span>
      </div>
      {block.controls.length > 12 && (
        <input
          className="parameter-search"
          aria-label="搜索本单块参数"
          placeholder="搜索参数名称、功能…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      )}
      <p className="table-note">
        保留面板英文名称。“调节与听感”为使用参考，不是厂商预设。
        {block.origin === "Marketplace"
          ? "范围、默认值及选项来自官方参数元数据。"
          : "未确认的数值不填写；社区记录可能与当前固件有差异。"}
      </p>
      {block.controls.length > 0 ? (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>参数</th>
                <th>功能与调节</th>
              </tr>
            </thead>
            <tbody>
              {controls.map((c, i) => (
                <tr key={c.name + i} id={`control-${block.id}-${c.index}`} className={selectedPanel?.controlIndex === c.index ? 'selected-control' : ''}>
                  <th scope="row">
                    {c.group && (
                      <small className="param-group">{c.group}</small>
                    )}
                    <span>{c.name}</span>
                    {(c.panelRefs?.length > 0) && <button className="panel-link" onClick={() => {
                      const ref = c.panelRefs.find(r => r.imageIndex > 0) || c.panelRefs[0];
                      setSelectedPanel({ ...ref, controlIndex: c.index, name: c.name });
                      panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}>图中位置 ↗</button>}
                    {c.evidence === "editorial" && (
                      <small className="param-group">功能分组名称</small>
                    )}
                  </th>
                  <td>
                    <p>{c.description}</p>
                    {c.adjustment && <p className="adjustment"><span>调节与听感</span>{c.adjustment}</p>}
                    {c.range && (
                      <small className="range">
                        {number(c.range.minimum)} ～ {number(c.range.maximum)}{" "}
                        {c.unit} · 默认 {number(c.range.default)} {c.unit}
                      </small>
                    )}
                    {c.options?.length > 0 && (
                      <details className="options">
                        <summary>选项／特殊值（{c.options.length}）</summary>
                        <ul>
                          {c.options.map((o, j) => (
                            <li key={j}>
                              {o.label} <span>({number(o.value)})</span>
                            </li>
                          ))}
                        </ul>
                      </details>
                    )}
                    <small className="parameter-basis">{c.explanationSource ? <a href={c.explanationSource} target="_blank" rel="noreferrer">{c.explanationBasis} ↗</a> : c.explanationBasis}</small>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!controls.length && (
            <p className="no-param">无匹配参数。</p>
          )}
        </div>
      ) : (
        <div className="coverage-note">
          <Info size={20} />
          <div>
            <strong>完整面板尚待核实</strong>
            <p>
              已收录官方名称、图片与简介，完整数字面板资料尚未取得。
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
function Detail({ block, onBack }) {
  const [copied, setCopied] = useState(false),
    [copyFallback, setCopyFallback] = useState("");
  const panel = useRef(null);
  useEffect(() => {
    setCopied(false);
    setCopyFallback("");
    panel.current?.scrollTo(0, 0);
  }, [block?.id]);
  if (!block)
    return (
      <main className="detail empty-detail">
        <Search size={30} />
        <h2>从左侧选择一个单块</h2>
        <p>按名字、用途或旋钮搜索，再点开阅读。</p>
      </main>
    );
  async function share() {
    const url =
      location.href.split("#")[0] + "#block=" + encodeURIComponent(block.id);
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopyFallback(url);
    }
  }
  return (
    <main ref={panel} className="detail" id="detail">
      <button className="back-button" onClick={onBack}>
        <ArrowLeft size={17} />
        返回单块列表
      </button>
      <div className="breadcrumb">
        全部单块 <ChevronRight size={12} /> {block.category}{" "}
        <ChevronRight size={12} /> {block.subCategory || block.origin}
      </div>
      <div className="detail-heading">
        <h1>{block.name}</h1>
        <button className="secondary share" onClick={share} aria-label={copied ? '已复制' : '复制链接'}>
          {copied ? <Check size={16} /> : <Link size={16} />}
          <span>{copied ? "已复制" : "复制链接"}</span>
        </button>
      </div>
      <div className="subtitle">
        {block.vendor}
        <i /> {block.origin}
        <i /> {block.cost}
        {block.origin === "Marketplace" && block.cost === "付费" && (
          <span className="price"> · {block.price}*</span>
        )}
      </div>
      {copyFallback && (
        <label className="copy-fallback">
          复制以下链接：
          <input
            readOnly
            value={copyFallback}
            onFocus={(e) => e.target.select()}
          />
        </label>
      )}
      <div className="intro">
        <ImageGallery block={block} />
        <section>
          <h2>音色与用途</h2>
          <p>{block.description}</p>
          {block.aliases.length > 0 && (
            <p className="aliases">别名：{block.aliases.join("、")}</p>
          )}
          <div className="evidence">
            <span
              className={
                "status-dot " + (!block.controls.length ? "pending" : "")
              }
            />
            {block.evidence}
          </div>
        </section>
      </div>
      {block.setup && <section className="setup-note"><h2>调节顺序 <small>使用参考</small></h2><p>{block.setup}</p></section>}
      <ParameterTable key={block.id} block={block} />
      <section className="provenance">
        <h2>资料与版本</h2>
        <p>{block.note}</p>
        <div className="source-links">
          {block.sources.map((s) => (
            <SourceLink key={s.url} url={s.url}>
              {s.label}
            </SourceLink>
          ))}
        </div>
        <small>
          清单：{data.updated} · 说明修订：{data.contentUpdated || data.updated}
          {block.version
            ? " · 插件 " + block.version
            : " · 原厂清单 KosmOS " + data.firmware}
          。图片与品牌归各权利人所有，仅用于学习、辨识与资料引用。
        </small>
        {block.cost === "付费" && (
          <small>
            *
            价格为采集时标价，仅帮助区分付费内容；币种、税费、活动与实际授权以商店为准。
          </small>
        )}
      </section>
      <footer>非官方中文参考 · 不含设备控制功能</footer>
    </main>
  );
}
function About({ close }) {
  const dialog = useRef(null);
  useEffect(() => {
    const previous = document.activeElement;
    const first = dialog.current?.querySelector('button');
    first?.focus();
    const trap = (event) => {
      if (event.key !== 'Tab') return;
      const items = [...dialog.current.querySelectorAll('button, a[href]')];
      if (event.shiftKey && document.activeElement === items[0]) {
        event.preventDefault(); items.at(-1)?.focus();
      } else if (!event.shiftKey && document.activeElement === items.at(-1)) {
        event.preventDefault(); items[0]?.focus();
      }
    };
    document.addEventListener('keydown', trap);
    return () => { document.removeEventListener('keydown', trap); previous?.focus(); };
  }, []);
  return (
    <div className="about-shade" onClick={close}>
      <section
        className="about"
        ref={dialog}
        role="dialog"
        aria-modal="true"
        aria-label="收录范围"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="about-close" onClick={close} aria-label="关闭说明">
          <X size={20} />
        </button>
        <h2>收录范围</h2>
        <p>
          截至 {data.updated}，按官方 KosmOS {data.firmware} 清单收录{" "}
          <strong>121 个原厂条目</strong>，以及官方 Marketplace 的{" "}
          <strong>97 个扩展</strong>。不同箱体／艺术家 IR
          分别算条目；Mono／Stereo 版本按官方清单合并介绍，不重复计数。
        </p>
        <p>
          另附 <strong>15 个 Guitar Essentials 特别版</strong>
          条目。这些只有已确认的图片和用途，完整面板待核实，也不代表普通设备自动获得授权。
        </p>
        <p>
          扩展旋钮的范围、默认值、选项来自官方 MOD
          插件服务。原厂参数名参考已安装的官方 Suite
          和社区面板记录；无法确认的数值不填写。中文说明是辅助解释，不是厂商认证译本，也不代替实际试听。
        </p>
        <p>
          名称变化可通过旧名搜索。原厂单块图片取自 Darkglass Suite
          6.10.0，扩展图片取自官方商店；未分配独立封面的艺术家 IR
          使用系列共用图并注明。网站不提供付费插件文件，不收集你的设备数据。
        </p>
        <p>
          面板定位按图片中的完整英文标签匹配，不按相似含义猜测位置。外观图不代表完整参数页。
          功能说明附资料依据；调节与听感为编辑参考，尚未核实的版本差异保留注明。
        </p>
        <p>
          <SourceLink url={REPO}>查看源码／提交纠错</SourceLink>
        </p>
        <button className="secondary" onClick={close}>
          知道了
        </button>
      </section>
    </div>
  );
}
function App() {
  const initial = readRoute(location.hash),
    [state, setState] = useState({
      ...initial,
      id: initial.id || data.blocks[0].id,
    }),
    [mobileDetail, setMobileDetail] = useState(!!initial.id),
    [filtersOpen, setFiltersOpen] = useState(false),
    [about, setAbout] = useState(false);
  const search = useRef(null);
  const blocks = useMemo(() => filterBlocks(data.blocks, state), [state]);
  const selected = blocks.find((b) => b.id === state.id) || blocks[0];
  function update(p) {
    setState((s) => ({ ...s, ...p }));
    if (!("id" in p)) setMobileDetail(false);
  }
  useEffect(() => {
    history.replaceState(null, "", writeRoute(state));
  }, [state]);
  useEffect(() => {
    const route = () => {
      const s = readRoute(location.hash);
      setState(s);
      setMobileDetail(!!s.id);
    };
    const key = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        search.current?.focus();
      }
      if (e.key === "Escape") {
        setAbout(false);
        setFiltersOpen(false);
      }
    };
    addEventListener("hashchange", route);
    addEventListener("keydown", key);
    return () => {
      removeEventListener("hashchange", route);
      removeEventListener("keydown", key);
    };
  }, []);
  useEffect(() => {
    document.title = selected
      ? selected.name + " · Anagram 中文单块图鉴"
      : "Anagram 单块图鉴";
  }, [selected]);
  const reset = () =>
    update({
      query: "",
      category: "全部单块",
      origin: "全部来源",
      cost: "全部",
      coverage: "全部资料",
    });
  return (
    <div className={"app " + (mobileDetail ? "show-detail" : "")}>
      <header>
        <a
          className="brand"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            reset();
            setMobileDetail(false);
          }}
        >
          Anagram 单块图鉴
        </a>
        <span className="header-subtitle">中文操作指南</span>
        <div className="header-links">
          <button onClick={() => setAbout(true)}>收录说明</button>
          <SourceLink url={REPO}>GitHub</SourceLink>
        </div>
      </header>
      <div className="search-row">
        <div className="search-box">
          <Search size={21} />
          <input
            ref={search}
            type="search"
            placeholder="搜索单块、旋钮或音色"
            aria-label="搜索单块、旋钮或音色"
            value={state.query}
            onChange={(e) => update({ query: e.target.value })}
          />
          {state.query ? (
            <button aria-label="清空搜索" onClick={() => update({ query: "" })}>
              <X size={18} />
            </button>
          ) : (
            <span className="search-hint">
              例如：Microtubes、Blend、低频 <kbd>⌘ K</kbd>
            </span>
          )}
        </div>
        <button
          className="mobile-filter secondary"
          aria-expanded={filtersOpen}
          onClick={() => setFiltersOpen(!filtersOpen)}
        >
          <SlidersHorizontal size={18} />
          筛选
        </button>
      </div>
      <div className="workspace">
        <Filters
          state={state}
          change={update}
          blocks={data.blocks}
          mobileOpen={filtersOpen}
        />
        <BlockList
          blocks={blocks}
          selected={selected?.id}
          reset={reset}
          onSelect={(id) => {
            update({ id });
            setMobileDetail(true);
            setFiltersOpen(false);
          }}
        />
        <Detail block={selected} onBack={() => setMobileDetail(false)} />
      </div>
      <div className="sr-only" aria-live="polite">
        找到 {blocks.length} 个单块
      </div>
      {about && <About close={() => setAbout(false)} />}
    </div>
  );
}
createRoot(document.getElementById("root")).render(<App />);
