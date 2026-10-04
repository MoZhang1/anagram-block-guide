import React, { useEffect, useRef, useState } from 'react';
import { Search, X, ChevronRight, ChevronLeft, ArrowLeft, ArrowRight, Share2, Check, GitBranch } from 'lucide-react';
import { describeBlock, formatValue, parameterGuide, presetCategories, presets, source } from './presets.mjs';
import pixels from './data/pixel-manifest.json';
import './presets.css';
const assetUrl = path => import.meta.env.BASE_URL + path;

export function SectionTabs({ view, change }) {
  return <nav className="section-tabs" aria-label="图鉴分区">
    <button aria-pressed={view === 'blocks'} onClick={() => change('blocks')}>单块图鉴</button>
    <button aria-pressed={view === 'presets'} onClick={() => change('presets')}>预设效果链</button>
  </nav>;
}
export function PresetDirectory({ state, update, items, selected, choose, searchRef }) {
  const list = useRef(null);
  useEffect(() => { list.current?.querySelector('[aria-pressed="true"]')?.scrollIntoView({ block: 'nearest' }); }, [selected?.id]);
  return <div className="lcd directory-screen preset-directory">
    <div className="search-box"><Search size={28} aria-hidden="true" /><input ref={searchRef} type="search" aria-label="搜索预设、单块或用途" placeholder="搜索预设或用途" value={state.query} onChange={e => update({ query: e.target.value })} />
      {state.query && <button onClick={() => update({ query: '' })} aria-label="清空预设搜索"><X size={24} /></button>}</div>
    <div className="primary-filters">
      <select aria-label="预设用途" value={state.presetCategory || '全部用途'} onChange={e => update({ presetCategory: e.target.value })}>{presetCategories.map(c => <option key={c}>{c}</option>)}</select>
      <select aria-label="预设链路类型" value={state.topology || '全部链路'} onChange={e => update({ topology: e.target.value })}>{['全部链路', '单路串联', '双路并行'].map(c => <option key={c}>{c}</option>)}</select>
    </div>
    <p className="preset-snapshot">Suite {source.suiteVersion} 随包快照 · 贝斯工厂预设</p>
    <div className="directory-list" ref={list} aria-label="预设列表">
      {items.map(p => {
        const guide = p.rows.flatMap(r => r.blocks).map(describeBlock).find(b => b.guide && !['均衡与动态', '工具与加载器'].includes(b.guide.category))?.guide;
        return <button className={'dex-row preset-row' + (selected?.id === p.id ? ' selected' : '')} key={p.id} onClick={() => choose(p.id)} aria-pressed={selected?.id === p.id}>
          {guide && pixels[guide.id] ? <img className="pixel-sprite" src={assetUrl(pixels[guide.id].src)} width="48" height="48" alt="" loading="lazy" /> : <GitBranch size={36} aria-hidden="true" />}
          <span className="dex-number">{p.slot}</span><span className="dex-name">{p.name}<small>{p.subtitle}</small></span><ChevronRight size={20} aria-hidden="true" />
        </button>;
      })}
      {!items.length && <div className="empty"><h2>没有找到预设</h2><p>可以按名称、单块或中文用途搜索。</p><button className="lcd-button" onClick={() => update({ query: '', presetCategory: '全部用途', topology: '全部链路' })}>清除预设筛选</button></div>}
    </div>
    <div className="directory-status" aria-live="polite">找到 {items.length} / {presets.length} 条预设</div>
  </div>;
}
function Chain({ preset }) {
  return <section className="preset-chain" aria-label="预设效果链图">
    <h2>效果链</h2>
    <p className="technical-copy">按原数据的行与槽位排列。实线卡片为启用，虚线为关闭。点单块查看参数。</p>
    {preset.rows.map(row => <div className="chain-lane" key={row.row}>
      <h3>第 {row.row} 行</h3><ol>{row.blocks.map((b, i) => <li key={b.position}>
        {i > 0 && <ArrowRight size={16} className="chain-arrow" aria-hidden="true" />}
        <button className={'chain-node' + (b.enabled ? '' : ' bypassed')} onClick={() => { const element = document.getElementById(`slot-${row.row}-${b.position}`); const parameters = element?.querySelector('details'); if (parameters) parameters.open = true; element?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' }); element?.focus({ preventScroll: true }); }}>
          <small>槽 {b.position} · {b.enabled ? '启用' : '关闭'}</small>{describeBlock(b).name}
        </button></li>)}</ol>
    </div>)}
    {preset.rows.length > 1 && <p className="technical-copy chain-note"><GitBranch size={18} aria-hidden="true" />两行是并行支路，通过 Split 分流、Merge 汇合，不是第一行接完再串入第二行。具体混合与分频值见这两个单块的参数。</p>}
  </section>;
}
function BlockSettings({ block, row, openBlock }) {
  const { name, description, guide, stereo } = describeBlock(block);
  return <article className="preset-block" id={`slot-${row}-${block.position}`} tabIndex={-1}>
    <div className="preset-block-heading">
      {guide?.images[0] && <img src={assetUrl(guide.images[0].src)} alt={guide.name + ' 原始单块图'} loading="lazy" />}
      <div><span className="technical-copy">第 {row} 行 · 槽 {block.position} · {block.enabled ? '启用' : '默认关闭'}</span><h3>{name}</h3>
        {guide && <button className="preset-text-link" onClick={() => openBlock(guide.id)}>打开单块图鉴 <ChevronRight size={15} /></button>}</div>
    </div>
    <p className="technical-copy">{description}</p>
    {stereo && <p className="technical-copy">此处是立体声版本；链接与图片引用同系列单块，不代表完全相同的面板。</p>}
    {!block.enabled && <p className="technical-copy">基础状态下旁通，不参与当前处理；开启后才会改变音色。</p>}
    {block.files.length > 0 && <div className="preset-files technical-copy">{block.files.map((f, i) => <p key={i}>{f.name}：<code>{f.file}</code></p>)}</div>}
    <details className="preset-parameters"><summary>预设参数 · {block.parameters.length} 项</summary>
      <p className="technical-copy">数值来自随包文件，显示时最多保留 4 位小数；不擅自换算成 dB、Hz、百分比或开关档位。功能与听感参考图鉴说明，旋钮刻度以设备为准。</p>
      <dl>{block.parameters.map((p, i) => {
        const explanation = parameterGuide(guide, p);
        return <div key={i}><dt>{p.name}<strong>{formatValue(p.value)}</strong></dt><dd>{explanation?.description || '该参数的单位／功能尚待核实，保留原英文名和数值。'}{explanation?.adjustment && <p>调节参考：{explanation.adjustment}</p>}</dd></div>;
      })}</dl>
    </details>
  </article>;
}
export function PresetDetail({ preset, onBack, navigate, openBlock }) {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  async function share() {
    const url = new URL(location.href); url.hash = 'preset=' + preset.id;
    try { await navigator.clipboard.writeText(url.href); setCopied(true); } catch { setShareUrl(url.href); }
  }
  if (!preset) return <main className="lcd detail-screen"><div className="empty"><h1>没有匹配的预设</h1><p>换个搜索词，或清除左侧筛选。</p><button className="lcd-button" onClick={onBack}>返回预设列表</button></div></main>;
  return <main className="lcd detail-screen preset-detail" id="detail"><div className="detail-scroll">
    <button className="mobile-back" onClick={onBack}><ArrowLeft size={20} />返回预设列表</button>
    <div className="index-line"><span>FACTORY {preset.slot}</span><span>{preset.topology}</span></div>
    <h1 className="block-title">{preset.name}</h1>
    <p className="preset-subtitle">{preset.subtitle}</p>
    <div className="type-labels"><span>{preset.category}</span><span>链路：官方随包数据</span></div>
    <section className="dex-entry"><p>{preset.description}</p><small className="technical-copy">用途说明为根据链路的分析，不是官方音色承诺，也未做实机听测。</small></section>
    <Chain preset={preset} />
    <section className="preset-editorial"><h2>从哪里调起</h2><p className="technical-copy">{preset.advice}</p><p className="technical-copy">调节建议为图鉴整理。先把预设复制到 User 区，配平音量后做对比；本网页不连接或改写设备。</p></section>
    <section className="preset-origin"><h2>原型与出处</h2><dl className="technical-copy"><div><dt>预设来源 · 官方确认</dt><dd>Darkglass Electronics，{source.title}。文件 {preset.sourceFile}。</dd></div><div><dt>歌曲／乐手原型 · 暂未查明</dt><dd>随包数据没有写明歌曲或乐手出处。本页不凭名称谐音下结论；单个音箱有原型，也不等于整条预设复刻了某位乐手。</dd></div></dl></section>
    <section aria-label="链路单块与参数"><h2 className="preset-settings-title">单块与参数</h2>{preset.rows.flatMap(row => row.blocks.map(b => <BlockSettings key={`${row.row}-${b.position}`} block={b} row={row.row} openBlock={openBlock} />))}</section>
    <details className="provenance"><summary>资料来源与版本边界</summary><div className="technical-copy"><p>核对日期：{source.checkedAt}。{source.note}</p><p>链路、旁通和参数读取自 {source.bundle} 中的工厂贝斯预设数组；仅整理其中的数据，不读取个人账号或用户预设。</p><p>单块用途与旋钮说明沿用图鉴内有来源的资料；调节建议属于编辑分析。尚未取得作者对具体歌曲原型的说明。</p><p><a href={source.url} target="_blank" rel="noreferrer">Darkglass Suite 官方页面</a> · <a href="https://www.darkglass.com/pages/anagram-manual" target="_blank" rel="noreferrer">Anagram 官方手册</a></p></div></details>
    {shareUrl && <label className="technical-copy">复制预设链接<input className="preset-share-input" readOnly value={shareUrl} onFocus={e => e.target.select()} /></label>}
  </div><nav className="detail-actions preset-actions" aria-label="预设操作"><button onClick={() => navigate(-1)}><ChevronLeft size={19} />上一预设</button><button onClick={share}>{copied ? <Check size={19} /> : <Share2 size={19} />}{copied ? '已复制' : '分享预设'}</button><button onClick={() => navigate(1)}>下一预设<ChevronRight size={19} /></button></nav></main>;
}
