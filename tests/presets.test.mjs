import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { presets, source, describeBlock, filterPresets, readGuideRoute, writeGuideRoute, parameterGuide, formatValue } from '../src/presets.mjs';

test('factory snapshot has 36 ordered unique bass presets and source fingerprint', () => {
  assert.equal(presets.length, 36);
  assert.equal(new Set(presets.map(p => p.id)).size, 36);
  assert.equal(presets[0].slot, '01A'); assert.equal(presets.at(-1).slot, '12C');
  assert.equal(source.suiteVersion, '6.11.0'); assert.match(source.sha256, /^[a-f0-9]{64}$/);
  assert.equal(presets.filter(p => p.rows.length > 1).length, 9);
  const blocks = presets.flatMap(p => p.rows.flatMap(r => r.blocks));
  assert.equal(blocks.length, 271); assert.equal(blocks.filter(b => !b.enabled).length, 17);
  assert.equal(blocks.flatMap(b => b.parameters).length, 1269);
});
test('chain order, empty slots, separate rows and bypass survive import', () => {
  assert.deepEqual(presets[0].rows[0].blocks.map(b => describeBlock(b).name), ['Harmonic Booster','FET Compressor','Gentle','Darkglass 6-Band EQ','Bass Cabinet','Room Reverb']);
  assert.deepEqual(presets[6].rows[0].blocks.map(b => b.position), [3,4]);
  assert.equal(describeBlock(presets[4].rows[0].blocks[0]).name, 'Alpha Omicron');
  assert.equal(presets[15].rows[0].blocks.filter(b => !b.enabled).length, 3);
  assert.equal(presets[18].rows[0].blocks.filter(b => b.uri.endsWith('cabinet-bass') && b.enabled).length, 1);
  for (const p of presets.filter(p => p.rows.length > 1)) {
    assert(p.rows[0].blocks.some(b => b.uri.endsWith(':split')));
    assert(p.rows[0].blocks.some(b => b.uri.endsWith(':merge')));
  }
});
test('every plugin maps to a guide or an explicitly generic cabinet loader', () => {
  for (const p of presets) for (const r of p.rows) for (const b of r.blocks) {
    const d = describeBlock(b);
    assert(d.guide || b.uri.includes(':cabinet-'), b.uri);
    assert(typeof b.enabled === 'boolean');
    for (const f of b.files) assert(!f.file.includes('/'));
    for (const param of b.parameters) assert(Number.isFinite(param.value));
  }
});
test('editorial notes remain distinct from official source or artist attribution', () => {
  for (const p of presets) {
    assert(/[\u4e00-\u9fff]/.test(p.description)); assert(p.advice); assert.equal(p.inspiration, '暂未查明');
    assert.equal(p.evidence, '官方随包数据');
  }
  const serialized = fs.readFileSync(new URL('../src/data/factory-presets.json', import.meta.url), 'utf8');
  for (const word of ['/Users/', 'Bearer ', 'Cookie', 'gho_', 'commonId']) assert(!serialized.includes(word));
});
test('presets search names, component names, slots and Chinese use with intersecting filters', () => {
  assert.equal(filterPresets({query:'01A'})[0].name, 'Harmonic Booster');
  assert(filterPresets({query:'合唱'}).length > 1);
  assert(filterPresets({query:'VMT'}).length > 0); // Visible Chinese notes also participate.
  assert(filterPresets({query:'Vintage Microtubes'}).length > 1);
  assert.equal(filterPresets({topology:'双路并行'}).length, 9);
  assert(filterPresets({topology:'双路并行', presetCategory:'过载与失真'}).every(p=>p.rows.length === 2 && p.category === '过载与失真'));
  assert.equal(filterPresets({query:'no-such-preset-xyz'}).length, 0);
});
test('preset routes round trip, sanitize invalid filters, and do not break existing block links', () => {
  const s = {view:'presets',id:presets[12].id,query:'八度 合成',presetCategory:'合成器与八度',topology:'双路并行'};
  const round = readGuideRoute(writeGuideRoute(s));
  for (const k of Object.keys(s)) assert.equal(round[k],s[k]);
  assert.equal(readGuideRoute('#preset=factory-preset-01').view,'presets');
  assert.equal(readGuideRoute('#preset=not-real&use=wrong&topology=oops').id,'');
  assert.equal(readGuideRoute('#preset=not-real&use=wrong&topology=oops').presetCategory,'全部用途');
  assert.equal(readGuideRoute('#block=factory-gain').id,'factory-gain');
  assert.equal(readGuideRoute('#block=factory-gain').view,'blocks');
  assert.equal(writeGuideRoute({view:'blocks',id:'factory-gain'}),'#block=factory-gain');
});
test('display rounding never invents physical units, parameter aliases are scoped', () => {
  assert.equal(formatValue(7.700000286102295), '7.7');
  assert.equal(formatValue(-6), '-6');
  const b=presets[0].rows[0].blocks[0];
  assert.equal(parameterGuide(describeBlock(b).guide,b.parameters[3]).name,'Mid Frequency');
});
