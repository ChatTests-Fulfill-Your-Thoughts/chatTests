<script setup lang='ts'>
import Welcome from '@/components/Welcome.vue';
import Lore from '@/components/Lore.vue';
import Loading from '@/components/Loading.vue';
import { appRef } from '@/models/app.ref';
import { onMounted, ref } from 'vue';
import { appNotify, NotifyType } from '@/models/app.notify';


onMounted(() => {
  appNotify.addListener(NotifyType.Wallpaper, updatedWallpaper, 'index');
  updatedWallpaper();
})

const wallpaper = ref('');
function updatedWallpaper(): void {
  wallpaper.value = appRef.user.data?.wallpaper
}

</script>
<template>
  <div class="index flex-c" :style="{
    backgroundImage: 'url(' + wallpaper + ')'
  }">
    <Header />
    <main class="main">
      <Lore />
      <!-- <Loading /> -->
      <!-- <a-split class="split" v-model:size="size" min="80px">
        <template #first>
          <a-typography-paragraph class="left">
            <Lore />
          </a-typography-paragraph>
        </template>
        <template #second>
          <a-typography-paragraph class="right">Right</a-typography-paragraph>
        </template>
      </a-split> -->
      <!-- <TakeNote /> -->
    </main>
    <Welcome />
  </div>
</template>
<style lang='scss' scoped>
.index {
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-position: center;
  // background-image: url('https://img0.baidu.com/it/u=937072262,2445742246&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800');

  .main {
    width: 100%;
    flex: 1;
    margin: 10px auto;

    .split {
      height: 100%;
      width: 99%;
      margin: 0 auto;
      border: 1px solid var(--color-border);

      .left {
        padding: 10px;
      }

      .right {
        padding: 10px;
      }
    }
  }
}

.vdr.active:before {
  display: none;
}
</style>