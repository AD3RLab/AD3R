# AD3R 官方团队站点

AD3R，全称 `Autonomous Driving 3D Reconstruction Lab`，是一个面向自动驾驶与具身智能场景的三维重建研发组织。本项目是 AD3R 的静态团队主页，基于 Astro + TypeScript + Markdown/MDX 构建，用于展示团队成员、研发项目、成果、研究课题、团队动态与更新日志。

当前仓库地址：

- GitHub：`https://github.com/AD3RLab/AD3R`
- Gitee：`https://gitee.com/rec-any-thing/ad3-r`

## 技术栈

- Astro
- TypeScript
- Markdown / MDX
- CSS
- GitHub Actions
- GitHub Pages / Gitee Pages

## 项目定位

本项目用于展示 AD3R 在以下方向的阶段性建设：

- 自动驾驶场景 3DGS 重建
- 多相机 / 单前视视频三维重建
- 长距离道路场景重建与 LOD 表达
- 动静态目标分离与动态 Actor 建模
- 真实尺度恢复与多模态几何融合
- UE / Web 场景导出与实时渲染
- AIGC 场景补洞、扩展与编辑
- 3D 语义理解与场景资产结构化

## 为什么这个项目好维护

- 团队基础信息集中在 `src/data/site.ts`
- 成员、项目、成果、课题各自独立维护，不会散落在页面模板中
- 新闻和更新日志直接用 Markdown 编写，不需要改 Astro 页面
- 成员详情页和项目详情页通过 `id` 自动建立关联，减少重复录入
- 首页、组会页、成员详情页、项目详情页会自动汇总相关数据，通常不需要手动改首页内容
- 项目和成员的阶段成果展示支持统一的 `showcase` 字段，新增图片或视频时只改数据
- 页面样式集中在 `src/styles/global.css`，统一调整成本低
- 站点采用纯静态生成，部署简单，不依赖后端和数据库

## 目录结构

```text
.
 .github/
    workflows/
        deploy.yml
 public/
    images/
        members/
        projects/
 src/
    components/
    content/
       changelog/
       news/
       config.ts
    data/
       achievements.ts
       members.ts
       projects.ts
       researchTopics.ts
       site.ts
    pages/
    styles/
    utils/
 astro.config.mjs
 package.json
 README.md
```

## 本地开发命令

```bash
npm install
npm run dev
npm run build
npm run preview
npm run updater
```

## 本地内容更新器

项目现在提供一个本地桌面更新器，适合不直接改代码的成员维护内容。

启动方式：

```bash
npm install
npm run updater
```

更新器当前支持：

- 站点信息维护：直接编辑 `src/data/site.ts`
- 成员维护：头像、简介、研究方向、关联项目、个人展示
- 项目维护：封面、负责人、成员、里程碑、更新记录、展示素材
- 课题维护：优先级、状态、进展、下一步
- 成果维护：类型、作者、标签、关联成员、关联项目
- 动态维护：直接写入 `src/content/news/*.md`
- 更新日志维护：直接写入 `src/content/changelog/*.md`
- 图片和视频预览：素材导入后可直接在更新器内查看预览
- 表单校验：保存前会检查必填项、邮箱、URL、日期和 slug 格式
- 一键预览网站：可在更新器里启动本地 Astro 预览并打开浏览器
- 一键发布到 GitHub：可读取当前 Git 状态，执行构建、提交并推送到当前分支
- 发布前确认弹窗：发布前会显示分支、远端、提交说明和改动文件摘要
- 发布结果提示：推送完成或失败后会弹出结果窗口
- GitHub Actions 快捷入口：可直接从更新器打开仓库的 Actions 页面

素材导入方式：

- 支持把图片或视频拖进更新器
- 更新器会自动复制到项目目录下的合适位置
- 成员头像自动进入 `public/images/members/`
- 项目封面自动进入 `public/images/projects/`
- 展示素材会按文件类型自动进入 `public/images/showcase/` 或 `public/videos/`

说明：

