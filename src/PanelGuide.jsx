import React, { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
} from "lucide-react";
import { number } from "./catalog.mjs";
const imgUrl = (src) =>
  /^https?:/.test(src) ? src : import.meta.env.BASE_URL + src;
export function SourceLink({ url, children }) {
  return (
    <a href={url} target="_blank" rel="noreferrer">
      {children}
      <ArrowUpRight size={13} />
    </a>
  );
}

export function Modal({ label, close, children }) {
  const ref = useRef(null);
  const closeRef = useRef(close);
  closeRef.current = close;
  useEffect(() => {
    const previous = document.activeElement;
    ref.current?.querySelector("button")?.focus();
    const key = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        closeRef.current();
      }
      if (e.key !== "Tab") return;
      const items = [
        ...ref.current.querySelectorAll("button,a[href],input,summary"),
      ];
      if (e.shiftKey && document.activeElement === items[0]) {
        e.preventDefault();
        items.at(-1)?.focus();
      } else if (!e.shiftKey && document.activeElement === items.at(-1)) {
        e.preventDefault();
        items[0]?.focus();
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("keydown", key);
      previous?.focus();
    };
  }, []);
  return (
    <div className="modal-shade" onClick={close}>
      <section
        className="modal"
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={close} aria-label="关闭">
          <X />
        </button>
        {children}
      </section>
    </div>
  );
}

function ParameterCard({ control: c, index, blockId, selected, onLocate }) {
  const cardRef = useRef(null);
  const [open, setOpen] = useState(index < 2);
  const harmonic = blockId === "factory-harmonic-booster";
  const conciseFunction =
    harmonic && c.name === "Boost"
      ? "全频段增益"
      : harmonic && c.name === "Character"
        ? "音色塑形量"
        : c.description;
  const conciseAdjustment =
    harmonic && c.name === "Boost"
      ? "调高，整体音量增大。"
      : harmonic && c.name === "Character"
        ? "调低更平直，调高塑形更明显。"
        : c.adjustment
          ? c.adjustment.split(/[。；]/)[0] + "。"
          : "";
  useEffect(() => {
    if (selected) {
      setOpen(true);
      cardRef.current?.scrollIntoView({
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "nearest",
      });
    }
  }, [selected]);
  return (
    <details
      ref={cardRef}
      id={`control-${blockId}-${index}`}
      className={"parameter-card" + (selected ? " selected-control" : "")}
      open={open}
      onToggle={(e) => setOpen(e.currentTarget.open)}
    >
      <summary>
        <span>{c.name}</span>
        {!open && <small>{c.description}</small>}
      </summary>
      <div className="parameter-body">
        {c.group && <small>{c.group}</small>}
        <p className="control-function">{conciseFunction}</p>
        {c.adjustment && (
          <p className="control-adjustment">{conciseAdjustment}</p>
        )}
        <details className="full-control technical-copy">
          <summary>完整说明与依据</summary>
          <p>{c.description}</p>
          {c.adjustment && <p>{c.adjustment}</p>}
          {c.range && (
            <p className="range technical-copy">
              {number(c.range.minimum)} ～ {number(c.range.maximum)} {c.unit} ·
              默认 {number(c.range.default)} {c.unit}
            </p>
          )}
          {c.options?.length > 0 && (
            <details className="options technical-copy">
              <summary>选项／特殊值（{c.options.length}）</summary>
              <ul>
                {c.options.map((o, i) => (
                  <li key={i}>
                    {o.label} <span>({number(o.value)})</span>
                  </li>
                ))}
              </ul>
            </details>
          )}
          <div className="parameter-meta">
            {c.panelRefs?.length > 0 && (
              <button className="panel-link" onClick={onLocate}>
                图中位置 <ArrowUpRight size={12} />
              </button>
            )}
            <span className="technical-copy">
              {c.explanationSource ? (
                <SourceLink url={c.explanationSource}>
                  {c.explanationBasis || "资料依据"}
                </SourceLink>
              ) : (
                c.explanationBasis || c.evidence
              )}
            </span>
          </div>
        </details>
      </div>
    </details>
  );
}

