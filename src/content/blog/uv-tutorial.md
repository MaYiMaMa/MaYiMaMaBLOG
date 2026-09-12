---
title: uv
description: 日常开发的常用命令梳理
pubDate: 2026-09-12
category: Python
tags:
  - uv
  - 包管理
  - 虚拟环境
---

## uv

- 文档（首选）：[https://docs.astral.sh/uv/](https://docs.astral.sh/uv/)
- GitHub：[https://github.com/astral-sh/uv](https://github.com/astral-sh/uv)

**uv** 是用 Rust 写的 Python 包与项目管理工具

---

## 功能

- 为项目创建并维护 `.venv`
- 用 `pyproject.toml` + `uv.lock` 管理依赖，保证可复现
- 很快地安装依赖（通常比 pip 快很多）
- 用 `uv run` 在项目环境里直接跑脚本，少一次手动 activate

一句话：**uv = 更快的包管理 + 更顺手的项目环境工作流。**

---

## 3. 和 pip 的区别？

两者都能「装包」，但定位不同：

| 维度 | pip | uv |
| --- | --- | --- |
| 核心职责 | 安装包到当前环境 | 项目/环境/锁文件/运行一体 |
| 速度 | 一般 | 通常明显更快 |
| 虚拟环境 | 需配合 `python -m venv` | `uv venv` / 项目命令自动管理 `.venv` |
| 依赖锁定 | 常靠 `requirements.txt` 手写或另工具 | 原生 `uv.lock`（建议提交到 Git） |
| 声明文件 | 常见 `requirements.txt` | 更推荐 `pyproject.toml` |
| 兼容性 | 生态标准 | 也提供 `uv pip install` 等兼容用法 |

补充：

- **不是二选一互斥**：你可以在旧项目继续用 pip；新项目更适合直接上 uv。
- 需要兼容旧流程时，可用：

```bash
uv pip install -r requirements.txt
```

这更像「用 uv 的安装引擎去执行 pip 风格命令」，不等于放弃项目模式。

---

## 4. 怎么安装 uv？（含 `pip install uv`）

文档里写的 `pip install uv` **可以**，但官方更推荐独立安装器（不依赖现有 Python/pip 是否健康）。

### 方式 A：官方安装脚本（推荐）

Windows（PowerShell）：

```powershell
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

macOS / Linux：

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

装完后新开终端，检查：

```bash
uv --version
```

### 方式 B：用 pip / pipx 安装

```bash
pip install uv
# 或
pipx install uv
```

适用：本机 Python/pip 已经稳定，只想快速装上 CLI。

### 方式 C：包管理器

例如 Homebrew：`brew install uv`（以官方文档当前说明为准）。

---

## 5. 常用命令和推荐流程

下面按「新项目日常」梳理。

### 流程总览

```text
安装 uv
  → uv init 创建项目
  → uv add 添加依赖（自动更新锁文件和环境）
  → uv run 运行代码 / 测试
  → 换机器或同事：git clone 后 uv sync
```

### 5.1 初始化项目

```bash
# 在空目录或新目录
uv init my-app
cd my-app
```

常见产物：

- `pyproject.toml`：项目元信息与依赖声明
- 之后首次 `uv sync` / `uv add` / `uv run` 时会生成：
  - `.venv/`：虚拟环境
  - `uv.lock`：精确版本锁（建议提交到 Git）

### 5.2 添加 / 移除依赖

```bash
uv add requests
uv add "httpx>=0.27"
uv add --dev pytest ruff    # 开发依赖

uv remove requests
```

`uv add` / `uv remove` 一般会同时：

1. 改 `pyproject.toml`
2. 更新 `uv.lock`
3. 同步安装到 `.venv`

### 5.3 同步环境

```bash
uv sync
```

适用场景：

- 刚 clone 仓库
- 别人改了 `pyproject.toml` / `uv.lock`
- 你手动改了依赖声明，想把环境对齐

默认会尽量让环境与锁文件一致（多余包可能被移除，属预期行为）。

### 5.4 运行命令（推荐少用手动 activate）

```bash
uv run python main.py
uv run pytest
uv run ruff check .
```

`uv run` 会在项目环境中执行；环境过期时往往会先帮你同步。

当然也可以传统方式：

```bash
# Windows
.venv\Scripts\activate

# macOS / Linux
source .venv/bin/activate
```

### 5.5 Python 版本相关

```bash
uv python list              # 查看可用/已安装版本
uv python install 3.12      # 安装某版本 Python
uv venv --python 3.12       # 用指定版本建环境
```

### 5.6 工具型用法（临时跑一个 CLI）

```bash
uvx ruff check .
```

类似 `npx`：不必先全局常驻安装该工具。

### 5.7 一张「从 0 到可跑」速查

```bash
# 1) 安装 uv 后
uv init demo && cd demo

# 2) 加依赖
uv add rich

# 3) 写代码后运行
uv run python main.py

# 4) 提交时带上
#    pyproject.toml
#    uv.lock
#    （不要提交 .venv）

# 5) 别人拉取后
uv sync
uv run python main.py
```

---

## 推荐自检清单

- [ ] `uv --version` 可用
- [ ] 能 `uv init` 并看到 `pyproject.toml`
- [ ] `uv add` 后 `.venv` 与 `uv.lock` 出现/更新
- [ ] `uv run python -c "print('ok')"` 成功
- [ ] 新目录 `uv sync` 能复现依赖

---