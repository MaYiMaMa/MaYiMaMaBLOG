---
title: Anaconda
description: Anaconda 实操笔记
pubDate: 2026-09-12
category: Python
tags:
  - Anaconda
  - conda
  - Python
  - 环境管理
---

## 背景

做 Python 开发或数据科学时，最麻烦的往往不是写代码，而是：**解释器版本、第三方库、项目隔离**搅在一起。Anaconda 把 Python 发行版、包管理（conda）和常用科学计算依赖打包在一起，适合快速搭环境。

官方下载（可跳过注册）：

https://www.anaconda.com/download

---

## 安装与环境变量

安装时建议：

1. 优先选 **Just Me**（当前用户）
2. 安装路径尽量用默认，例如 `C:\Users\<用户名>\anaconda3`
3. 若安装程序提示「不建议勾选加入 PATH」，可先按默认安装，再手动把下列目录加入用户 PATH：

```text
C:\Users\<用户名>\anaconda3
C:\Users\<用户名>\anaconda3\Scripts
C:\Users\<用户名>\anaconda3\Library\bin
C:\Users\<用户名>\anaconda3\Library\mingw-w64
C:\Users\<用户名>\anaconda3\Library\usr\bin
```

装完后打开新的终端，先初始化：

```bash
conda init
```

关闭终端再打开，确认：

```bash
conda --version
conda info
conda list
```

---

## 配置国内镜像源

默认源在国内经常很慢。可改用镜像站（清华 TUNA / 北外等）。

### 方式一：编辑 `.condarc`

不同系统配置文件位置：

| 系统 | 路径 |
| --- | --- |
| Windows | `C:\Users\<用户名>\.condarc` |
| macOS / Linux | `~/.condarc` |

在用户目录下找到 `.condarc`（没有就新建），写入镜像配置。例如清华源示意：

![清华镜像 .condarc 配置示例](/MaYiMaMaBLOG/images/anaconda-tutorial/image1.png)

Windows 下可在资源管理器打开用户目录，确认 `.condarc` 是否存在：

![用户目录中的 .condarc 文件](/MaYiMaMaBLOG/images/anaconda-tutorial/image2.png)

可参考如下结构（按镜像站文档更新 URL）：

```yaml
channels:
  - defaults
show_channel_urls: true
default_channels:
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/r
  - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/msys2
custom_channels:
  conda-forge: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
  pytorch: https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud
```

### 方式二：命令行添加（北外示例）

若清华源异常，可改用北外镜像：

```bash
# 清空旧 channels（移除关键字）
conda config --remove-key channels

# 删除索引缓存（很重要）
conda clean -i
conda clean --all

conda config --add channels https://mirrors.bfsu.edu.cn/anaconda/pkgs/main
conda config --add channels https://mirrors.bfsu.edu.cn/anaconda/pkgs/r
conda config --add channels https://mirrors.bfsu.edu.cn/anaconda/cloud/conda-forge
conda config --set show_channel_urls yes
```

查看当前配置来源：

```bash
conda config --show-sources
```

---

## 更换环境和包的默认目录（可选）

系统盘空间紧张时，可以把环境和包缓存放到其他盘，例如：

```bash
conda config --add envs_dirs G:\anaconda\envs
conda config --add pkgs_dirs G:\anaconda\pkgs
```

注意：目标目录需要有**读写权限**，否则创建环境或下载包装会失败。

---

## 虚拟环境常用命令

查看所有环境：

```bash
conda env list
# 或
conda info --envs
```

创建指定 Python 版本的环境：

```bash
conda create -n [环境名] python=[version]
# 例：conda create -n ml38 python=3.8
```

激活 / 退出：

```bash
conda activate [环境名]
conda deactivate
```

删除环境：

```bash
conda env remove -n [环境名]
```

建议：**一个项目一个环境**，避免全局 `base` 被各种包污染。

---

## 包管理

在已激活的环境中：

```bash
# 安装
conda install [包名]
# 例：conda install numpy

# 也可用 pip（优先仍建议 conda 能装则用 conda）
pip install [包名]

# 查看已安装
conda list

# 更新 / 卸载
conda update [包名]
conda uninstall [包名]
```

---

## 推荐自检清单

- [ ] 新终端里 `conda --version` 可用
- [ ] `conda config --show-sources` 能看到国内镜像
- [ ] 能成功 `conda create` 并 `conda activate`
- [ ] 在目标环境中 `conda install numpy` 正常
- [ ] envs/pkgs 已改到大容量磁盘且可读写

---

## 结论

Anaconda 的核心价值是：**用 conda 管解释器 + 依赖 + 隔离环境**。

---

## 附录：完整流程示意

![Anaconda 使用教程完整示意](/MaYiMaMaBLOG/images/anaconda-tutorial/readme.jpg)
