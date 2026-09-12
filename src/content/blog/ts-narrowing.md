---
title: TypeScript 里收窄联合类型的三个习惯
description: 用判别字段、类型守卫和提前返回，让分支更稳。
pubDate: 2026-09-12
category: 前端
tags:
  - TypeScript
  - 类型
---

处理联合类型时，我现在默认这样做：

1. **给对象加判别字段**（`kind` / `type`），用 `switch` 收窄。
2. **复杂条件抽成类型守卫**，例如 `function isOk(x): x is Ok`。
3. **先处理失败分支并 return**，后面的主路径类型会自然变干净。

这三条比到处写断言更耐看，也更适合丢进技术笔记里反复查。
