# CSDN AdBlocker

[![GitHub stars](https://img.shields.io/github/stars/yang-shuohao/csdn-adblocker)](https://github.com/yang-shuohao/csdn-adblocker/stargazers)  
[项目地址](https://github.com/yang-shuohao/csdn-adblocker)

---

## 项目介绍

CSDN AdBlocker 是一个专为 [CSDN](https://www.csdn.net/) 网站设计的浏览器插件，能够智能、彻底地去除页面中的各种广告内容，让你享受干净、无干扰的阅读体验。它支持动态广告拦截、浮动广告屏蔽，并且持续监控页面变化，确保广告无处藏身。

---

## 主要特点

- **全面广告屏蔽**  
  支持侧边栏广告、底部悬浮广告、内嵌图片广告等多种广告形式。

- **动态广告拦截**  
  利用 MutationObserver 实时监测 DOM 变化，自动清理新加载广告。

- **页面布局修复**  
  去除广告后自动调整页面布局，避免内容被遮挡。

- **轻量高效**  
  纯前端脚本，无需额外后台，运行时性能消耗极低。

- **开源透明**  
  代码托管于 GitHub，完全开源，欢迎社区贡献和反馈。

---

## 安装使用

### 安装方法

1. **克隆项目**

    git clone https://github.com/yang-shuohao/csdn-adblocker.git

2. **在浏览器中加载插件**   
以 Chrome 浏览器为例：       
* 打开 chrome://extensions/   
* 打开右上角「开发者模式」
* 点击「加载已解压的扩展程序」
* 选择克隆下来的 csdn-adblocker 文件夹  
3. **自动生效**   
插件加载后，访问 CSDN 文章页面即可自动屏蔽广告，无需额外配置。

## 注意事项
本插件专注于 CSDN 广告屏蔽，不影响正常网页功能。      
如果 CSDN 网站广告结构发生变化，插件可能需要更新。          
欢迎在 GitHub 提交 issue 反馈问题或建议。       