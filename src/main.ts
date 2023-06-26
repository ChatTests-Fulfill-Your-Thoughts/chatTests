import { createApp } from "vue";
import "@/styles/reset.css";
import "@/styles/font.css";
import "@/styles/animate.css";
import App from "@/App.vue";
import router from "./router";

// 额外引入图标库
import ArcoVueIcon from "@arco-design/web-vue/es/icon";
import "@arco-design/web-vue/dist/arco.css";
import "@arco-themes/vue-chatanywhere/theme.css";

const app = createApp(App);
app.use(ArcoVueIcon);
app.use(router);
app.mount("#app");

// console.log = () => {};
// console.warn = () => {};
// console.error = () => {};
// console.clear();
