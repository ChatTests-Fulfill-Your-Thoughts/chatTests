<script lang='ts' setup>
import { ref, onMounted } from "vue";
import Setting from '../Setting.vue'
import { Site } from "@/config/base";

const loading = ref(true);
const currMenu = ref('');
const menus = ref([
  {
    name: "高效工作版",
    href: "/chat/working-edition",
  },
  {
    name: "在线搜索",
    href: "/chat/online-search",
  },
  {
    name: "AI绘画",
    href: "/chat/aidraw",
  },
  {
    name: "文档分析",
    href: "/chat/documentQA",
  },
])

onMounted(() => {
  const href = location.href;
  currMenu.value = menus.value.find((val) => href.includes(val.href))?.href;
  loading.value = false;
})

const isSetting = ref(false);


</script>
<template>
  <div class="header" v-if="!loading">
    <div class="top flex">
      <div class="left">
        <a-menu mode="horizontal" :default-selected-keys="[currMenu]">
          <a-menu-item v-for="item in menus" :key="item.href">
            <router-link :to="{ path: item.href, replace: true }">
              <icon-computer v-if="item.href === '/chat/working-edition'" />
              <icon-mobile v-else-if="item.href === '/chat/youth-version'" />
              <icon-robot v-else-if="item.href === '/chat/aidraw'" />
              <icon-file v-else />
              {{ item.name }}
            </router-link>
          </a-menu-item>
        </a-menu>
      </div>
      <div class="right flex">
        <div class="menu" @click="isSetting = true"> <icon-menu /> </div>
        <!-- <div class="menu"><router-link to="/login">登录</router-link></div> -->
      </div>
    </div>
    <a-modal fullscreen v-model:visible="isSetting" title="全局设置" @cancel="isSetting = false" :footer="false">
      <Setting />
    </a-modal>
  </div>
</template>
<style lang='scss' scoped>
.header {
  background: var(--color-bg-2);
  color: var(--color-text-2);
  border-bottom: 1px solid var(--color-neutral-4);
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 9;
  opacity: .5;


  .top {
    width: 100%;
    justify-content: space-between;

    .left {
      flex: 1;
    }

    .right {
      padding: 14px 20px;
    }

    .menu {
      margin: 0 10px;
      cursor: pointer;
    }
  }

  .tip {
    width: 100%;
    padding: 7px;
    color: rgb(var(--arcoblue-7));
    opacity: .7;
    text-decoration: none;
    text-align: center;
    background: var(--color-neutral-4);
    justify-content: center;

    span {
      margin: 0 10px;
    }
  }
}
</style>