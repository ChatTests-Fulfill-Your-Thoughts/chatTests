import { Site } from "@/config/base";
import { setDocumentTitle } from "@/utils/common.methods";
import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from "vue-router";

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes: Readonly<RouteRecordRaw[]> = [
  { name: "index", path: "/", component: () => import("@/views/Index.vue"), meta: { transitionName: "slide-left", title: Site.name } },
];

//  创建路由实例并传递 `routes` 配置
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  // history: createWebHistory(),
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});
// //beforeEach是router的钩子函数，在进入路由前执行
router.beforeEach((to, from, next) => {
  console.log(from);
  //判断是否有标题
  if (to?.meta?.title) {
    setDocumentTitle((to.meta.title + " | " + Site.slogan) as string);
  }
  next(); //执行进入路由，如果不写就不会进入目标页
});

export default router;
// 现在，应用已经启动了！
