# 多用户任务管理系统

## 采用的技术

- 基于 `@ngrx/store` 和 `@ngrx/effects` 管理状态以及状态产生的影响。
- 使用 `rxjs` 实现响应式编程
- 使用 `json-server` 生成原型 REST API
- 使用 `@angular/material` 为界面组件库以及实现界面主题
- 使用 `@angular/animations` 完成动画
- 封装了若干自定义组件、表单组件、指令、管道等
- 使用 `karma` 进行单元测试：组件、服务、 `effects` 和 `reducer` 等。

## 开发工具链

- 使用 `yarn` 作为包管理工具
- 使用 `@angular/cli` 作为脚手架

## 安装

1. fork 这个项目
2. `cd taskmgr`
3. `yarn install`
4. `json-server ./mock/data.json`
5. `ng serve`

