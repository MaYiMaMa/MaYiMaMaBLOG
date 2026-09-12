# 蚂蚁码码博客

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

## 部署到外网

本站已通过 GitHub Pages 发布：

**https://mayimama.github.io/MaYiMaMaBLOG/**

推送到 `main` 分支后会自动重新部署。

仓库地址：https://github.com/MaYiMaMa/MaYiMaMaBLOG

如需更换域名，修改 `astro.config.mjs` 中的 `site` / `base`。

## 站点信息

可在 `src/consts.ts` 修改站点标题、简介与作者名。
