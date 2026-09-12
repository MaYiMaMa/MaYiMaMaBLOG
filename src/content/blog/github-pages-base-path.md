---
title: 用 GitHub Actions 部署静态站的一次踩坑
description: 记录 Pages 部署时 base 路径导致资源 404 的排查过程。
pubDate: 2026-09-12
category: 运维部署
tags:
  - GitHub Pages
  - CI
  - Astro
---

项目仓库名不是 `username.github.io` 时，站点会挂在子路径下，例如 `/MaYiMaMaBLOG/`。

这时如果链接仍写成绝对路径 `/blog/`，线上就会 404。需要：

1. 在 `astro.config.mjs` 设置正确的 `base`
2. 站内链接统一走 `import.meta.env.BASE_URL`（或封装的 `withBase`）

部署成功后，用无窗口打开线上地址，再确认 CSS、文章详情和分类页都能打开。
