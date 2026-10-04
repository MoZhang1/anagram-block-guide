import bank from './data/factory-presets.json' with { type: 'json' };
import notes from './data/preset-notes.json' with { type: 'json' };
import catalog from './data/catalog.json' with { type: 'json' };
import { normalize, readRoute, writeRoute } from './catalog.mjs';

const ids = {
  HBO: 'harmonic-booster', FETComp: 'fet-compressor', DarkglassGEQ: 'darkglass-6-band-eq',
  RoomReverb: 'room-reverb', VMT: 'vintage-microtubes', JimBass: 'jim-bass', Suppressor: 'noise-suppressor',
  B3K: 'microtubes-b3k', Subcitri: 'subcitri-octaver', GenericGEQ: 'generic-6-band-eq',
  AlphaOmicron: 'alpha-omicron', BUSComp: 'bus-compressor', Chorus: 'mint-chocolate-chorus',
  Gravitron: 'gravitron', Chinchilla: 'chinchilla', ModDelay: 'modulation-delay', ShimmerReverb: 'shimmer-reverb',
  Flanger: 'flamingo-flanger', PitchShifter: 'pitch-shifter', Gain: 'gain', Sublime: 'sublime-octaver',
  HallReverb: 'hall-reverb', Sublemon: 'sublemon-octaver', PlateReverb: 'plate-reverb',
  HPF: 'hi-pass-filter', LPF: 'lo-pass-filter', AnalogDelay: 'analog-delay', moerfer: 'mo-erf-r', AmpEq: 'amp-eq',
  'neural-plugins:gentle': 'gentle', 'neural-plugins:microtubes-x': 'microtubes-x',
  'neural-plugins:super-california': 'super-california', 'neural-plugins:duality-fuzz': 'duality-fuzz',
  'neural-plugins:peggy-bass': '70s-peggy', 'neural-plugins:gallen-kallinen': 'kallinen-kruukkeri',
  'neural:pedal': 'neural-pedal-loader', 'neural:amp': 'neural-amp-loader',
  split: 'split', merge: 'merge',
};
const byId = new Map(catalog.blocks.map(b => [b.id, b]));
export function describeBlock(block) {
  const key = block.uri.replace(/^urn:darkglass(?:-anagram)?:/, '');
  if (key.startsWith('cabinet-')) return {
    name: key === 'cabinet-bass' ? 'Bass Cabinet' : 'Guitar Cabinet',
    description: '箱体加载单块。下方保留实际文件名；未核实的文件不擅自对应实体箱体或拾音话筒。',
  };
  const stereo = key.endsWith('Stereo');
  const id = ids[stereo ? key.slice(0, -6) : key];
  const guide = byId.get('factory-' + id);
  return { name: guide ? guide.name + (stereo ? ' · Stereo' : '') : key, description: guide?.description || '该单块的中文说明尚待核实。', guide, stereo };
}
export const source = bank.source;
export const presetCategories = ['全部用途', ...new Set(notes.map(n => n[0]))];
export const presets = bank.presets.map((p, i) => ({
  ...p, category: notes[i][0], subtitle: notes[i][1], description: notes[i][2], advice: notes[i][3],
  topology: p.rows.length > 1 ? '双路并行' : '单路串联',
  evidence: '官方随包数据', inspiration: '暂未查明',
}));
export const presetIds = new Set(presets.map(p => p.id));
export function filterPresets({ query = '', presetCategory = '全部用途', topology = '全部链路' } = {}) {
  const words = query.trim().split(/\s+/).filter(Boolean).map(normalize);
  return presets.filter(p => (presetCategory === '全部用途' || p.category === presetCategory)
    && (topology === '全部链路' || p.topology === topology)
    && words.every(word => normalize([p.slot, p.name, p.subtitle, p.description, p.category,
      ...p.rows.flatMap(r => r.blocks.flatMap(b => [describeBlock(b).name, ...b.parameters.map(p => p.name)]))].join(' ')).includes(word)));
}
export function readGuideRoute(hash) {
  const params = new URLSearchParams(hash.replace(/^#/, ''));
  const base = readRoute(hash);
  if (params.has('preset') || params.get('view') === 'presets') return {
    ...base, view: 'presets', id: presetIds.has(params.get('preset')) ? params.get('preset') : '',
    presetCategory: presetCategories.includes(params.get('use')) ? params.get('use') : '全部用途',
    topology: ['单路串联', '双路并行'].includes(params.get('topology')) ? params.get('topology') : '全部链路',
  };
  return { ...base, view: 'blocks' };
}
export function writeGuideRoute(state) {
  if (state.view !== 'presets') return writeRoute({ ...readRoute(''), ...state });
  const params = new URLSearchParams({ view: 'presets' });
  if (presetIds.has(state.id)) params.set('preset', state.id);
  if (state.query) params.set('q', state.query);
  if (presetCategories.includes(state.presetCategory) && state.presetCategory !== '全部用途') params.set('use', state.presetCategory);
  if (['单路串联', '双路并行'].includes(state.topology)) params.set('topology', state.topology);
  return '#' + params.toString();
}
export function formatValue(value) {
  return typeof value === 'number' ? String(Number(value.toFixed(4))) : String(value);
}
const controlAliases = {
  MidFreq: 'Mid Frequency', CrossoverFreq: 'Crossover Frequency', CutoffFreq: 'Cutoff Frequency',
  LowMidFreq: 'Low Mid Frequency', HighMidFreq: 'High Mid Frequency',
};
const nameAliases = { 'LP Cutoff': 'Low Pass Cutoff', 'HP Cutoff': 'High Pass Cutoff',
  'Env Amount': 'Envelope Amount', 'Env Mix': 'Envelope Mix', 'Env Decay': 'Envelope Decay', 'Filter Reson': 'Filter Resonance' };
export function parameterGuide(guide, parameter) {
  let name = controlAliases[parameter.symbol] || nameAliases[parameter.name] || parameter.name;
  if (guide?.id === 'factory-super-california' && name === 'Mid') name = 'Middle';
  if (['factory-mint-chocolate-chorus', 'factory-flamingo-flanger'].includes(guide?.id) && name === 'Blend') name = 'Mix';
  if (['factory-hi-pass-filter', 'factory-lo-pass-filter'].includes(guide?.id) && name === 'Frequency') name = 'Cutoff Frequency';
  return guide?.controls.find(c => (c.symbol && c.symbol === parameter.symbol)
    || normalize(c.name) === normalize(name));
}
