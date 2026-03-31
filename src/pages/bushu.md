---
title: Valaxy博客搭建全过程（附GitHub Pages部署教程）
date: 2026-03-31
tags: [Valaxy, 博客部署, 前端实践]
categories: 技术实践
---

本次APP组作业要求搭建并部署个人博客，经过对比Astro、Hexo和Valaxy三个框架，我最终选择了Valaxy，原因很简单：它基于Astro开发，极简且开箱即用，不用复杂配置，非常适合快速搭建个人博客，也能完美适配GitHub Pages的免费部署需求。

### 搭建步骤（全程简单易操作）
1.  初始化项目：打开终端，执行npm create valaxy@latest，跟随提示输入项目名，一键生成博客基础结构。
2.  本地预览：进入项目文件夹，执行npm install安装依赖，再用npm run dev启动本地服务，访问http://localhost:4859就能看到博客预览效果。
3.  内容修改：默认的博客主题已经很简洁，我只修改了首页标题和个人简介，不需要额外配置主题样式，节省了很多时间。

### 部署到GitHub Pages（免费，一键生效）
部署过程比我想象中简单，不需要手动配置GitHub Pages的设置，只需要执行两条命令：
1.  npm run build：打包博客项目，生成静态文件。
2.  npm run deploy：自动将打包后的文件推送到GitHub仓库，部署到GitHub Pages。

部署完成后，等待1分钟左右，就能通过「用户名.github.io/仓库名」访问我的个人博客，全程没有遇到复杂问题，只有一次因为仓库名拼写错误导致访问404，修改仓库名后就顺利解决了。

这次搭建博客让我熟悉了Valaxy框架的使用，也掌握了GitHub Pages的免费部署方法，后续我还会继续完善博客内容，添加更多自己的学习笔记。