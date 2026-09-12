---
title: 欢迎来到蚂蚁码码博客
description: 这是站点的第一篇文章，介绍最小可行博客能做什么。
pubDate: 2026-09-10
tags:
  - 开始
  - 博客
---

你好，这里是 **蚂蚁码码**。

这个最小可行版本已经包含：

- 首页展示品牌与最近文章
- 文章列表与文章详情
- 关于页
- 用 Markdown 写内容

## 如何新增一篇文章

在 `src/content/blog/` 下新建一个 `.md` 文件，写好开头的 frontmatter：

```md
---
title: 标题
description: 一句话简介
pubDate: 2026-09-12
tags:
  - 随笔
---

正文从这里开始。
```

保存后刷新本地预览即可看到新文章。

## 下一步

当你准备好对外访问时，可以把项目推到 GitHub，再连接到 Vercel 或 Cloudflare Pages 一键部署。
