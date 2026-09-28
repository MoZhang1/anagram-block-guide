// Parameter-specific editorial revisions. Function and listening advice are separate.
// Physical-pedal manuals support function only, never Anagram ranges or knob positions.
const pedal = (slug) => `https://www.darkglass.com/pages/${slug}-manual`;
const cognate = (slug) => `https://cognate.audio/blocks/cognate-${slug}/manual/`;
const entry = (description, adjustment) => ({ description, adjustment });
const rows = (text) => Object.fromEntries(text.trim().split('\n').map(line => {
  const [name, description, adjustment] = line.split('|');
  return [name, entry(description, adjustment)];
}));
export const revisions = {
  'Harmonic Booster': {
    source: pedal('harmonic-booster'), scope: '实体单块官方说明 · 功能参考',
    description: '干净贝斯前级。整体增益、Character 音色塑形与三段均衡独立调节，中频支持选频。',
    setup: '先把 Character 降低、EQ 置于中性位置，用 Boost 配平旁通音量；再加入 Character，最后修整中频。',
    note: '官方实体手册明确给出：Boost ±20 dB；中频 250 Hz–2.5 kHz、±20 dB；Bass 在 80 Hz、Treble 在 5 kHz，各 ±20 dB。以上是实体版规格，不作为 Anagram 数字刻度。图中的 CHRCTR、MID FREQ 分别对应 Character、Mid Frequency；Bass 和 Treble 未画在单块缩略图上。',
    controls: rows(`Boost|全频段增益，不改变 EQ 曲线。|调高使整体电平上升；放在失真前会进一步推动后级。只比较音色时，应与旁通保持相近响度。
Character|控制预设音色塑形电路的混入量。|调低更平直，调高塑形更明显。先从低值增加，听音头和中频轮廓的变化；它不是失真量旋钮。
Mid Gain|提升或削减 Mid Frequency 选中的中频。|先小幅提升并扫动 Mid Frequency 找到目标，再决定增减：提升突出主体，削减可收敛鼻音或浑浊。
Mid Frequency|选择 Mid Gain 的作用频率。|低端偏厚度与低中频，高端偏音头与存在感。Mid Gain 处于中性时，改频率不应产生明显 EQ 变化。
Bass|低频均衡。|提升增加底部重量；削减收紧轰鸣。低频增加后要留意整条链的余量。
Treble|高频均衡。|提升突出弦噪、拨片和指尖细节；削减使声音柔和。失真毛刺明显时可小幅降低。`),
  },
  'Vintage Microtubes': {
    source: pedal('vintage-microtubes'), scope: '实体单块官方说明 · 功能参考',
    description: '复古贝斯过载。Era 与 Drive 联动，覆盖温暖的 70 年代中频和更紧实、带金属感的 80／90 年代音色。',
    setup: '先确定 Drive 与 Era 的失真质感，再用 Blend 留出所需干声，最后调 Level 配平。',
    controls: rows(`Drive|过载支路的饱和量。|低值保留较多动态；调高增加压缩感、延音和颗粒。改动后重新配平 Level。
Era|与 Drive 联动的年代音色控制。|调低偏温暖的 70 年代中频；调高偏紧实、有冲击力的 80／90 年代金属质感。
Level|过载支路音量，不是混合后的总音量。|调高让过载声更突出。Blend 偏干声时，Level 的影响较小；先固定 Blend，再配平。
Blend|混合干净信号与过载信号。|增加效果比例会突出失真；保留干声可维持低频和触弦轮廓。过载一路的响度由 Level 决定。`),
  },
  'Alpha Omicron': {
    source: pedal('alpha-omicron'), scope: '实体单块官方说明 · 功能参考',
    controls: rows(`Drive|过载支路的增益。|调高增加饱和与颗粒；调低保留动态。
Growl|低频搁架增强。|打开增加低部重量，也会加重低频饱和；失真发散时可关闭比较。
Bite|高中频增强。|打开突出触弦与清晰度；拨片或弦噪过尖时关闭。
Mod|混合 Alpha 与 Omega 两种失真电路。|偏 Alpha 更紧实、清楚；偏 Omega 更粗粝、猛烈。它不是调制深度。
Level|过载支路的音量。|调整失真声相对干声的响度，再检查总输出。
Blend|干净与过载信号的比例。|增加过载比例使颗粒更突出；降低可补回清晰的基音。`),
  },
  'Microtubes X': {
    source: pedal('microtubes-x'), scope: '实体单块官方说明 · 分频功能参考',
    note: '数字版与实体 X 的控制布局不同：这里只用实体手册解释高、低通支路的作用，不移植其 Mix、Mids 或数值范围。',
    controls: rows(`Low Pass|干净低频支路的低通截止点。|调高让更多中频保留在干净支路；调低只留下更深的低频。它不是整条信号的高切。
High Pass|失真高频支路的高通截止点。|调低让更多低中频进入失真，声音更厚、更毛；调高把失真集中在较高频段，轮廓更清楚。
High Drive|高频支路的失真量。|增加使高频更饱和、更有颗粒；低频支路仍可独立保持干净。`),
  },
  '70s Peggy': {
    description: '复古贝斯前级，旧名 Peggy Bass。高低频增强开关配合三段均衡，中频工作点由 Mid Shift 切换。',
    setup: '先关闭 Ultra Lo／Ultra Hi，用中频确定主体；再逐个打开增强开关，听它在整支乐队中的位置。',
    controls: rows(`Ultra Lo|低频增强／音色轮廓开关。|打开后比较深低频是否过量。若音符变得松散，先关闭再调 Bass；未确认数字模型的精确曲线。
Ultra Hi|高频增强开关。|打开增加触弦细节；配合 Treble 调整，避免弦噪过于突出。
Midrange|中频增减，与 Mid Shift 联动。|提升让主体更突出；削减产生凹中频听感。先选 Mid Shift，再决定增减量。
Mid Shift|切换 Midrange 的工作频段。|保持少量中频提升，依次比较档位，再回调 Midrange。数字模型各档精确频率尚未核实。
Level|前级输出电平。|调完 EQ 后用于匹配旁通响度，不用于选择失真性格。`),
  },
  'Gain': {
    description: '纯电平与极性工具。可用作级间增益、链尾音量补偿，或并行线路的极性反转。',
    controls: rows(`Gain|对整路信号做电平增减。|0 dB 不增不减；正值更响，负值更小。放在失真前会改变驱动程度，放在失真后主要改变输出响度。
Invert Polarity|把信号正负极性反转。|单独听一路通常没有明显差异；与另一条路径混合时切换比较，选择低频与主体没有明显抵消的一档。它不能补偿路径延迟。`),
  },
  'Sonic Enhancer': {
    description: '相位校正型音色增强器。Enhance 增加低频重量，Definition 突出弦头细节；两路增强都来自校正后的信号。',
    setup: '从 Enhance、Definition 均为 0 开始，分别增加低频和高频。最后降低 Output，让开启与旁通一样响，再判断保留多少增强。',
    note: '两项增强均为 0 时幅频响应平直，但全通相位处理仍在，不能等同于旁通。',
    controls: rows(`Enhance|相位校正后的低频增强量。|从 0 逐步增加，听低音弦的重量；轰鸣或音符堆积时回调。0–100 是控制量，不是 dB。
Definition|相位校正后的高频增强量。|增加会突出指板、弦头与拨片细节；指噪和毛刺也会更明显。用短音和长音交替比较。
Output|增强后的输出补偿，范围 ±12 dB。|增强后若整体变响，用负值配平；0 dB 不额外增减电平。`),
  },
  'Pirkko Chorus Deluxe': {
    setup: '先调 X-Over 保住干净低频，再用 Width 决定摆动幅度、Rate 决定快慢，最后增加 Intensity。',
    note: '官方介绍称预延迟为 Offset；现有官方面板和参数元数据使用 Spread，并多出 Stereo Mode。这里保留当前面板名，不把二者直接认定为完全同一参数。',
    controls: rows(`Intensity|把合唱声加入干声，原始干声保留。|增加使合唱更明显；不是从全干到全湿的替换式 Blend。
Rate|正弦 LFO 的速度。|低值是缓慢流动，高值是密集、水波般的摆动。
Width|音高调制的深度。|低值轻微加厚，高值音高摇晃更明显；不是左右声像宽度。
Spread|当前面板上的时间参数，单位 ms。|从较小值比较时间展开感。厂商文字仍使用 Offset，尚未确认这一改名是否伴随算法变化。
X-Over|只让分频点以上的信号进入合唱，范围 50–600 Hz。|提高可让更多低频保持干净，低音更稳；降低会让效果延伸到更深的音区。
Stereo Mode|立体声模式开关。|用双声道输出比较 Off／On；单声道监听无法完整判断左右展开。`),
  },
  'SmulTron III Envelope Filter': {
    controls: rows(`Sensitivity|演奏触发滤波的灵敏度。|提高后轻弹也能打开滤波；降低需要更重的触弦。调到轻重手仍有明显差别的位置。
Peak|滤波共振峰强度。|低值圆滑；高值扫频更尖、更有“呱”声。高共振时降低监听音量再调。
Decay|扫频回落时间。|低值回落快，适合短促 Funk；提高后扫频拖得更长，连奏时会更连贯。
Tone|包络打开时的最高频率。|降低偏暗、闷；提高让扫频打开得更亮、更有弹性。
Blend|原声与滤波声的比例。|加入干声可保住基音；效果比例高时扫频更突出。
Sweep|包络扫频方向。|Up 从低处向上打开；Down 从高处向下落，偏合成器下坠音。`),
  },
  'Cosmic Milk Chorus': {
    note: '此插件先把左右输入相加为单声道，再产生立体声合唱；放在它前面的立体声信息不会原样保留。',
    controls: rows(`Rate|合唱速度，内部深度随速度联动。|调慢获得宽缓流动，调快获得密集摆动；不能把它视为只改速度、深度完全不变。
X-Over|进入合唱的低频分界。|提高让更多低频避开调制，基音更稳；降低使效果覆盖更低音区。
Stereo|左右声像展开量。|从单声道逐步向更宽展开；用双声道监听确认位置。
Wet|合唱效果声的量。|增加使合唱更明显，降低让原声主体更突出。`),
  },
  'Amp Squeezer Overdrive': {
    note: '厂商建议：最重演奏时输入峰值约 −18 dB。先校准输入，再比较 Heat 和 Drive。',
    controls: rows(`Heat|移动失真谐波的频率重心。|低端偏清脆的高频咬合；往暖端增加时重心移向饱满低频。不是单纯的低频 EQ。
Drive|过载量。|提高增加饱和；配合 Heat 决定失真更集中在哪个频段。`),
  },
  'Bassement Plague Distortion': {
    note: '厂商建议最重演奏时输入峰值约 −18 dB。Fat 负责电路性格，不等同于低频增益。',
    controls: rows(`Fat|在两种失真电路音色间连续混合。|从两端分别比较颗粒与低频响应，再选中间位置；不是简单的“越大低频越多”。`),
  },
  'Cognate Kinetic': {
    source: cognate('kinetic'), scope: '厂商数字插件手册',
    setup: '先把 LFO 设为 0，选择 Frequency；用 Up/Down Range 确定方向，再调 Speed 和 Resonance。',
    note: '手册页面版本早于当前插件，旧手册的 Frequency 下限及 Range 默认值与现有元数据不同；数值沿用当前官方元数据。Vactrol 未在该版手册逐项解释。',
    controls: rows(`Speed|包络动作性格。|低值平缓流动；高值反应更快、更短促。它不是周期性 LFO 的速度。
Up/Down Range|包络扫频方向和幅度。|负值向下扫，正值向上扫；0 不随包络运动。绝对值越大，扫频越宽。
Frequency|包络未动作时的基础截止频率。|提高把扫频重心移向中高频；降低偏深沉。Range 从这个基准向上或向下移动。
Resonance|截止点的共振强度。|增加突出人声般的哇音；Ladder 高值可能自激。若音符尾端持续鸣叫，应回调。
Filter Type|选择滤波电路与通带。|Low Pass 保留低频；Band Pass 更像哇音；High Pass 削低频；Ladder 是低通梯形滤波，适合共振合成贝斯。
Drive|滤波路径中的饱和量。|0 保持干净；提高增加谐波与粗粝感，Ladder 模式会更像合成器驱动。
Smooth|在 Speed 基础上修整包络起落。|正值更圆滑，负值更迅速、棱角更强；0 保持 Speed 原有响应。
LFO|叠加在演奏包络上的自动调制。|正值为平滑正弦运动；负值为阶梯式采样保持；0 关闭。并非替代演奏包络，而是与它叠加。
Vactrol|光耦响应相关参数；旧版公开手册未解释其具体映射。|保留默认值作为基准；尚不将数值增减解释为明确的快慢方向。`),
  },
  'Cognate Polymath': {
    source: cognate('polymath'), scope: '厂商数字插件手册',
    setup: '先只开一个声部；需要整段降调时，把其他声部关掉，设置 Shift 的 Interval，再把 Mix 调至全湿。',
    controls: rows(`Sub|低一八度声部电平。|向 0 dB 增加会更突出；−40 dB 为 Off。少量混入增加深低频重量。
Oct|高一八度声部电平。|增加带来更明亮的上八度；−40 dB 为 Off。混合干声可得到八弦贝斯式层次。
Oct 2|高两八度声部电平。|少量加入增加高端泛音感；过高可能尖细。−40 dB 为 Off。
Shift|自由移调声部的电平。|这里管音量，音程由 Interval 决定；−40 dB 关闭此声部。
Interval|Shift 声部相对原音的半音数。|−12 低八度，19 为高八度加五度；0、12、24 带轻微失谐加厚。只影响 Shift 声部。
Mix|四个移调声部与原声的总混合。|0 为干声，1 为全湿。整体降调要用全湿，否则仍会听到原调。
Tone|只作用于移调声部的倾斜 EQ。|负值偏暗、暖；正值偏亮、清脆；0 平直，干声不受此 EQ 影响。
Attack|移调声部的音头塑形。|0 保持自然音头；负值渐入；向正值增加依次出现更软的拨片式音头、门控脉冲与强瞬态。不是毫秒值。
Quality|音质与 DSP 占用档位。|Eco 适合后接失真；Medium 用于日常；High 偏向和弦、主奏的清晰度。当前版 Medium 的音头响应已有更新。`),
  },
  'Cognate Aperture': {
    source: cognate('aperture'), scope: '厂商数字插件手册',
    controls: rows(`HPF Cutoff|低切截止频率。|提高削掉更多低频；从较低频率开始，避免过多削弱最低音的基音。
HPF Slope|低切斜率。|12 dB/oct 较缓，48 dB/oct 更陡；Off 只关闭此滤波，HPF Emphasis 仍工作。
HPF Emphasis|低频端附近的钟形均衡，不是截止点共振。|负值削减主体的一部分；正值补回低频重量。滤波关闭时也可单独使用。
LPF Cutoff|高切截止频率。|降低收敛指噪和失真毛刺；降得更低可形成暗、圆的 Dub 音色。
LPF Slope|高切斜率。|12 dB/oct 平缓，36／48 dB/oct 切除更陡；Off 不会关闭 LPF Emphasis。
LPF Emphasis|高频端附近的钟形音色修整。|负值收敛上端刺耳感，正值增加亮度；它不等同于提高共振尖峰。
Warmth|带电平补偿的磁带式饱和。|0 不加饱和；厂商建议 20–40% 可作轻微染色。继续增加会加厚并柔化峰值。
Phase Invert|反转输出极性。|与并行干声混合时比较 Normal／Inverted；选择低频抵消较少的一档。
Output Level|滤波与 Warmth 之后的输出电平。|重度滤波后可补偿音量；增益过高时用负值衰减。`),
  },
  'Cognate Hologram': {
    source: cognate('hologram'), scope: '厂商数字插件手册',
    controls: rows(`Type|立体声生成算法。|Micropitch／Microshift 是微移调加短延迟；Dimension 较平稳；Hyper 更密集；Doubler 偏 BBD 加倍。名称以当前选项为准。
Depth|主效果量。|低值轻微展开；高值更明显。先选 Type，再决定效果量。
Modulation|算法内部的音高／延迟运动量。|低值较稳定；提高增加流动，过高会出现明显摇晃。
Width|主效果之后的 Mid/Side 扩宽。|0 保留算法自身宽度；增加突出侧边声像。与 Pirkko 的同名参数不同。
Low Mono|保持单声道的低频上限。|提高让更多低频留在中央，基础更稳；降低使扩宽延伸到更低音区。`),
  },
  'Cognate Pultrick': {
    source: cognate('pultrick'), scope: '厂商数字插件手册',
    controls: rows(`Low Freq|低频 Boost／Atten 的共同频率档位。|20／30 Hz 偏深低频，60／100 Hz 逐渐偏重量与冲击。不是连续扫频。
Low Boost|低频提升量。|单独增加会加厚；与 Low Atten 同时增加可得到低频隆起、其上方收紧的交互曲线。
Low Atten|低频削减量，作用位置与 Boost 并不完全重合。|增加削减低频区域；与 Low Boost 配合不会简单抵消为平直。
High Freq|高频提升的中心频率。|较低档突出存在感，较高档偏弦头和空气感；带宽由 Bandwidth 决定。
High Boost|选定高频的提升量。|增加突出该频段；先小幅提升，再调带宽避免过于集中。
Bandwidth|高频提升的带宽。|低值窄、高值宽；与常规 Q 值的增减方向相反。
Atten Freq|高频削减的频率档位，独立于 High Freq。|可在一个频率提升、另一个频率削减，保留细节同时收敛尖锐感。
High Atten|高频削减量。|增加使高端更柔和；与 High Boost 配合修整明亮度。
Gain|模型输出电平。|用于配平 EQ 后的响度；厂商说明推高也可能更强地推动建模输出级。`),
  },
  'Bass 3500': {
    controls: rows(`Tube|管式前级支路的混入量。|增加偏温暖和谐波感；与 Solid State 分别调整，两者不是互斥选择。
Solid State|晶体管前级支路的混入量。|增加偏清晰、直接的触弦响应；与 Tube 配合确定前级性格。
Compression|内置压缩量。|增加收拢峰值、使动态更均匀；过量会削弱音头。
Low Pass|约 100 Hz 的宽带低频轮廓均衡。|正值增加低频重量，负值收紧底部。单位是 dB，不是高切截止频率。
High Pass|约 10 kHz 的宽带高频轮廓均衡。|正值增加高端细节，负值减轻弦噪。单位是 dB，不是低切截止频率。`),
  },
  'Groove': { controls: rows(`Sub|深低频轮廓的三档选择。|Boost 加厚、Flat 平直、Cut 收紧；不是低八度声部。
Mid Range|中频均衡的中心频率。|先选 200 Hz–3.2 kHz 内的目标，再用 Mid 提升或削减。`) },
  'Uè Uè Wah': { controls: rows(`Heel|表情踏板脚跟端的元音。|选择起点元音，再用 Position 扫向另一端，听声母般的音色过渡。
Mid|踏板中间位置的元音选择。|用于增加中途发音变化；不是中频 EQ。
Toe|表情踏板脚尖端的元音。|与 Heel 组成两端发音；Position 变化时在两者之间扫动。
Sex|元音共振峰的人声性格。|与 Age 配合比较声音的粗细与共鸣，不改变演奏音符的实际音高。
Age|元音共振峰的年龄感。|改变发音质地；与元音选择一起比较，不能按高低频 EQ 的刻度理解。`) },
  'Doubler': { controls: rows(`Mono|让低频集中于单声道的控制。|增加使更多低频保持中央；不是整路输出的 Mono 开关。
Pitch|加倍声部的音高差异量。|增加更像两次演奏；过大可能出现明显跑调感。
Offset Left|左侧加倍声部的时间偏移。|与右侧用不同偏移可拉开空间；过大可能听成独立回声。
Offset Right|右侧加倍声部的时间偏移。|与左侧交替比较，避免一侧明显拖后。`) },
  'Big Red Mute Button': { setup: '将单块启用／旁通绑定到脚钉。启用就是静音，旁通恢复声音。', controls: rows(`Fade|进入和退出静音的渐变时间。|短时间切换直接；长时间淡入淡出更平滑。它不是静音后的衰减深度。`) },
  'Duality Fuzz': {
    source: pedal('duality-fuzz'), scope: '实体单块官方说明 · 功能参考',
    controls: rows(`Duality|混合两种独立 Fuzz 电路。|最低端是门控锯齿波式毛刺，最高端是更紧实的高增益 Fuzz；中间位置混合两者。
Level|Fuzz 支路音量。|先固定 Blend 再调音量；不是混合后的总音量。
Filter|Fuzz 信号的高频含量。|用来收敛或保留毛刺；官方文字未写数字模型的增减方向，以面板试听确认。
Blend|干净输入与 Fuzz 的混合。|保留干声维持基音，增加效果比例突出毛刺；Fuzz 电平另由 Level 决定。`),
  },
  'Gaffa': { controls: rows(`Bias|磁带饱和与谐波性格。|在固定 Time／Repeats 下比较染色，再用 Mix 控制明显程度。
Crinkle|磁带磨损、褶皱感。|增加使回声更不规则、更粗糙。
Tapeage|磁带老化程度。|增加获得更陈旧、退化的回声质地。
Drift|慢速音高漂移。|增加使回声逐渐晃动；与 Wowflutter 分开调以辨认慢漂移。
Wowflutter|磁带转速不稳引起的音高波动。|增加带来更明显的颤动；少量可作轻微磁带感。
Repeats|延迟反馈量。|增加让重复更持久；高值时留意电平累积。`) },
  'Shiroverb MKII': { controls: rows(`Earlytail|早期反射与混响尾部的平衡。|偏早期反射更有近处空间感；偏尾部更绵长、适合铺底。方向以图中刻度为准。
Interval|Shimmer 的移调音程。|选择上／下八度、五度或轻微失谐，改变尾音的和声色彩。
Predelay|原声到混响出现前的时间间隔。|增加可让拨弦音头先出来；太长会听成原声与空间分开。
Shimmer|进入混响的移调效果量。|增加突出空灵、泛音式尾音；减少使空间更自然。`) },
  'Auto Drummer': { controls: rows(`Action|单脚钉播放控制。|停止时触发开始；播放中单击加花，500 ms 内双击停止，长按 1 秒换下一段。
Use Host Tempo|跟随 Anagram 的 BPM。|开启后本地 Tempo 不可调；只同步速度，不同步小节相位。
Level|鼓伴奏输出电平。|调低为演奏留出空间；−30 dB 对应静音。`) },
  'DualComp': { controls: rows(`Comp Style|预设压缩时间与比例的组合。|Tight、Punch、Crush 分别提供不同动态性格；不是单独的 Ratio。
Low-Comp In|低频压缩开关。|先单独打开低频压缩，控制深低频动态，再加入全频级。
Full-Comp In|全频 FET 风格压缩开关。|开启后收拢整段动态；用 Comp Mix 保留所需干声音头。
Comp Mix|全频压缩与干声的并行混合。|提高压缩比例使密度更明显；保留干声可维持冲击感。`) },
  'DualGate': { controls: rows(`Mode|噪声门响应模式。|Hard 关闭迅速、紧；Dynamic 对短音快速关门，对持续音保留较自然的衰减。
Range|关门时的最大衰减量。|衰减较浅只压低底噪，较深更接近静音；不改变开门阈值。`) },
  'SubGlow': { controls: rows(`Frequency|低频增强的中心区域。|调低偏深低频，调高偏上方低频；先确定要强化的音区。
Glow|增强强度与谐波性格。|增加使低频更有重量和染色，再用 Mix 留出自然的触弦轮廓。`) },
  'Wool': { controls: rows(`LPF Freq|低通支路截止频率，70 Hz–3 kHz。|调低更暗、更偏基音；提高保留更多中高频。
LPF Peak|低通峰值强调档位。|+12 dB 比 +6 dB 更突出截止点附近的音色；注意峰值电平。
HPF Freq|高通支路截止点，4 kHz／6 kHz 两档。|4 kHz 纳入更多高频细节；6 kHz 更集中于顶端。该支路与低通支路配合，不是全局低切。
HPF Amount|高通支路混入电平。|增加补回高频细节；降到底可移除此支路。
Blend|原声与滤波处理声的比例。|增加效果声突出双滤波音色，加入原声保留原始宽频轮廓。`) },
  '4K-E': { controls: rows(`LF Bell|低频段从搁架切换为钟形。|关闭影响整片低端；开启聚焦 LF Freq 周围。
HF Bell|高频段从搁架切换为钟形。|关闭修整整片高端；开启集中处理 HF Freq 周围。
LMF Q|低中频钟形带宽。|Q 越高越窄，越低越宽；此模型实际 Q 还随增益提升而收紧。
HMF Q|高中频钟形带宽。|低 Q 较宽，适合整体塑形；高 Q 集中修整尖锐区域，实际宽度也与增益有关。
Transformer|建模输出变压器开关。|开启加入低频先饱和的染色，底部更厚、上端更柔；不是单纯提升低频。`) },
  'PolyShim': { controls: rows(`Sub Voice|进入 Shimmer 引擎的低一八度声部。|增加低部重量；长 Decay 时避免低频堆积。
Root Voice|进入 Shimmer 引擎的原音高声部。|增加可保留原音区的空间主体。
Hi Voice|进入 Shimmer 引擎的高一八度声部。|增加高端和声与明亮感；过多可能盖住原声。`) },
  'Picking Fingers': { controls: rows(`Voice|指弹／拨片音色转换方向。|FINGERS 将拨片音色塑形成指弹取向；PICK 将指弹塑形成拨片取向。
Bite|仅加强音符起始的粗颗粒。|增加突出音头，不会同样加重持续部分的失真。
Attack|逐音的起音响应塑形。|固定 Voice 后比较音头力度；公开介绍未给出数值到时间的映射，不按毫秒理解。
Tone|±6 dB 倾斜式音色均衡。|0 为平直；往亮端突出细节，往暗端柔化触弦。`) },
  'Arcadia U7': { controls: rows(`Boost|以 3 dB 步进增加增益。|厂商建议提高到蓝色 Signal 指示灯在演奏动态内较稳定地点亮；同时检查后级余量。
Tone|七档宽带 EQ 曲线。|前六档来自原型，第七档为厂商新增的贝斯穿透型曲线；逐档比较，不是连续高切。
Tone Enable|Tone 曲线开关。|关闭时比较前级本身，开启后应用选定曲线。`) },
};

