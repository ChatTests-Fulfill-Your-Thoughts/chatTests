<script setup lang='ts'>
import Welcome from '@/components/Welcome.vue';
import Lore from '@/components/Lore.vue';
import TakeNote from '@/components/TakeNote.vue';
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
    <Taskbar />
    <main class="main">
      <Lore />
      <TakeNote />
      <!-- <Welcome /> -->
    </main>
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
    margin: auto;

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