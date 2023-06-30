# chattests

## 让知识无界,智能触手可及

- 前端分支项目

### 使用技术

- Vue 3 + TypeScript + Vite
- [arco.design/vue](https://arco.design/vue)

- [sass](https://github.com/sass/dart-sass)

- [ts-md5](https://github.com/cotag/ts-md5)

- [vue-router](https://github.com/vuejs/router#readme)

- [axios](https://axios-http.com)

- [md-editor-v3](https://imzbf.github.io/md-editor-v3/)

- [@gausszhou/vue3-drag-resize-rotate](https://github.com/gausszhou/vue3-drag-resize-rotate#readme)

### [项目文档](https://zaiwen-chattests.feishu.cn/wiki/YKHGwqbgditgO7kmUgJcqXS3nps)

### [主题配置](https://arco.design/themes/design/8357/setting/base/Color)

### 目录说明

src  
├─ assets 资源  
│ ├─ fonts  
│ └─ logo.png  
├─ components # [自定义组件]()  
│ ├─ Explanation.vue  
│ ├─ Footer.vue  
│ ├─ Header.vue  
│ └─ Theme.vue  
├─ config # [全局配置文件]()  
│ └─ base.ts  
├─ models # [class, interface 管理集]()  
│ ├─ @types.ts # [组件 公共 interface 集](./src/models/%40types.ts)  
│ ├─ app.context.ts # [全局非响应式数据实例集](./src/models/app.context.ts)  
│ ├─ app.ref.ts # [全局响应式数据实例集](./src/models/app.ref.ts)  
│ ├─ system.ts  
│ └─ user.ts  
├─ router # [路由]()  
│ └─ index.ts  
├─ services # [网络服务]()  
│ ├─ base.services.ts # [基类(已封装好基础请求结构体)](./src/services/base.services.ts)  
│ ├─ config.ts # [host，uri，method，service 返回结构体定义](./src/services/config.ts)  
│ └─ file.service.ts # [已实现的 文件服务](./src/services/file.service.ts)  
├─ styles # [公共样式]()  
│ ├─ animate.css  
│ ├─ font.css  
│ ├─ index.scss # [公共样式入口文件](./src/styles/index.scss)  
│ └─ reset.css # [样式重置](./src/styles/reset.css)  
├─ utils # [工具集]()  
│ └─ common.methods.ts # [公共函数](./src/utils/common.methods.ts)  
├─ views # [pages]()  
├─ App.vue  
├─ Index.vue # [index - 首页]()  
├─ main.ts # [入口文件](./src/main.ts)  
└─ vite-env.d.ts
