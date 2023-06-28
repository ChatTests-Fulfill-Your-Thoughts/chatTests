<script setup lang='ts'>
import { ThemeEnum } from '@/models/app.context';
import { appRef } from '@/models/app.ref';
import { ref } from 'vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import Drag from './base/Drag.vue'

const source = ref('')
const previewTheme: 'default' | 'github' | 'vuepress' | 'mk-cute' | 'smart-blue' | 'cyanosis' = 'default'

</script>
<template>
  <Drag class="take-note" title="好记性不如烂笔头">

    <template #content>
      <MdEditor style="flex: 1;" v-model:model-value="source"
        :theme="appRef.theme === ThemeEnum.Dark ? ThemeEnum.Dark : ThemeEnum.Light" />
    </template>

  </Drag>
</template>
<style lang='scss' scoped>
.take-note {
  background: #ffffff;
}
</style>