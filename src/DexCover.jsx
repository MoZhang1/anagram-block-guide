import React from "react";
import { ChevronRight } from "lucide-react";
import "./cover.css";

export function DexCover({ phase, open, buttonRef, count }) {
  if (phase === "open") return null;
  const busy = phase !== "closed";
  return (
    <section
      className={`cover-stage cover-${phase}`}
      aria-label="合上的图鉴"
      aria-busy={busy}
    >
      <div className="closed-device">
        <div className="cover-back" aria-hidden="true" />
        <div className="cover-spine" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <div className="cover-lid">
          <div className="cover-face">
            <div className="cover-sensor sensor" aria-hidden="true">
              <i />
            </div>
            <div className="cover-lights indicator-lights" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <div className="cover-seam" aria-hidden="true" />
            <div className="cover-name">
              <h1>ANAGRAM</h1>
              <p>单块图鉴</p>
            </div>
            <div className="cover-ridge" aria-hidden="true" />
            <button
              className="cover-open"
              ref={buttonRef}
              onClick={open}
              disabled={busy}
            >
              <span className="cover-arrow" aria-hidden="true">
                <ChevronRight strokeWidth={3} />
              </span>
              <span>
                {phase === "opening"
                  ? "正在打开"
                  : phase === "closing"
                    ? "正在合上"
                    : "打开图鉴"}
              </span>
            </button>
            <p className="cover-count">{count} 个单块 · 36 条预设</p>
            <div className="cover-vents" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <span className="cover-screw" aria-hidden="true">
              +
            </span>
          </div>
          <div className="cover-inside" aria-hidden="true">
            <div />
          </div>
        </div>
      </div>
    </section>
  );
}
