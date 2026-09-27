// Label-based explanations are editorial aids, not claims about undisclosed DSP circuits.
const exact={
 'vintage filter':'复古取向的音色轮廓滤波，影响明亮度与声音重心；不是普通音量控制。',
 'modern filter':'现代取向的音色轮廓滤波，改变低高频与中频之间的平衡。',
 'wave':'振荡器波形：锯齿更明亮，方波更空心，三角波更柔和。',
 'ir / cabinet':'选择该艺术家系列的箱体 IR；不同名字代表不同拾音／混合结果。',
 'aura shaper':'音箱专用音色轮廓控制；公开资料未给出准确曲线，建议在响度匹配下比较其对音色重心的改变。',
 'filter resonance':'滤波共振峰强度，强调截止点附近的频率。',
 'filter poles':'选择滤波极数，更多极数通常带来更陡的衰减与不同的共振性格。',
 'gate':'噪声门强度／响应控制。阈值已合适时，再比较门的关闭表现。',
 'pre amp':'前级推动量，改变进入后续饱和阶段的电平。',
 'chorus power':'合唱部分开关。',
 'chorus':'持续参考音的合唱加厚量。',
 'oversampling':'过采样设置，在音质、混叠控制与 DSP 占用之间权衡。',
 'air':'高端空气感／明亮度塑形。',
 'wah':'直接控制哇音位置，或在 Auto Swell 中加入哇音式色彩。',
 'ramp':'扫频／渐变曲线形状：Linear 线性、Log 对数、Exp 指数。',
 'inverted':'反转自动哇音的扫频方向。',
 'auto':'自动跟随演奏触发哇音；关闭后可使用手动位置控制。',
 'sustain':'延音／持续部分的动态塑形，改变音头之后的保持感。',
 'glue':'整体动态凝聚感控制；其专有内部实现未公开，不等同于单一压缩比例。',
 'master reverb':'两通道汇总后的混响量。',
 'power amp':'后级功放模型开关／设置，用于加入后级的响应与染色。',
 'vol vib trem':'Vib-Trem 通道音量，决定该通道进入整体声音的程度。',
 'vol normal':'Normal 通道音量／推动量。',
 'vol brilliant':'Brilliant 明亮通道音量／推动量。',
 'cut':'高端音色削减，增加可收敛音箱的明亮与锐利感。',
 'power amp resonance':'后级低频共振，影响底部的厚度与响应。',
 'power amp presence':'后级高频存在感，影响亮度与音头。',
 'power amp power':'后级功率／响应设置，以列出的选项为准。',
 'mid-cut':'开关固定的中频削减，用于切换拨片与手指等不同音色需要。',
 'boost':'提升送出电平或推动后级。Harmonic Booster 中用于整体干净增益；提升后请检查后级是否过载。',
 'character':'改变整体音色／染色性格；它不是单纯的音量旋钮，建议与原声交替比较。',
 'era':'改变复古音色取向：由更温暖的 70 年代感，转向更紧实、带金属质感的 80／90 年代感；与 Drive 相互影响。',
 'blend':'混合干声与效果声。效果比例越大，处理越明显；保留一些干声通常有利于维持贝斯音头与低频。',
 'mix':'干湿混合。控制加入多少效果声；不是只把整体音量调大。',
 'wet/dry':'调整效果声与干声的混合比例。',
 'dry/wet blend':'调整原始乐器与合成／效果声的比例。',
 'threshold':'触发阈值。压缩器中调低通常会压得更多；噪声门中调高更容易关闭，也更可能切掉轻弹。',
 'ratio':'压缩比例。比例越大，超过阈值的音量增长被压得越明显；高比例更接近限制器。',
 'knee':'压缩拐点的软硬。较软的拐点在阈值附近逐渐介入；较硬的拐点更直接。',
 'attack':'起始反应时间。压缩中影响音头有多少能通过；包络／合成器中决定声音或滤波动作多快升起。注意旋钮刻度不一定等于毫秒。',
 'release':'释放时间。压缩／噪声门中控制处理解除速度；合成器中决定停止触弦后的尾音长度。',
 'decay':'衰减时间。混响中控制尾音长度，包络滤波中控制扫频回落速度。',
 'sensitivity':'输入触发／追踪灵敏度。软触弦不响应时可提高；杂音也会触发时应降低，并检查演奏闷音。',
 'resonance':'强调滤波截止点附近的频率。越大通常越有“哇／啾”的尖峰感，也可能明显增加响度。',
 'filter reson':'滤波共振，强调截止点附近的频率，增加尖峰与哇音质感。',
 'peak':'滤波共振峰的强度，调大通常使扫频更尖、更有“呱”感。',
 'filter':'修整效果声频谱。不同单块方向不同，请边弹边调；不是所有 Filter 都是同一种滤波器。',
 'tone':'整体明暗或音色平衡。用于把效果融入原声；具体曲线因单块不同而异。',
 'presence':'上中频／高频存在感，影响音头、弦噪和穿透感；过多可能刺耳。',
 'bass':'低频音色量，影响厚度与重量。过多会轰、会占用动态余量。',
 'treble':'高频音色量，影响明亮度、指噪与拨弦细节。',
 'low':'低频均衡，调整底部厚度。',
 'high':'高频均衡，调整上端明亮度。',
 'mid':'中频均衡，影响声音的主体、鼻音感与穿透力。',
 'middle':'中频均衡，影响主体和穿透力。',
 'midrange':'中频均衡，配合 Mid Shift／Mid Frequency 决定在哪个区域增减。',
 'passive mid':'被动式中频音色控制，与主动中频具有不同的作用曲线；配合试听调整。',
 'active mid':'主动中频增减，配合 Mid Freq 选择要修整的中频区域。',
 'mid shift':'选择中频控制的工作点／档位，不是移调。先选频段，再调中频量。',
 'bass shift':'切换低频均衡的工作频率，改变低频增强更偏深沉还是偏结实。',
 'mid contour':'切换宽范围中频轮廓；适合快速比较平直与更有凹凸的音色。',
 'mid boost':'打开中频提升，让声音更突出。',
 'grunt':'低频重心／饱和性格开关，让过载更有低部重量。',
 'growl':'低频增强开关，为失真增加重量和更厚的低部。',
 'bite':'增强咬合与音头存在感。Picking Fingers 中作用于音符起始颗粒；其他单块以各自音色为准。',
 'ultra lo':'切换低频轮廓增强，通常带来更深的低频与不同的中频平衡。',
 'ultra hi':'高频增强开关，增加亮度和触弦细节。',
 'duality':'在两种 Fuzz 电路性格之间混合，不是普通干湿混合。',
 'mod':'调制量；Alpha Omicron 例外，那里是在 Alpha 与 Omega 失真性格之间混合。',
 'feedback':'把效果输出送回处理入口。延迟中增加重复，镶边／相位中增加共振；高值可能明显堆积或自激。',
 'repeats':'回声重复／反馈量。增加会让回声持续更久。',
 'repeat':'回声重复量，越高通常尾音越长。',
 'trails':'旁通后是否保留自然衰减的延迟／混响尾音。开启留尾，关闭通常立即停止。',
 'time':'延迟间隔或渐入／扫频时间；同步打开时通常由节奏细分决定。',
 'range':'作用范围。噪声门中是最大衰减量；原厂 Delay 中是时间旋钮的工作区间。',
 'subdivision':'按全局速度划分的音符长度；可含附点和三连音。关闭同步时手动调时间。',
 'note':'同步时使用的音符时值，配合 BPM 决定实际时间。',
 'rate':'周期性变化速度，越快越密集；与深度不是同一件事。',
 'speed':'运动速度。一般控制调制循环；Cognate Kinetic 中改变包络动作性格。',
 'depth':'调制深度，改变摆动幅度。音箱中的 Depth 可能是低频后级共振，见该单块用途。',
 'shape':'周期波形／形状，决定变化是平滑还是更突然。',
 'waveform':'选择调制波形，例如正弦、三角、方波或随机；影响运动形状。',
 'stereo phase':'左右调制之间的相位差，用于改变立体声运动。',
 'stereo':'调整立体声展开程度或模式；单声道监听无法完整呈现。',
 'stereo image':'立体声展开范围，控制左右回声分布。',
 'stereowiden':'立体声扩展量，增加宽度；应同时检查单声道兼容性。',
 'stages':'相位处理级数，改变凹口数量与扫动复杂度。',
 'color':'选择相位效果的音色重心／频率色彩。',
 'semitone':'以半音为单位移调：12 个半音是一八度。',
 'fine tune':'以音分微调音高：100 音分是一半音；小量可用于加厚。',
 'fine':'音高微调，用很小的偏移产生失谐／加厚感。',
 'pitch':'移调或音高变化设置；Shimmer 中选择移调色彩，Doubler 中控制音高差异量。',
 'max shift':'选择弯音达到最大位置时的目标音程。',
 'shift amount':'当前弯音进度，常绑定表情踏板。',
 'eqpos':'把均衡放在模型之前 PRE 或之后 POST；之前会改变驱动输入，之后更偏最终音色修整。',
 'mic':'选择虚拟麦克风／对应 IR，不同选择的频率响应不同。',
 'mic type':'选择虚拟麦克风型号。',
 'position':'哇音中是踏板位置；箱体中是麦克风对准扬声器的位置，中心与边缘、正轴与偏轴会改变明暗。',
 'mic position':'麦克风相对扬声器的位置；逐个比较可找到更亮或更柔和的拾音结果。',
 'mic distance':'麦克风与箱体的距离，改变拾音关系与空间感。',
 'mic off axis':'麦克风是否偏轴，改变高频和音色。',
 'cabinet':'选择或开关内置箱体模拟；另接 IR 时注意不要无意叠加两次箱体。',
 'cabinet type':'选择箱体型号，改变最终扬声器／拾音音色。',
 'cabinet mode':'箱体处理模式；选项含义以显示的名称为准，搭配外部 IR 时检查旁通状态。',
 'model':'选择模型／IR，是该加载器的核心音色来源。',
 'ir':'选择脉冲响应文件／预设，改变箱体或混响空间。',
 'nam capture':'选择下载／导入的神经网络捕捉音色。',
 'size':'Full／Lite 模型处理模式，涉及计算资源与模型处理方式。',
 'invert polarity':'反转信号极性。用于并行／外部回路相加时比较是否变薄；不是延时补偿。',
 'return polarity':'外部返回信号极性，正／反之间比较并行混合结果。',
 'phase invert':'反转极性，用于改善不同路线相加时的抵消。',
 'phase':'相位／极性选项；PSA1000 用于并行处理中的极性比较。',
 'head mode':'选择磁带回放磁头及组合，决定一组回声的节奏结构。',
 'repeat rate':'磁带回放速度相关控制，改变重复间隔；与普通延迟时间的旋钮方向不一定相同。',
 'wow & flutter':'磁带转速不稳定带来的慢／快音高漂移。',
 'wowflutter':'磁带转速不稳定造成的音高摇晃。',
 'tape age':'磁带老化程度，增加暗化与 Lo-Fi 色彩。',
 'tapeage':'磁带老化程度，使回声更陈旧、更有染色。',
 'bias':'磁带偏磁／饱和性格，调整谐波与失真质感。',
 'crinkle':'磁带褶皱／磨损感，加入不规则的声音纹理。',
 'drift':'缓慢漂移程度，让回声的音高／时间更不稳定。',
 'predelay':'原声到混响出现之前的间隔，增加可让原声音头更清楚。',
 'earlytail':'早期反射与尾音的平衡。',
 'roomsize':'虚拟房间大小，影响空间反射的尺度。',
 'shimmer':'移调后送入混响的效果量。',
 'damping':'混响高频随时间衰减的程度，影响尾音明暗。',
 'tension':'弹簧模型张力／音色性格控制。',
 'length':'弹簧混响长度／衰减感。',
 'heat':'把驱动的谐波重点从较亮的高频移向更丰满的低频。',
 'fat':'在两种失真电路性格之间连续变化。',
 'definition':'提升经相位校正的高频区域，突出弦头、指板和拨片细节。',
 'enhance':'提升经相位校正的低频区域，增加低部重量。',
 'bass bleed':'把未经谐波转换的原始深低频混回来。',
 'amplitude':'共振增强的幅度，增加低频强化量。',
 'glow':'低频增强／谐波性格的强度。',
 'transformer':'打开输出变压器式染色，主要改变低频重量与高频柔和度。',
 'warmth':'磁带式饱和／暖化量；不是低频增益的同义词。',
 'ceiling':'输出上限，帮助约束峰值。',
 'dirt':'切换更脏／有驱动的通道。',
 'cab + irdx':'开关内置箱体及动态扬声器处理；关闭后可另接自己的箱体 IR。',
 'ags':'Adaptive Gain Sculpting，自适应增益塑形／驱动开关。',
 'input pad':'输入衰减，用于给较热的信号留出余量，不是噪声门。',
 'tube':'管式前级一路的量；与 Solid State 搭配混合性格。',
 'solid state':'晶体管前级一路的量；与 Tube 搭配混合性格。',
 'buzz':'低频区域的饱和／驱动性格。',
 'punch':'中频区域的驱动性格与冲击感。',
 'crunch':'高频区域的驱动／颗粒性格。',
 'edge':'失真边缘／音色塑形，影响锐利程度；精确响应依单块而定。',
 'fade':'静音切换的渐变时间，越长越平滑。',
 'smear':'软化重复声音的音头，让延迟更朦胧。',
 'grit':'给延迟回声加入饱和与粗颗粒。',
 'offset':'左右时间偏移／偏置；延迟中常用于扩大空间，具体单位见范围。',
 'mono':'Doubler 的低频单声道集中控制；增加会让更多低频居中。',
 'bits':'保留的数字位深，降低可增加量化噪声与颗粒。',
 'crush':'位深破坏程度，减少有效分辨率来获得数字失真。',
 'sample rate':'效果内部重采样率，降低会产生更明显的混叠、金属与 Lo-Fi 纹理；不是设备系统采样率。',
 'stability':'采样率稳定程度，降低可增加随机波动与数字故障感。',
 'blocks':'块状数字失真／压缩伪影的尺度。',
 'glitch':'选择故障／数字破碎效果模式。',
 'low mono':'把低频保持在声像中央，减少低音随立体声效果漂移。',
 'sidebands':'在下边带、完整环形调制和上边带之间改变比例。',
 'tracking':'让环形调制载波跟随输入音高。',
 'interval':'目标移调音程／载波相对音程，具体取决于单块。',
 'sub':'低八度声部量；Groove 例外，是深低频 Boost／Flat／Cut 选择。',
 'oct':'高一八度声部的音量。',
 'oct 2':'高两八度声部的音量。',
 'shift':'自由移调声部音量，与 Interval 一起使用。',
 'quality':'移调处理质量／资源选择，具体选项以元数据为准。',
 'sex':'共振峰的人声音色性格，改变元音滤波听感。',
 'age':'元音／人声音色年龄感，改变共振峰性格。',
 'heel':'脚跟端的元音／音色。',
 'toe':'脚尖端的元音／音色。',
 'up/down range':'正负决定向上／向下扫频，绝对值决定移动幅度。',
 'smooth':'平滑滤波动作，减少突兀跳动。',
 'vactrol':'光耦式响应性格设置，改变动态运动的质感。',
 'attenuation':'衰减输出音量，用于匹配不同 IR 的响度。',
 'bandwidth':'均衡作用带宽。带宽越宽影响的频率区域越大；不要与 Q 的方向混淆。',
 'comp style':'压缩性格预设，联动时间／比例等动态行为。',
 'comp position':'选择压缩阶段的位置，影响它处理的是怎样的信号。',
 'transient':'音头／瞬态塑形，调整拨弦开始的冲击感。',
 'tightness':'噪声门关闭的紧实感／响应性格。',
 'action':'自动鼓手操作触发：启动后单击加花、双击停止、长按换段落。适合绑定脚钉。',
 'style':'鼓伴奏风格，选择 Blues、Funk、Jazz、Rock 等节奏。',
 'tempo':'速度 BPM，每分钟拍数。',
 'tempo bpm':'速度 BPM，每分钟拍数。',
 'bpm':'每分钟拍数，决定同步调制／节奏速度。',
 'time signature':'拍号，例如 4/4 或 3/4，决定每小节的拍子组织。',
 'key':'和弦／音阶的根音或调性。',
 'root note':'持续参考音／和弦的根音。',
 'chord quality':'和弦性质，例如大、小、七和弦等。',
 'voicing':'和弦中各音的排列；音箱中则是前级音色模式，请看选项。',
 'autofade':'停止演奏时自动淡出背景和弦，重新演奏时恢复。',
 'ducking':'你演奏时压低背景／效果声，给主音符让出空间。',
 'gap mode':'周期性让节拍器静音，训练没有点击声时仍保持速度。',
 'sound':'选择合成参考音／节拍点击音色。',
 'metronome':'节拍器开关。',
 'drone':'持续参考音开关，用于音准、音阶和和声练习。',
 'click sound':'选择节拍器的点击音色。',
 'accent pattern':'重音组织，决定哪些拍更突出。',
 'beat pattern':'节拍的演奏／发声模式。',
 'tempo source':'速度来源：使用内部设定或跟随设备全局。',
 'arpeggiator':'琶音器开关，把和弦结构按顺序拆成音符。',
 'scale':'选择琶音使用的音阶／和弦结构。',
 'pattern':'音符／回声的顺序与节奏模式；以当前单块的选项为准。',
 'octave range':'琶音跨越的八度数量。',
 'instrument':'指定乐器音域，帮助音高追踪匹配输入。',
 'octave':'参考音／声部所在八度。',
 'mode':'工作模式选择。不同单块含义不同，按下面列出的选项切换比较。',
 'type':'算法／处理类型选择，以当前单块的选项为准。',
 'filter type':'选择低通、高通、带通等滤波类型。',
 'drive type':'该频段使用的失真算法／类型。',
 'drive mode':'所选失真算法的子模式，不同算法的选项含义不同。',
 'comp type':'压缩算法／类型选择，也可旁通。',
 'att / rel':'成组选择压缩启动与释放速度，不是单独的音量。',
 'solo':'单独监听该频段，方便找问题；调好后记得关闭。',
 'enabled':'单块处理开关；关闭通常旁通。静音单块例外，启用它就是执行静音。',
 'bypass':'旁通开关，开启旁通时不应用该单块处理。',
 'bypass at 0':'表情位置回到 0 时自动旁通哇音。',
 'gain':'增益。驱动／音箱中通常改变推动与失真程度；Gain 工具单块中只改变电平。',
 'master':'后级／总音量，通常用于配平；某些音箱模型中也会影响后级饱和。',
 'volume':'音量／电平。音箱前端 Volume 也可能改变驱动程度，不应与 Output Level 一概等同。',
 'input':'输入电平；位于动态或非线性处理前，提高可能增加压缩或失真。',
 'output':'处理后的输出电平，用于与旁通响度匹配。',
 'level':'该单块／声部的电平，配平响度用。存在干湿混合时可能只控制效果支路，见单块说明。',
 'trim':'电平微调，用于补偿增益变化。',
 'pedal':'选择固定捕捉的单块模型。',
 'warm':'暖化／染色程度。',
 'reset':'把插件的运行状态复位；通常属于系统控制而不是日常旋钮。',
 'kxreset':'系统复位控制，不作为日常音色旋钮。'
};
export function explain(name,block='',options=[]){
 const n=name.toLowerCase().trim().replace(/\s+/g,' ');
 if(block==='Vintage Microtubes'&&n==='level')return '控制过载支路的音量，再由 Blend 与干净支路混合；不要直接当成最终总音量。';
 if(block==='Harmonic Booster'&&n==='character')return '混入预设的音色塑形，调低更接近原始音色，调高染色更明显。它不等同于过载 Drive。';
 if(/mid gain|mid level/.test(n)&&!/(Bass Driver|Entropia|Ignissor)/.test(block))return '提升或削减选定的中频；与 Mid Frequency 配合，先找频率，再决定突出还是削弱。';
 if(block==='Hi-Pass Filter'&&/cutoff|frequency/.test(n))return '高通截止点：提高会削掉更多低频。可用于减少轰鸣，太高会让贝斯变薄。';
 if(block==='Lo-Pass Filter'&&/cutoff|frequency/.test(n))return '低通截止点：降低会削掉更多高频，让音色更暗、更柔和。';
 if(block==='Axioma'&&n==='cutoff')return '合成器滤波截止点，调低更暗、更圆，调高更开、更明亮。';
 if(block==='Axioma'&&n==='envelope')return '每次触弦让滤波打开的幅度；归零不扫动，增加后会出现明显的“哇”音头。';
 if(block==='Axioma'&&n==='sensitivity')return '音高追踪触发灵敏度。提高有利于轻音触发，太高也可能追到杂音；调到你想弹的每个音都能稳定发声。';
 if(block==='Alpha Omicron'&&n==='mod')return '在 Alpha 与 Omega 两种失真性格之间混合。';
 if(block==='Gain'&&n==='gain')return '纯电平增减，0 dB 不增不减，负值变小，正值变大；前后位置会决定是否推动后级失真。';
 if(block==='Groove'&&n==='sub')return '切换深低频 Boost／Flat／Cut，比较加厚、平直与收紧的音色。';
 if(block==='Pirkko Chorus Deluxe'&&n==='width')return '音高调制深度，从轻微加厚到明显摇晃，不是单纯左右声像宽度。';
 if(block==='Cognate Polymath'&&n==='attack')return '在慢渐入、柔和音头、门控脉冲与紧实瞬态等音头性格间变化；不只是毫秒时间。';
 if(block==='Uè Uè Wah'&&n==='mid')return '踏板中间位置的元音选择，不是中频 EQ。';
 if(block==='Bass 3500'&&['low pass','high pass'].includes(n))return '宽范围轮廓控制，分别修整约 100 Hz 低频／约 10 kHz 高频区域；不是通常意义的可变截止滤波器。';
 if(block==='Sonic Enhancer'&&n==='output')return '补偿增强后的整体响度；建议与旁通保持相近音量再判断是否更好。';
 if(exact[n])return exact[n];
 if(/^echo time/.test(n))return '对应左／右声道的回声时间，决定这一侧回声间隔。';
 if(/^echo note/.test(n))return '对应左／右声道的节奏细分，在同步模式下决定回声时值。';
 if(/^blend /.test(n))return '对应频段的干湿混合，决定该频段保留多少干声。';
 if(/^solo /.test(n))return '单独监听对应频段，便于调整；调好后关闭以恢复全频。';
 if(/emphasis|lpf peak/.test(n))return '截止点附近的强调／共振程度。Aperture 中可提升或削减附近的音色区域。';
 if(/^(low|high) boost/.test(n))return '该频段提升量；Pultrick 中可与同段 Atten 同时使用形成交互响应。';
 if(/^offset /.test(n))return '对应声道的时间偏移，用于产生更自然的左右演奏差异。';
 if(/^(ch[12]|lead|clean|crunch|clean crunch) /.test(n)){
  const base=n.replace(/^(ch[12]|lead|clean crunch|clean|crunch) /,'').replace(/ [1-4]$/,'');
  return '对应通道：'+explain(base,block,options);
 }
 if(/^l[1-4] /.test(n))return '对应第 '+n[1]+' 层：'+explain(n.slice(3),block,options);
 if(/^(voice (in|[1-4])|osc [12]|sub osc) /.test(n))return '对应声部／振荡器：'+explain(n.replace(/^(voice (in|[1-4])|osc [12]|sub osc) /,''),block,options);
 if(/(enable| on$|on\/off|bypass| in$)/.test(n)&&!/(gain|level)/.test(n))return '该功能／处理阶段的开关。启用后才应用这一部分；Cab Bypass 是旁通箱体。';
 if(/sync|use host tempo/.test(n))return '同步开关，启用后跟随设备全局速度／节拍，使用音符细分设置周期。';
 if(/pan$/.test(n))return '该声部左右声像，居中或向左右移动。';
 if(/detune|fine/.test(n))return '微小音高偏移，少量增加可制造加倍／合唱感。';
 if(/delay$/.test(n))return '声部延迟／时间偏移，用于制造加倍和空间感。';
 if(/polarity/.test(n))return '反转对应通道的极性，用于并行混合时比较抵消情况。';
 if(/(q$|q width)/.test(n))return '均衡作用宽度／Q。通常 Q 大更窄；归一化 Width 刻度以设备表现为准。';
 if(/bell/.test(n))return '将该段从搁架式切换为钟形，集中调整一个频率附近。';
 if(/slope/.test(n))return '截止斜率，每八度衰减的 dB 数越大，切除越陡。';
 if(/(hpf|high pass|hi-pass|hp freq|lo cut|low cut|lowcut)/.test(n)&&!/amount|emphasis/.test(n))return '高通／低切截止频率。提高截止点会削掉更多低频；贝斯上不要一下开得过高。';
 if(/(lpf|low pass|lo-pass|lp freq|high cut|hi cut)/.test(n)&&!/peak/.test(n))return '低通／高切截止频率。降低截止点会削掉更多高频，声音更暗。';
 if(/x-over|crossover|split frequency/.test(n))return '分频点／分频模式，决定哪些频率交给哪一路处理。';
 if(/freq|frequency|cutoff/.test(n))return '选择作用频率／截止点，不是直接提升音量。配合同组增益、共振或滤波控制使用。';
 if(/low atten|high atten/.test(n))return '该频段的削减量；Pultrick 可与同段 Boost 同时使用形成交互曲线。';
 if(/gain|level|volume| vol$|vol$/.test(n))return /drive|pwramp/.test(n)?'对应频段／阶段的推动量，增加可能带来更多饱和。':'对应频段／声部／阶段的电平或增益；增减后应重新检查整体响度。';
 if(/drive|driver|distortion|overdrive|saturat|pwramp|mammoth gain/.test(n))return '增加对应阶段的驱动／饱和，声音通常更有谐波、压缩感与颗粒；也可能变响。';
 if(/comp|compression|slam/.test(n))return '对应阶段的压缩量／动态控制，让峰值更集中；过多可能削弱音头。';
 if(/thresh/.test(n))return exact.threshold;
 if(/dry|clean/.test(n))return '未经该效果处理的原声量，增加可保留演奏主体与音头。';
 if(/wet|fx/.test(n))return '效果声量，增加让处理更明显。';
 if(/rate|speed/.test(n))return '运动／调制的速度，较高通常变化更快。';
 if(/spread|width/.test(n))return '展开程度／宽度。立体声效果中改变左右分布；具体单位与选项见该参数。';
 if(/feedback/.test(n))return exact.feedback;
 if(/modulation|mod depth/.test(n))return '周期性变化的深度，让音高、滤波或尾音产生更多运动。';
 if(/depth/.test(n))return '对应效果的深度；音箱后级中常用于低频共振，调制效果中用于摆动幅度。';
 if(/envelope|env|sweep/.test(n))return '包络／扫频控制，让滤波或载波随演奏力度改变。Amount 是幅度，Direction 是方向，Attack／Release 是动作时间。';
 if(/lfo/.test(n))return '低频振荡器控制，产生持续的周期运动。Amount 管深度，Rate 管速度，Waveform 管形状，Sync 决定是否跟随节拍。';
 if(/low.mid|lo.mid|mid low/.test(n))return '低中频量，影响温暖、厚度与浑浊感。';
 if(/high.mid|hi.mid|mid high/.test(n))return '高中频量，影响轮廓、鼻音与触弦穿透感。';
 if(/shelf|^eq |^\d+([.,]\d+)?\s*(k?hz)/.test(n))return '此频段的均衡增减。正值增强、负值削减，0 dB 不增不减。';
 if(/oct|sub voice|root voice|hi voice/.test(n))return '对应八度／音高声部的音量，和原声混合形成层次。';
 if(/bright/.test(n))return '高频明亮度／明亮开关，突出上端细节。';
 if(/bass|bottom/.test(n))return '低频音色／增强，影响厚度和重量。';
 if(/treble/.test(n))return exact.treble;
 if(/middle|mid /.test(n))return exact.mid;
 if(/amount|intensity/.test(n))return '该效果的强度／加入量，从少量开始调整并配平音量。';
 if(/tone|voice|sound|voicing/.test(n))return '音色／发声性格选择或调整。选项名称保留英文，便于与你的面板对应。';
 if(/chaos|rnd|movement|skew|warp/.test(n))return '改变周期运动的随机性、偏斜或形状，用于从规则节奏变为更有变化的动作。';
 if(/tweeter/.test(n))return '高音单元拾音设置，改变其位置、距离或混入量。';
 if(/mode|type|channels|amp unit/.test(n))return '选择处理路径／算法／通道，参照下方原始选项逐项比较。';
 if(/^out [1-4]|headphones/.test(n))return '是否把当前信号送到这个物理输出／耳机。';
 return '专用参数；公开资料尚不足以确认具体作用。保留真实面板名称与范围，请参照原厂页面，勿按相似旋钮猜测。';
}
