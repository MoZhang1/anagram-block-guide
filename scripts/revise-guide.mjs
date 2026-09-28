import fs from 'node:fs';
import { revisions, standardGuide } from '../src/guide-revisions.mjs';
const file = new URL('../src/data/catalog.json', import.meta.url);
const data = JSON.parse(fs.readFileSync(file));
const ocr = process.argv[2] ? JSON.parse(fs.readFileSync(process.argv[2])) : null;
const norm = s => s.toLowerCase().replace(/[^a-z0-9]/g, '');
const shortNames = { 'Harmonic Booster': { Character: 'CHRCTR', 'Mid Frequency': 'MID FREQ' } };
const tidy = text => text
  .replaceAll('这个单块', '此效果')
  .replaceAll('请用耳朵比较它与 Sublime 的性格。', '与 Sublime 的滤波及追踪性格不同。')
  .replaceAll('先确认外部设备电平匹配。', '外部设备需匹配发送与返回电平。')
  .replaceAll('没有用实体原型的旋钮冒充数字模型', '未取得数字模型的完整参数资料')
  .replaceAll('这里不借用实体原型旋钮冒充 Anagram 面板。', '实体原型的旋钮不能直接作为数字模型的参数表。')
  .replaceAll('没有用旧 Black and Yellow 面板冒充。', '旧版面板不能据此视为当前面板。');
let specific = 0, general = 0, links = 0;
for (const b of data.blocks) {
  const revision = revisions[b.name];
  b.description = tidy(revision?.description || b.description);
  b.note = tidy(revision?.note || b.note);
  if (revision?.setup) b.setup = revision.setup;
  if (revision?.source && !b.sources.some(s => s.url === revision.source)) b.sources.push({label:revision.scope, url:revision.source});
  for (const c of b.controls) {
    const specificRow = revision?.controls?.[c.name];
    const rewritten = specificRow || standardGuide(b, c);
    if (rewritten) {
      Object.assign(c, rewritten);
      if (specificRow) specific++; else general++;
    }
    c.description = tidy(c.description);
    if (specificRow && (revision?.source || b.origin === 'Marketplace')) {
      c.explanationSource = revision?.source || b.sources.find(s => s.label === '官方商店介绍').url;
      c.explanationBasis = revision?.scope || '厂商数字插件介绍';
    } else {
      c.explanationBasis = rewritten ? '通用调节参考' : '基础释义';
    }
    if (/尚未确认|尚未核实|未解释/.test(c.description + (c.adjustment || ''))) c.explanationBasis = '部分功能待核实';
  }
  // Match only whole labels, with punctuation/case removed, and no fuzzy matching.
  // Keep labels and bounding boxes so a reader can inspect every association.
  if (ocr) {
    for (const c of b.controls) c.panelRefs = [];
    b.images.forEach((image, imageIndex) => {
      const found = [];
      for (const [controlIndex, c] of b.controls.entries()) {
        if (c.evidence === 'editorial') continue;
        const names = [c.name, shortNames[b.name]?.[c.name]].filter(Boolean).map(norm);
        const matches = (ocr[image.src] || []).filter(t => t.confidence >= 0.9 && names.includes(norm(t.text)));
        if (matches.length === 1 && b.controls.filter(other => norm(other.name) === norm(c.name)).length === 1) found.push([controlIndex, matches[0]]);
      }
      // Two independent labels required to identify a panel. Artwork is labelled separately.
      if (found.length < 2) { delete image.panel; return; }
      image.panel = imageIndex === 0 ? '外观标识' : '操作面板';
      for (const [ci, t] of found) {
        const {text:label,x,y,width,height} = t;
        b.controls[ci].panelRefs.push({imageIndex,label,box:[x,y,width,height].map(v=>+v.toFixed(5)),method:'exact-label'});
        links++;
      }
    });
  }
}
data.contentUpdated = '2026-09-28';
fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
console.log({specificControls:specific,generalControls:general,pictureLinks:links,blocksWithPanelLinks:data.blocks.filter(b=>b.controls.some(c=>c.panelRefs?.length)).length});
