<script setup lang='ts'>
import { ThemeEnum } from '@/models/app.context';
import { appRef } from '@/models/app.ref';
import { ref } from 'vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import VueDragResizeRotate from "@gausszhou/vue3-drag-resize-rotate";
import "@gausszhou/vue3-drag-resize-rotate/lib/bundle.esm.css";

const source = ref('')
const previewTheme: 'default' | 'github' | 'vuepress' | 'mk-cute' | 'smart-blue' | 'cyanosis' = 'default'


function resize(newRect) {
  // console.log(newRect);
}

</script>
<template>
  <VueDragResizeRotate style="border: none" drag-handle=".drag-handle" :parent="true">
    <div class="take-note flex-c">
      <div class="title drag-handle">好记性不如烂笔头</div>
      <MdEditor style="flex: 1;" v-model:model-value="source"
        :theme="appRef.theme === ThemeEnum.Dark ? ThemeEnum.Dark : ThemeEnum.Light" />
    </div>
  </VueDragResizeRotate>
</template>
<style lang='scss' scoped>
.take-note {
  width: 100%;
  height: 100%;
  padding: 20px;
  border-radius: 10px;
  background: rgb(var(--primary-4));
  box-shadow: 0 0 10px var(--color-border-4);
  overflow: hidden;

  .title {
    margin-bottom: 10px;
    cursor: move;
    width: 100%;
    text-align: center;
  }
}

.mark {
  width: 100%;
  height: 100%;
  background-color: aqua;
}
</style>