// These are explicitly editorial listening tips, not manufacturer quotes.
export function standardGuide(block, control) {
  const n = control.name.toLowerCase().replace(/\s+/g, ' ').trim();
  const gate = /gate|suppressor/i.test(block.name) || /gate thresh/.test(n);
  const compressor = /compressor|limiter|ignissor|dualcomp/i.test(block.name);
  if (n === 'level' && (block.category !== '失真与过载' || /reverb|delay/i.test(block.name))) return entry(control.group ? `${control.group} 的电平。` : '输出电平。', '调高更响、调低更小；完成音色调整后与旁通配平。');
  if (n === 'level') return entry('效果音量。', '固定 Drive 和 Blend 后配平。该模型的公开资料未明确是否只作用于失真支路，不按总输出推断。');
  if (n === 'volume') return entry(block.name === 'Volume Pedal' ? '音量踏板位置。' : block.category === '音箱与前级' ? '音箱通道音量。' : '输出音量。', block.name === 'Volume Pedal' ? '绑定表情踏板实现渐入；放在混响前保留尾音，放在混响后则一起控制尾音。' : block.category === '音箱与前级' ? '提高可能同时推动后级；用 Master 或 Output 配平后比较饱和变化。' : '用于配平开启与旁通的响度。');
  if (n === 'position') return entry(block.category === '箱体' ? '箱体拾音位置。' : '哇音位置。', block.category === '箱体' ? '靠近扬声器中心通常更亮，靠边缘更柔和；按位置选项比较。' : '绑定表情踏板连续扫动；固定在某处可作为窄带音色修整。');
  if (n === 'mic' || n === 'mic type') return entry('麦克风型号／采样选择。', '逐个比较低频重量、音头和高频毛刺；切换型号后重新匹配输出响度。');
  if (n === 'mic position') return entry('麦克风相对扬声器的位置。', '中心通常更亮，边缘更柔和；先固定型号再移动位置。');
  if (n === 'mic distance') return entry('麦克风与声源的距离。', '近处通常更直接；拉远改变低频与空间关系。与并行 DI 混合时留意抵消。');
  if (n === 'tweeter position') return entry('高音单元的拾音位置。', '移动位置比较高频细节；用 Tweeter Gain 控制最终混入量。');
  if (n === 'tweeter distance') return entry('麦克风距高音单元的距离。', '改变距离比较高频与空间关系；不等于直接调节高音音量。');
  if (n === 'ir / cabinet' || n === 'ir / preset' || n === 'ir') return entry('脉冲响应选择。', '切换拾音或空间响应会改变频谱与尾音；先降低监听音量，再逐项比较并配平。');
  if (n === 'model') return entry(block.category === '箱体' ? '箱体采样选择。' : '捕捉模型选择。', block.category === '箱体' ? '每个选项对应不同拾音／混合结果；选定后再调整模式与电平。' : '先选模型，再调 Input 和 Output。不同捕捉的输入校准不同，不沿用同一增益判断。');
  if (n === 'cabinet type') return entry('箱体模型选择。', '比较中频轮廓与高频衰减；型号确定后再选麦克风及位置。');
  if (n === 'cabinet mode' || n === 'cab bypass') return entry('内置箱体的启用／旁通。', '另接箱体 IR 时可选 Bypass，避免串联两次箱体。');
  if (n === 'mode' && control.options?.length) return entry('处理模式选择。', `可选 ${control.options.map(o=>o.label).join('、')}。切换后保持相近响度比较；部分参数会随模式改变作用。`);
  if (n === 'mode') return entry('处理模式选择。', '该版本的完整选项与映射尚未核实；以设备显示为准。');
  if (n === 'master') return entry('音箱主音量。', '配合前级 Gain／Volume 设定音量；部分模型会同时改变后级饱和，最后用 Output 配平。');
  if (n === 'input') return entry('进入处理器的输入电平。', '提高会更强地推动后面的压缩、饱和或捕捉模型；降低可保留余量。用 Output 补偿响度。');
  if (n === 'attenuation') return entry('输出衰减。', '增加衰减使声音变小；用于匹配不同 IR 的音量。');
  if (/^(low|high|bass|treble|low mid|high mid|hi mid|lmf|hmf|lf|hf|band [2-5]) (freq|frequency)$/.test(n)) return entry(`${control.name.replace(/ (Freq|Frequency)$/,'')} 均衡的作用频率。`, '配合本频段增益选择修整位置；增益为 0 dB 时扫频通常没有明显变化。');
  if (/^(low shelf|high shelf|band [2-5]|lf|lmf|hmf|hf) gain$/.test(n)) return entry('该频段的均衡增益。', '正值提升、负值削减，0 dB 中性；作用位置由同组频率参数决定。');
  if (/(^| )q$/.test(n)) return entry('均衡 Q 值。', 'Q 大作用更窄，适合定位问题；Q 小更宽，适合整体音色塑形。');
  if (n === 'presence') return entry('上中频／高频存在感。', '增加突出音头和穿透力；过尖时减少，避免与 Treble 同时大幅提升。');
  if (/^(low|high|mid|octave|comp|mic|tweeter|di|diout) (level|gain)$/.test(n)) return entry(`${control.name.replace(/ (Level|Gain)$/i,'')} 支路电平。`, '增加使该支路更突出；减少让其他支路占比更高，混合后配平总输出。');
  if (/^voice (in|[2-4]) level$/.test(n)) return entry('该加倍声部的电平。', '先单独听此声部，再与其余声部混合；过多声部同时推高会累积响度。');
  if (/high pass filter|^(di|diout) low cut$|^reverb hpf$|^hpf$/.test(n)) return entry('该路径的高通（低切）截止频率。', '提高减少低频堆积；效果支路低切可给干声的基音留出空间。');
  if (/^(di|diout) high cut$|^reverb lpf$|^lpf$/.test(n)) return entry('该路径的低通（高切）截止频率。', '降低削去更多高频，音色更暗；提高保留细节。');
  if (n === 'comp ratio') return entry('低频压缩比例。', '提高后低频动态更集中；过高会削弱低音弦的冲击感。');
  if (n === 'low comp' || n === 'compression') return entry('压缩量。', '增加收拢峰值、使持续音更均匀；过量会损失触弦动态。');
  if (/^(bpm|tempo|tempo bpm)$/.test(n)) return entry('每分钟拍数。', '数值提高节奏变快；全局同步时以设备的速度来源为准。');
  if (n === 'subdivision' || n === 'note') return entry('节奏细分。', '在相同 BPM 下，较短音符产生更密集的重复；附点和三连音改变节奏位置。');
  if (/^(host sync|sync|use host tempo|tempo sync|lfo sync)$/.test(n)) return entry('全局速度同步。', '开启后跟随设备速度，关闭后使用本单块的自由时间／速度。BPM 同步不一定同步小节起点。');
  if (/^(threshold|.* thresh(old)?)$/.test(n)) return entry(gate ? '噪声门触发阈值。' : '压缩开始介入的电平阈值。', gate ? '提高更容易关门，但会截断轻弹和尾音；从低值增加到停奏时安静即可。' : '降低后更多音符进入压缩；提高保留更多动态。观察压缩量并监听重音。');
  if (n === 'attack' && compressor && block.name !== 'FET Compressor') return entry('压缩介入的时间。', '时间短更快压住峰值，音头更圆；时间长让更多拨弦瞬态先通过。');
  if (n === 'release' && compressor && block.name !== 'FET Compressor') return entry('压缩恢复的时间。', '短时间恢复快；长时间更平稳，但可能连下一个音也一起压住。按乐句节奏调整。');
  if (n === 'attack' && block.name === 'FET Compressor') return entry('压缩介入速度。', '比较快速响应的圆润音头与慢响应的冲击感。数字刻度的方向尚未核实，不套用实体 1176 的反向刻度。');
  if (n === 'release' && block.name === 'FET Compressor') return entry('压缩恢复速度。', '以连续短音比较恢复是否跟上演奏；数字刻度不直接按毫秒解释。');
  if (n === 'ratio') return entry('超过阈值后的压缩比例。', '比例越高动态压得越紧；例如 4:1 表示输入超过阈值 4 dB，输出约增长 1 dB。');
  if (n === 'knee') return entry('阈值附近的压缩过渡宽度。', '软拐点介入更渐进，硬拐点更明确；先固定 Threshold，再比较音头。');
  if (n === 'attack' && /axioma|shedspace/i.test(block.name)) return entry('合成声部的起音时间。', '短时间起音直接；长时间渐入，适合铺底。');
  if (n === 'release' && /axioma/i.test(block.name)) return entry('合成声部停止触发后的释放时间。', '增加让尾音更长；缩短使短音更干脆，减少重叠。');
  if (n === 'decay' && /reverb|shiroverb|polyshim/i.test(block.name)) return entry('混响尾音的衰减时间。', '增加使空间延续更久；快速低音乐句中缩短，可减少低频堆积。');
  if (n === 'feedback') return entry(/delay|gaffa/i.test(block.name) ? '回声反馈量。' : '效果信号的反馈量。', /delay|gaffa/i.test(block.name) ? '增加让重复持续更久；高值可能积累或自激，应小幅调整。' : '增加突出共振与扫动；过高可能尖锐或显著变响。');
  if (n === 'depth' && /hardball|amp/i.test(block.name)) return entry('音箱后级的低频共振控制。', '增加底部冲击；过量会松散、轰鸣。与前级 Bass 分别比较。');
  if (n === 'depth' && /trem/i.test(block.name)) return entry('音量调制的幅度。', '低值轻微起伏，高值产生更深的切分；与 Rate／Tempo 配合。');
  if (n === 'depth' && /chorus|vibrato|vibralis/i.test(block.name)) return entry('音高调制的幅度。', '低值轻微漂移，高值摇晃更明显；要加快运动应调 Rate。');
  if (/^(gain|amp gain)$/.test(n) && ['失真与过载','音箱与前级'].includes(block.category)) return entry('前级驱动增益。', '增加更容易进入饱和，谐波和压缩感更强；用输出音量补偿，避免只因变响而误判。');
  if (n === 'overdrive' && /ISOBRICK|Fruity/.test(block.name)) return entry('过载开关。', '打开进入过载路径，关闭比较干净音色；用 Gain 确定驱动程度。');
  if (/^(drive|distortion|overdrive)$/.test(n)) return entry('失真／饱和量。', '低值保留触弦动态，高值增加颗粒和延音；失真过密时先回调，再检查输出音量。');
  if (/^(output|output gain|output level|output volume|trim)$/.test(n)) return entry('处理后的输出电平。', '与旁通配平响度；正增益更响，负增益更小。此处变响也会影响后面单块的输入。');
  if (/^(dry|dry level|clean level)$/.test(n)) return entry('干声支路电平。', '增加保留原始基音与音头；减少让效果声更突出。');
  if (/^(wet|wet level)$/.test(n)) return entry('效果声支路电平。', '增加让处理更明显；不等同于调高整路输出。');
  if (/^(blend|mix|wet\/dry|dry\/wet blend)$/.test(n) && !/merge|return|fx loop/i.test(block.name)) return entry('干声与效果声的混合比例。', '偏干声保留原始音头，偏效果声让处理更明显；混合后重新检查响度。');
  if (/^(bass|low|low shelf)$/.test(n)) return entry('低频均衡。', '提升增加重量；削减收紧轰鸣。以当前面板的中性位置为基准，小幅增减。');
  if (/^(treble|high|high shelf)$/.test(n)) return entry('高频均衡。', '提升增加弦头与亮度；削减使声音柔和，减轻弦噪。');
  if (/^(mid|middle|midrange|mid gain|mid level|active mid)$/.test(n)) return entry('中频均衡。', '提升突出音符主体；削减可减轻鼻音或浑浊。若有频率选择，先确定作用频段。');
  if (/^(low mid|lo-mid|mid low|low-mid)$/.test(n)) return entry('低中频均衡。', '提升增加厚度；削减减轻闷与浑浊。');
  if (/^(hi mid|hi-mid|high mid|mid high)$/.test(n)) return entry('高中频均衡。', '提升突出轮廓和触弦；削减收敛鼻音与硬度。');
  if (/^(low|high|hi|lo)?[- ]?mid (frequency|freq)$|^mid frequency$/.test(n)) return entry('中频均衡的中心频率。', '先小幅提升同组 Gain，再扫频定位；找到目标后回调增益。Gain 中性时改频率影响很小。');
  if (/^(eq )?\d+(\.\d+)?\s*k?\s*hz$/.test(n)) return entry(`${control.name.replace(/^Eq /,'')} 频段增益。`, '正值提升、负值削减，0 dB 中性。一次小幅调整一个频段，再与旁通比较。');
  if (/^(rate|speed|mod rate|freerunning rate|lfo free rate)$/.test(n) && block.category !== '音箱与前级') return entry('周期性调制的速度。', '提高运动更密集，降低运动更缓慢；同步开启时改用节拍细分。');
  if (n === 'time' && /delay|gaffa/i.test(block.name)) return entry('相邻回声的时间间隔。', '缩短变紧密，拉长更疏；同步模式下由速度和音符细分决定。');
  if (/^(semitone|osc 2 semitone)$/.test(n)) return entry('半音移调。', '正值升高、负值降低；12 个半音是一八度。');
  if (/^(fine tune|osc 2 fine)$/.test(n)) return entry('音分微调。', '小幅偏离零可产生失谐加厚；100 音分等于一个半音。');
  if (/^(invert polarity|return polarity|phase invert)$/.test(n)) return entry('反转信号极性。', '在并行混合时比较两档，检查低频是否抵消；不用于修正路径时间差。');
  if (n === 'trails') return entry('旁通后的效果尾音保留开关。', '开启保留自然衰减，关闭切断尾音；换段落时按需要选择。');
  if (n === 'slope' || /^(hpf|lpf|hp|lp) slope$/.test(n)) return entry('滤波斜率。', '每八度衰减的 dB 数越大，切除越陡；先确定截止频率，再比较斜率。');
  if (n === 'cutoff frequency' && block.name === 'Hi-Pass Filter') return entry('高通截止频率。', '提高削掉更多低频；降低保留更深的基音。');
  if (n === 'cutoff frequency' && block.name === 'Lo-Pass Filter') return entry('低通截止频率。', '降低收敛更多高频；提高让弦头与毛刺通过。');
  if (n === 'low cut' && block.name === 'Gentle') return entry('低切开关。', '开启减少不必要的低频；关闭保留完整底部。');
  if (/^(hp freq|hpf cutoff|high pass cutoff|hi-pass freq|low cut|lowcut)$/.test(n) && control.range?.maximum !== 1) return entry('高通（低切）截止频率。', '提高会削掉更多低频；降低保留底部重量。');
  if (/^(lp freq|lpf cutoff|low pass cutoff|lo-pass freq|high cut|hi cut)$/.test(n) && control.range?.maximum !== 1) return entry('低通（高切）截止频率。', '降低会削掉更多高频，使声音更暗；提高保留更多明亮度。');
  return null;
}
