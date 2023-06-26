<script setup lang='ts'>
import { ThemeEnum } from '@/models/app.context';
import { appRef } from '@/models/app.ref';
import { ref } from 'vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import VueDragResize from 'vue-drag-resize/src';

const source = ref('')
const previewTheme: 'default' | 'github' | 'vuepress' | 'mk-cute' | 'smart-blue' | 'cyanosis' = 'default'


function resize(newRect) {
  // console.log(newRect);
}

</script>
<template>
  <VueDragResize :w="1000" :h="600" :parentLimitation="true" dragHandle=".take-note">
    <div class="take-note flex-c">
      <div class="title">好记性不如烂笔头</div>
      <MdEditor style="flex: 1;" v-model:model-value="source"
        :theme="appRef.theme === ThemeEnum.Dark ? ThemeEnum.Dark : ThemeEnum.Light" />
    </div>
  </VueDragResize>
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
  }
}

.mark {
  width: 100%;
  height: 100%;
  background-color: aqua;
}
</style>