export function PanelGuide({ block }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [query, setQuery] = useState("");
  const [zoom, setZoom] = useState(false);
  const image = block.images[imageIndex];
  const photoRef = useRef(null);
  const markers = block.controls.flatMap((c, controlIndex) =>
    (c.panelRefs || [])
      .filter((r) => r.imageIndex === imageIndex)
      .map((r) => ({ ...r, name: c.name, controlIndex })),
  );
  const controls = block.controls
    .map((c, index) => ({ c, index }))
    .filter(({ c }) =>
      [c.name, c.description, c.adjustment, c.group]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase()),
    );
  function locate(c, index) {
    const target =
      c.panelRefs.find((r) => r.imageIndex === imageIndex) ||
      c.panelRefs.find((r) => r.imageIndex > 0) ||
      c.panelRefs[0];
    setImageIndex(target.imageIndex);
    setSelectedIndex(index);
    if (innerWidth < 760)
      photoRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
  }
  return (
    <section className="panel-guide" aria-label="面板与旋钮">
      <h2 className="section-tab">面板与旋钮</h2>
      <div
        className={"panel-workspace" + (imageIndex > 0 ? " wide-panel" : "")}
      >
        <figure className="reference-photo" ref={photoRef}>
          <div className="panel-image">
            <img
              src={imgUrl(image.src)}
              alt={block.name + " — " + image.caption}
            />
            {markers.map((m) => (
              <button
                key={m.controlIndex}
                className={
                  "panel-marker" +
                  (selectedIndex === m.controlIndex ? " selected" : "")
                }
                style={{
                  left: `${m.box[0] * 100}%`,
                  top: `${m.box[1] * 100}%`,
                  width: `${m.box[2] * 100}%`,
                  height: `${m.box[3] * 100}%`,
                }}
                aria-label={"查看 " + m.name + " 说明"}
                title={m.name}
                onClick={() => {
                  setQuery("");
                  setSelectedIndex(m.controlIndex);
                }}
              />
            ))}
          </div>
          <figcaption>
            {imageIndex === 0 ? "原始单块图" : image.caption}
          </figcaption>
          <div className="image-tools">
            {block.images.length > 1 && (
              <>
                <button
                  aria-label="上一张图片"
                  onClick={() => {
                    setImageIndex(
                      (imageIndex + block.images.length - 1) %
                        block.images.length,
                    );
                    setSelectedIndex(null);
                  }}
                >
                  <ChevronLeft size={16} />
                </button>
                <span>
                  {imageIndex + 1}/{block.images.length}
                </span>
                <button
                  aria-label="下一张图片"
                  onClick={() => {
                    setImageIndex((imageIndex + 1) % block.images.length);
                    setSelectedIndex(null);
                  }}
                >
                  <ChevronRight size={16} />
                </button>
              </>
            )}
            <button
              onClick={() => setZoom(true)}
              aria-label={"放大 " + block.name + " 原图"}
              title="放大原图"
            >
              <ZoomIn size={19} />
            </button>
          </div>
        </figure>
        <div className="parameter-column">
          {block.controls.length > 12 && (
            <input
              className="parameter-search"
              aria-label="搜索本单块参数"
              placeholder="搜索本单块参数"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          )}
          <div className="parameter-scroll">
            {controls.map(({ c, index }) => (
              <ParameterCard
                key={index}
                control={c}
                index={index}
                blockId={block.id}
                selected={selectedIndex === index}
                onLocate={() => locate(c, index)}
              />
            ))}
            {!controls.length && (
              <p className="no-parameters">
                {block.controls.length
                  ? "没有匹配的参数。"
                  : "完整面板尚待核实。已保留原图与已确认的用途，不补写未经核实的旋钮。"}
              </p>
            )}
          </div>
        </div>
      </div>
      <p className="panel-hint technical-copy">
        {selectedIndex !== null
          ? `已定位 ${block.controls[selectedIndex].name}。`
          : "可点击图中英文标签与说明互相定位。"}{" "}
        外观图不代表完整参数页；调节建议仅供参考。
      </p>
      {zoom && (
        <Modal label={block.name + " 原始图片"} close={() => setZoom(false)}>
          <img
            className="zoom-photo"
            src={imgUrl(image.src)}
            alt={block.name + " 原始图片"}
          />
        </Modal>
      )}
    </section>
  );
}
