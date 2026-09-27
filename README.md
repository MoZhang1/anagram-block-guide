# Anagram 单块图鉴

中文查阅网页：[打开图鉴](https://mozhang1.github.io/anagram-block-guide/)

资料快照：2026-09-27，KosmOS 1.18.0、Darkglass Suite 6.10.0。

- 121 个原厂清单条目（不同箱体／艺术家 IR 单独列出，Mono/Stereo 按官方清单合并）。
- 97 个 Marketplace 扩展，含官方参数范围、默认值与原始选项。
- 15 个 Guitar Essentials 特别版参考条目，完整面板待核实，不代表普通设备自动解锁。
- 中英文／旧名／旋钮／用途搜索；分类、来源、获取方式与资料完整度筛选。
- 单块独立分享链接；复杂面板内搜索；可放大的真实单块图与商店图集。
- 响应式布局，纯静态页面，不连接设备、不收集用户数据。

## 资料依据与边界

1. [官方 1.18.0 清单](https://www.darkglass.com/pages/anagram-manual)确定原厂收录范围。
2. [官方 Marketplace](https://marketplace.anagram.shop/)公开产品列表、作者、产品图片和价格快照。
3. [MOD 官方插件服务](https://api.mod.audio/v2/lv2/plugins)提供 97 个扩展的 LV2 参数元数据。每个条目链接到具体版本的参数来源。
4. 已安装的 Darkglass Suite 6.10.0 的单块图片及内置面板种子数据，辅助原厂图片与参数名称核对。
5. [Anagram Answers](https://anagramanswers.com/categories/anagram-block-reference.18/)的面板记录辅助补齐原厂名称。**没有把该站标注为 ChatGPT 生成的原型介绍当作官方说明**，也没有把实体硬件的范围直接套到数字模型。原厂未验证数值不展示，来源明确标作社区。
6. [Guitar Essentials](https://www.darkglass.com/pages/anagram-guitar-essentials)只支持特别版条目的名称与用途；尚未核实的面板留空说明。

中文简介与旋钮解释为本项目辅助说明，非厂商认证译本；并非对专有 DSP 电路的完整说明。界面模式可能隐藏部分旋钮，固件更新也可能改变面板。价格仅为采集时标价，实际授权、税费和价格以商店为准。

## 图片与品牌

原厂图取自官方 Suite；扩展图取自官方商店。艺术家 IR 没有独立封面时使用系列共用箱体图并注明。所有图片、商标与产品名归各权利人所有，用于教育性辨识与引用，不对其作再许可。图片不是 AI 生成的替代品。本项目不是 Darkglass 官方网站，也不分发固件、付费插件、捕捉模型或商业 IR 音频。权利人如需纠正或移除图片，可通过仓库 issue 联系。

## 本地运行与部署

```sh
npm ci
npm test
npm run dev
```

`npm run build` 生成 `dist/`。GitHub Actions 在 `main` 更新时测试、构建并发布 Pages。基路径为 `/anagram-block-guide/`。

主要数据：`src/data/catalog.json`。编辑器辅助文本：`src/editorial.mjs`、`src/parameters.mjs`。发布数据采用静态快照，不会偷偷从商店更新未经核对的内容；未来更新需要重新比对官方清单、参数与图片。

新增／纠错应记录：单块名字、设备固件、英文面板名、截图或官方来源、中文说明。请勿上传个人预设、账户信息或授权文件。