- 第一次运行 `npm run updater` 时，Electron 可能会下载桌面运行时，时间会稍长一些
- 更新器会直接写回当前仓库里的真实数据文件，保存后再执行 `npm run dev` 或 `npm run build` 即可查看效果
- GitHub 发布功能依赖本机已有 Git 环境，并且当前仓库已经配置好 `origin` 和推送权限
- 发布流程会先执行一次 `npm run build`，确认站点可以正常构建后再提交和推送
- 点击“构建并发布”后，更新器会先执行全部保存与校验，再弹出确认框
- 发布成功后可直接从结果弹窗或更新器里的按钮跳转到 GitHub Actions 页面查看工作流

推荐使用顺序：

1. 在更新器里修改内容并保存
2. 点击“启动预览”或“打开网站”查看本地效果
3. 在发布面板中填写提交说明
4. 点击“构建并发布”
5. 在确认弹窗中核对远端、分支和改动文件
6. 发布成功后打开 GitHub Actions 页面确认部署状态

## 本地启动

1. 安装依赖

```bash
npm install
```

2. 启动开发服务器

```bash
npm run dev
```

3. 打开浏览器访问

```text
http://localhost:4321/AD3R/
```

当前 `astro.config.mjs` 已按 GitHub Pages 子路径配置：

```js
site: "https://ad3rlab.github.io",
base: "/AD3R"
```

如果你改为根路径部署，请把 `base` 改成 `/`。

## 如何修改团队信息

优先修改 `src/data/site.ts`：

- `name`
- `shortName`
- `englishName`
- `description`
- `mission`
- `joinUs`
- `gitee`
- `email`
- `location`
- `address`
- `researchDirections`

## 如何新增团队成员

通常只需要修改：

- `src/data/members.ts`

并添加头像到：

- `public/images/members/`

如果成员还想补自己的阶段成果展示，可选地继续补充：

- `showcase` 字段
- 媒体文件放到 `public/images/showcase/` 或 `public/videos/`

当前成员邮箱统一采用以下格式：

```text
名.姓拼音@kotei.com.cn
```

例如：

- `liu.qihan@kotei.com.cn`
- `li.yandong@kotei.com.cn`
- `gao.jinming@kotei.com.cn`

## 如何新增项目

通常只需要修改：

- `src/data/projects.ts`

建议补充这些信息：

- 项目名称与简介
- 状态与版本
- 技术栈
- 负责人和成员 ID
- 功能特性
- Roadmap
- 更新记录
- 关联成果
- 仓库地址与 Demo 地址

项目封面图建议放在：

- `public/images/projects/`

如果项目要展示阶段 Demo、截图或视频，可直接维护：

- `showcase` 字段
- 媒体文件放到 `public/images/showcase/` 或 `public/videos/`

## 如何新增成果

只需要修改：

- `src/data/achievements.ts`

成果类型支持：

- `paper`
- `patent`
- `software`
- `open-source`
- `article`
- `award`
- `demo`
- `report`

## 如何新增研究课题

只需要修改：

- `src/data/researchTopics.ts`

状态支持：

- `tracking`
- `researching`
- `validating`
- `completed`
- `paused`

课题详情页会自动生成：

- `/topics/<id>/`

组会页中的课题卡也会直接跳到对应详情。

## 如何新增新闻动态

只需要在以下目录新增 Markdown 文件：

- `src/content/news/`

示例 frontmatter：

```md
---
title: "AD3R 团队主页第一版上线"
date: "2026-01-01"
author: "AD3R Lab"
summary: "团队主页第一版完成建设，用于展示成员、项目、成果、研究方向与阶段性动态。"
tags: ["团队动态", "网站", "AD3R"]
---
```

## 如何新增更新日志

只需要在以下目录新增 Markdown 文件：

- `src/content/changelog/`

示例 frontmatter：

```md
---
version: "v0.1.0"
date: "2026-01-01"
type: "added"
project: "ad3r-team-site"
summary: "初始化 AD3R 团队主页。"
---
```

## GitHub Pages 部署

当前项目已经按 GitHub Pages 配置完成：

```js
site: "https://ad3rlab.github.io",
base: "/AD3R"
```

预计部署地址：

```text
https://ad3rlab.github.io/AD3R/
```

仓库中已经提供 GitHub Actions 工作流：

- `.github/workflows/deploy.yml`

启用方法：

