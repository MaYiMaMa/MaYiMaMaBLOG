# 蚂蚁妈妈博客

基于 Astro 的最小可行个人博客：首页、文章列表/详情、关于页，文章用 Markdown 编写。

## 本地运行

```sh
npm install
npm run dev
```

浏览器打开提示的地址（通常是 `http://localhost:4321`）。

## 写文章

在 `src/content/blog/` 新建 `.md` 文件，例如：

```md
---
title: 标题
description: 简介
pubDate: 2026-09-12
tags:
  - 随笔
---

正文内容
```

## 构建

```sh
npm run build
npm run preview
```

## 部署到外网（推荐）

1. 把项目推到 GitHub
2. 打开 [Vercel](https://vercel.com) 或 [Cloudflare Pages](https://pages.cloudflare.com)
3. 导入仓库，框架选 Astro，按默认构建即可
4. 部署完成后会得到公网地址（如 `xxx.vercel.app`）

部署后把 `astro.config.mjs` 里的 `site` 改成你的真实域名。

## 站点信息

可在 `src/consts.ts` 修改站点标题、简介与作者名。
