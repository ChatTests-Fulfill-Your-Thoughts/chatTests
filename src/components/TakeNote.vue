<script setup lang='ts'>
// import { ThemeEnum } from '@/models/app.context';
// import { appRef } from '@/models/app.ref';
import { ref } from 'vue';
// import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import Drag from './base/Drag.vue'
import { Registry } from '@/config/base';
import Vditor from "vditor";
import "vditor/dist/index.css";
import { reactive, onMounted, onBeforeUnmount } from 'vue';

const vditor = ref<Vditor | null>(null);
// const vditor = reactive<{ instance: Vditor | null, height: number, width: number }>({
//   instance: null,
//   height: window.innerHeight,
//   width: window.innerWidth,
// });

// const source = ref('')
// const previewTheme: 'default' | 'github' | 'vuepress' | 'mk-cute' | 'smart-blue' | 'cyanosis' = 'default'

onMounted(() => {
  vditor.value = new Vditor("vditor", {
    height: window.innerHeight ,
    minHeight: window.innerHeight,
    width: window.innerWidth,
    toolbarConfig: {
      pin: true,
    },
    cache: {
      enable: false,
    },
    after: () => {
      vditor.value!.setValue("# 记笔记是一个好习惯");
    },
  });
});

</script>
<template>
  <Drag :app="Registry.takeNote">
    <template #content>
      <!-- <MdEditor style="flex: 1;" v-model:model-value="source"
        :theme="appRef.theme === ThemeEnum.Dark ? ThemeEnum.Dark : ThemeEnum.Light" /> -->

      <div id="vditor" style="margin-top: 30px"/>
    </template>

  </Drag>
</template>
<style lang='scss' scoped>
.take-note {
  background: #ffffff;
}
</style>