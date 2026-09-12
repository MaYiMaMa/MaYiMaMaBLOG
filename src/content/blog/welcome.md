---
title: 欢迎来到蚂蚁码码博客
description: 这是站点的第一篇文章，介绍技术博客与分类写法。
pubDate: 2026-09-10
category: 工程实践
tags:
  - Astro
  - 博客
---

你好，这里是 **蚂蚁码码**。

这个博客面向技术记录，已支持：

- 首页与文章列表
- **按分类归档与筛选**
- 文章详情与关于页
- Markdown 写作

## 如何写一篇带分类的文章

在 `src/content/blog/` 新建 `.md`：

```md
---
title: 标题
description: 一句话简介
pubDate: 2026-09-12
category: 前端
tags:
  - TypeScript
  - React
---

正文从这里开始。
```

- `category`：主分类，一篇一个（如 前端 / 后端 / 工程实践）
- `tags`：细粒度标签，可多个

常见分类可在 `src/data/categories.ts` 补充说明；就算没预先登记，只要 frontmatter 写了也会自动出现。
