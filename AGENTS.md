# AGENTS.md

所有新对话在开始处理这个项目之前，必须先阅读本文件，再阅读相关源码。这个文件是本作品集项目的工作约定，用来帮助后续 agent 快速进入上下文、保持视觉一致性，并避免破坏已有设计气质。

## 项目概览

这是 Grey 的个人作品集网站，定位是 Web3 product designer 的暗色电影感 portfolio。项目使用 Next.js App Router、TypeScript、Tailwind CSS、Framer Motion / Motion、GSAP 和本地字体。

核心体验不是传统营销页，而是偏沉浸式作品集：

- 首页以全屏 hero video、loader、多语言问候、解密文字 hover、打字机段落和大字号作品索引建立情绪。
- Case study 页面以大尺寸作品截图、暗色版式、克制荧光色点缀和高密度作品展示为主。
- 视觉关键词：cinematic、minimal、intentional、premium、dark、Web3 / fintech、rhythm、emotion。

## 每次开始工作的读取顺序

1. 先读本文件。
2. 再读 `README.md` 和 `package.json`，确认项目脚本与依赖。
3. 若改首页，读 `app/page.tsx`、`app/globals.css`、`components/DecryptedText.tsx`、`components/TextType.tsx`。
4. 若改全局字体、SEO 或 layout，读 `app/layout.tsx` 和 `tailwind.config.ts`。
5. 若改 case study，读对应路由下的 `app/*/page.tsx`，并核对 `public/assets` 中的图片实际存在。

## 常用命令

- 安装依赖：`npm install`
- 本地开发：`npm run dev`
- 类型检查：`npm run typecheck`
- 生产构建：`npm run build`
- 代码检查：`npm run lint`

注意：`package.json` 中有 `next lint`，但 Next.js 15 可能需要根据本地环境调整 lint 配置。改动完成后优先跑 `npm run typecheck` 和 `npm run build`。

## 项目结构

- `app/page.tsx`：首页，包含 loader、hero video、Recent Work、footer contact。
- `app/layout.tsx`：本地字体注册与 metadata。
- `app/globals.css`：全局暗色基调、链接 underline、noise overlay、解密文字和打字机样式。
- `app/gate-pay/page.tsx`：Gate Pay website case study。
- `app/font-design/page.tsx`：Font Design / Gate Sans case study。
- `components/DecryptedText.tsx`：解密文字交互组件。
- `components/TextType.tsx`：GSAP cursor + typing animation 组件。
- `public/assets`：运行时图片与视频资源。页面中引用资源时优先使用这里的路径。
- `font`：Aeonik 与 Clash Display 本地字体。不要随意替换或改名。
- `preview*.html`：本地静态预览稿，可作为视觉参考，不是 Next.js 正式路由。新增或复刻二级页面时，必须同步生成对应的 `preview-project-name.html`，方便直接用浏览器打开检查。
- `docs/portfolio desgin.md` 和 `docs/awesome-design-md`：设计参考资料，可按需查看。

## 设计与前端原则

- 保持暗色、高对比、电影感和作品本身主导的视觉语言。
- 首页首屏必须让品牌和情绪立即出现：hero video、`@GREY DESIGN PORTFOLIO`、大字号 statement 都是核心资产。
- 不要把首页改成普通 landing page，不要添加营销式卡片堆叠或解释性功能文案。
- Case study 页面应以实际作品截图为主体，文字服务于作品叙事，不要喧宾夺主。
- Case study 页面 header 默认使用项目全局通用 header，忽略 Figma 中单独绘制的 header 样式；后续页面也按此规则执行，除非用户明确要求复刻 Figma header。
- 颜色以 `#050505` / black、bone、white、灰阶为主，用荧光黄绿、mint 或 signal 做少量点缀。
- 保持大字号排版和宽松节奏，但必须检查移动端可读性和不溢出。
- 不要新增装饰性渐变球、抽象背景 blob 或与当前气质不符的插画。
- 卡片圆角当前 case study 多为 `rounded-2xl`，新增区域应跟随现有页面上下文；不要随意混入另一套设计系统。

