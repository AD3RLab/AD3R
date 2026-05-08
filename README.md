# AD3R 官方团队站点

AD3R，全称 `Autonomous Driving 3D Reconstruction Lab`，是一个面向自动驾驶与具身智能场景的三维重建研发组织。本项目是 AD3R 的静态团队主页，基于 Astro + TypeScript + Markdown/MDX 构建，用于展示团队成员、研发项目、成果、研究课题、团队动态与更新日志。

当前仓库地址：

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
```

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
http://localhost:4321/ad3-r/
```

当前 `astro.config.mjs` 已按 Gitee Pages 子路径配置：

```js
site: "https://rec-any-thing.gitee.io",
base: "/ad3-r"
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

只需要修改：

- `src/data/members.ts`

并添加头像到：

- `public/images/members/`

当前成员邮箱统一采用以下格式：

```text
名.姓拼音@kotei.com.cn
```

例如：

- `liu.qihan@kotei.com.cn`
- `li.yandong@kotei.com.cn`
- `gao.jinming@kotei.com.cn`

## 如何新增项目

只需要修改：

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

如果你需要部署到 GitHub Pages，请修改 `astro.config.mjs` 中的：

```js
site: "https://your-org.github.io",
base: "/your-repo"
```

适用地址格式：

```text
https://组织名.github.io/仓库名/
```

仓库中已经提供 GitHub Actions 工作流：

- `.github/workflows/deploy.yml`

启用方法：

1. 推送到 GitHub 仓库的 `main` 分支
2. 在仓库 `Settings -> Pages` 中把 `Source` 设为 `GitHub Actions`
3. 之后每次推送会自动执行 `npm ci`、`npm run build` 并发布 `dist`

## Gitee Pages 部署

当前项目默认就是按 Gitee Pages 子路径部署配置的。

### 当前默认配置

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
base: "/ad3-r"
```

这是为了和 Gitee Pages 子路径保持一致。

### 3. 为什么成员详情页路径会变化？

成员详情页路径来自 `src/data/members.ts` 中的 `id` 字段，例如：

- `/members/liu-qihan/`
- `/members/li-yan-dong/`
- `/members/gao-jin-ming/`

如果你修改了成员 `id`，路由也会随之变化。