1. 推送到 GitHub 仓库的 `main` 分支
2. 在仓库 `Settings -> Pages` 中把 `Source` 设为 `GitHub Actions`
3. 之后每次推送会自动执行 `npm ci`、`npm run build` 并发布 `dist`

## Gitee Pages 部署

如果你仍然想保留 Gitee 或迁移到其他静态托管，也只需要修改 `astro.config.mjs` 中的 `site` 和 `base`。

### Gitee 示例配置

```js
site: "https://rec-any-thing.gitee.io",
base: "/ad3-r"
```

### 部署方式

1. 本地执行：

```bash
npm run build
```

2. 将 `dist` 目录产物部署到 Gitee Pages 对应分支或静态托管位置

### 如果部署到根路径

```js
site: "https://你的名字.gitee.io",
base: "/"
```

## 维护方式

为了降低长期维护成本，项目已按数据与展示分离的方式组织：

- 新增成员：修改 `src/data/members.ts`
- 新增项目：修改 `src/data/projects.ts`
- 新增成果：修改 `src/data/achievements.ts`
- 新增课题：修改 `src/data/researchTopics.ts`
- 新增新闻：在 `src/content/news/` 添加 Markdown
- 新增更新日志：在 `src/content/changelog/` 添加 Markdown

大多数页面会自动根据 `id` 建立成员、项目、成果之间的关联，不需要再修改页面模板。

### 推荐维护方式

为了尽量不给团队成员增加负担，建议按下面的最小更新路径维护：

- 成员信息变更：只改 `src/data/members.ts` 中自己的那一段
- 项目进展更新：只改 `src/data/projects.ts` 中对应项目的 `updates`、`roadmap`
- 课题状态变更：只改 `src/data/researchTopics.ts` 中对应课题的 `status`、`progress`、`nextSteps`
- 新闻公告：只在 `src/content/news/` 新增 Markdown
- 网站版本变化：只在 `src/content/changelog/` 新增 Markdown

### 首页和组会页如何自动更新

下面这些页面不建议手工修改内容，而是通过数据自动生成：

- 首页：自动读取项目、成果、课题、动态与成员的最新数据
- 组会页 `/review/`：自动读取项目里程碑、项目更新、课题状态和行动项
- 成员详情页：自动读取成员关联项目、成果与个人阶段展示
- 项目详情页：自动读取项目关联成员、成果与阶段展示

也就是说，大多数成员只需要更新数据文件，不需要改页面模板本身。

### 阶段成果展示怎么维护

项目和成员都支持可选的 `showcase` 字段，适合放：

- 图片截图
- Demo 录屏
- 阶段汇报图
- Web 演示链接
- 视频文件

字段结构示例：

```ts
showcase: [
  {
    id: "scene-engine-shot-01",
    title: "道路场景重建预览",
    kind: "image",
    src: "/images/showcase/scene-engine-road-preview.svg",
    summary: "展示自动驾驶道路片段在 3DGS 管线中的阶段性重建效果。",
    date: "2026-04-28"
  }
]
```

建议规范：

- 项目级展示写在 `src/data/projects.ts`
- 成员个人展示写在 `src/data/members.ts`
- 图片统一放 `public/images/showcase/`
- 视频统一放 `public/videos/`
- 如果素材较大，可只放封面图和外部链接

## 常见问题

### 1. 为什么打开后样式或图片丢失？

通常是 `site` 或 `base` 配置不正确。

请重点检查：

- `astro.config.mjs` 中的 `site`
- `astro.config.mjs` 中的 `base`
- 实际仓库名是否与 `base` 一致

### 2. 为什么本地路径不是根路径？

因为当前默认配置了：

```js
base: "/AD3R"
```

这是为了和 Gitee Pages 子路径保持一致。

### 3. 为什么成员详情页路径会变化？

成员详情页路径来自 `src/data/members.ts` 中的 `id` 字段，例如：

- `/members/liu-qihan/`
- `/members/li-yan-dong/`
- `/members/gao-jin-ming/`

如果你修改了成员 `id`，路由也会随之变化。

### 4. 为什么我改了数据，首页和组会页也会跟着变？

因为首页、项目页、成员页和组会页都尽量采用自动聚合方式生成。

这是一种刻意的设计：

- 减少重复录入
- 避免多处修改不一致
- 让成员只维护自己相关的数据块
