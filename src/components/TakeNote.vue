<script setup lang='ts'>
import { ThemeEnum } from '@/models/app.context';
import { appRef } from '@/models/app.ref';
import { ref } from 'vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import Drag from './base/Drag.vue'
import { Registry } from '@/config/base';

const source = ref('')
const previewTheme: 'default' | 'github' | 'vuepress' | 'mk-cute' | 'smart-blue' | 'cyanosis' = 'default'

</script>
<template>
  <Drag :app="Registry.takeNote">
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