// Read only the factory bass preset literal from an installed, trusted Suite bundle.
// Usage: node scripts/extract-factory-presets.mjs <app.asar> <Suite version>
import fs from 'node:fs';
import vm from 'node:vm';
import { createHash } from 'node:crypto';
const [archive, version] = process.argv.slice(2);
if (!archive || !version) throw new Error('Provide the trusted Suite app.asar and its version');
const fd = fs.openSync(archive, 'r');
const header = Buffer.alloc(16);
fs.readSync(fd, header, 0, 16, 0);
const json = Buffer.alloc(header.readUInt32LE(12));
fs.readSync(fd, json, 0, json.length, 16);
const entry = JSON.parse(json).files['main.js'];
const bytes = Buffer.alloc(entry.size);
fs.readSync(fd, bytes, 0, bytes.length, 8 + header.readUInt32LE(4) + Number(entry.offset));
fs.closeSync(fd);
const source = bytes.toString();
const start = source.indexOf('[{name:"Harmonic Booster",commonId:');
const end = source.indexOf('].map(', start) + 1;
if (start < 0 || end <= start) throw new Error('Factory bass literal not found');
const literal = source.slice(start, end);
const factory = vm.runInNewContext(literal, { cs: { FACTORY: 'factory' } }, { timeout: 1000 });
if (factory.length !== 36 || factory.at(-1).name !== 'Synthy Shimmer') throw new Error('Review changed bank before importing');
const outputUrl = new URL('../src/data/factory-presets.json', import.meta.url);
if (fs.existsSync(outputUrl)) {
  const previous = JSON.parse(fs.readFileSync(outputUrl)).presets;
  if (factory.some((p, i) => p.name.trim() !== previous[i]?.name || p.filename !== previous[i]?.sourceFile))
    throw new Error('Names/order changed: review editorial notes before importing');
}
const presets = factory.map((item, index) => {
  const p = item.localPreset.data.preset;
  if (item.localPreset.type !== 'factory' || item.localPreset.author !== 'Darkglass Electronics') throw new Error('Unexpected source');
  return {
    id: `factory-preset-${String(index + 1).padStart(2, '0')}`,
    slot: `${String(Math.floor(index / 3) + 1).padStart(2, '0')}${'ABC'[index % 3]}`,
    name: item.name.trim(), sourceFile: item.filename,
    rows: Object.entries(p.chains).map(([row, chain]) => ({
      row: Number(row),
      blocks: Object.entries(chain.blocks).map(([position, block]) => ({
        position: Number(position), uri: block.uri, enabled: block.enabled,
        parameters: Object.values(block.parameters),
        files: Object.values(block.properties).map(property => ({ name: property.name, file: String(property.value).split('/').at(-1) })),
      })),
    })),
  };
});
const output = {
  source: { title: `Darkglass Suite ${version} 内置贝斯工厂预设`, suiteVersion: version,
    checkedAt: '2026-10-05', url: 'https://www.darkglass.com/pages/darkglass-suite',
    bundle: 'app.asar / main.js', sha256: createHash('sha256').update(bytes).digest('hex'),
    note: '软件附带快照，不是从当前连接设备读取；不保证与每一版固件相同。槽位由随包文件 1–36 的顺序换算。展示基础状态，不含场景切换与脚钉绑定。' },
  presets,
};
fs.writeFileSync(outputUrl, JSON.stringify(output, null, 2) + '\n');
console.log(`Imported ${presets.length} factory bass presets from Suite ${version}`);