## 字体与排版

- 全局字体来自 `next/font/local`：
  - Aeonik：默认 sans / display。
  - Clash Display：用于大标题和首页强展示文本。
- 优先使用 Tailwind 中的 `font-sans`、`font-display`、`font-clash`。
- 不要依赖远程字体，除非页面已有特殊上下文。`app/gate-pay/page.tsx` 当前引入了 Google Poppins，这是现有行为，改动时要谨慎。
- 字距保持自然，避免负 letter spacing。已有代码里个别大标题有 tracking 设置，新增时不要扩大这种风格。

## 动效约定

- 首页使用 Framer Motion 做入场、loader 和列表出现动画。
- `DecryptedText` 用于品牌和作品标题 hover 解密效果；复用前先理解 props，避免引发频繁重渲染或不可访问文本问题。
- `TextType` 使用 GSAP 做光标闪烁，支持进入视口后开始打字。
- 所有新增动效都应尊重 `prefers-reduced-motion`，全局 CSS 已有基础降级。
- 动效应服务节奏和情绪，不要增加炫技式、频繁抢焦点的动画。

## 资源与路径

- 页面运行时资源应放在 `public/assets/...`，并用 `/assets/...` 绝对路径引用。
- 根目录 `assets` 更像源素材或导入备份；不要让页面直接依赖它。
- 图片文件名中已有空格，例如 `Frame 2147234428.png` 和 `gatepay image 1.png`。改动时必须核对路径大小写和空格。
- 视频当前为 `public/assets/hero/hero-video.mp4`，首页 hero 依赖它。
- 新增 case study 前，先建立清晰的资源目录，例如 `public/assets/project-name/...`。

## 路由与已知注意点

当前正式 Next.js 路由：

- `/`
- `/gate-pay`
- `/font-design`

首页当前也链接到了 `/gate-pay-dashboard`，但项目里没有对应的 `app/gate-pay-dashboard/page.tsx`；根目录只有 `preview-gate-pay-dashboard.html`。处理导航或发布前应决定是新建正式路由，还是移除/调整该链接。

首页 footer 里有 `Let’s wrok Together` 的拼写；如果任务涉及文案打磨，可以修为 `Let’s work Together`，但不要在无关改动中顺手大面积改文案。

## 编码约定

- 保持 TypeScript + React function component 风格。
- 优先使用现有组件和局部 helper，例如 `Header`、`SectionCard`、`DarkPanel`、`PixelImage` / `CaseImage` 的模式。
- Tailwind class 是主要样式方式；只有全局行为、伪元素或复用交互样式放入 `app/globals.css`。
- 新增组件如果只服务单页，先放在该页面文件内；跨页面复用明确后再放到 `components`。
- 不要引入新的 UI 库，除非用户明确要求或现有实现无法合理完成。
- 保持文件为 ASCII，除非内容本身需要已有的非 ASCII 字符，例如 `Let’s` 或多语言 loader。

## 验证清单

改动完成前尽量完成：

1. 路径核对：所有新增图片、视频、链接都能在项目中找到。
2. 类型检查：`npm run typecheck`。
3. 构建检查：`npm run build`。
4. 视觉检查：启动本地开发服务，查看 desktop 和 mobile 主要页面。
5. 交互检查：首页 loader、hero video、Work/About anchor、hover 解密、case study header 返回链接。
6. 页面完成后必须生成对应的本地预览 HTML（例如 `preview-color-upgrade.html`），并在最终回复里提供给用户。

如果由于依赖未安装、网络受限或本地环境问题无法验证，需要在最终回复中说明。

## 协作方式

- 先理解现有视觉和内容，再动手。
- 不要无关重构，不要批量重排 class，不要改动大段静态内容来制造“整洁感”。
- 用户通常关注作品呈现效果，回复时优先说明视觉/体验结果和可访问的页面地址，再补充必要技术细节。
- 若任务是新增作品页，先确认作品素材、标题、角色、年份、case narrative 和目标链接；素材不足时可以先搭建结构，但要标明占位处。
