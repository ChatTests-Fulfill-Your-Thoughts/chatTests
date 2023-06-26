<script lang='ts' setup>
import Theme from '@/components/Theme.vue'
import { onMounted } from 'vue'
import { appContext } from './models/app.context';

onMounted(() => {
  appContext.system.init();
})
</script>

<template>
  <router-view></router-view>
  <Theme />
</template>
<style lang="scss">
// 占位行
.root {
  // background: #f3f3f3;
  align-content: flex-start;

  .main {
    flex: 1;
    width: 100%;
    overflow: hidden;
    // @media screen and (max-width: 1200px) {
    //   width: 100%;
    // }
    // @media screen and (min-width: 1200px) {
    //   min-width: 1200px;
    //   width: 1400px;
    // }
  }
}

.not-scene {
  justify-content: center;
  font-size: 20px;
}
</style>
