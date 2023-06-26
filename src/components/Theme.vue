<script lang='ts' setup>
import { ThemeEnum } from '@/models/app.context';
import { appRef } from '@/models/app.ref';
import { Message } from '@arco-design/web-vue';
import { onMounted } from 'vue';

defineProps<{ show?: boolean }>()

onMounted(() => {
  appRef.theme = localStorage.getItem('theme') as ThemeEnum || ThemeEnum.Light;
  changeTheme(appRef.theme, true);
})

function changeTheme(type: ThemeEnum, isInit: boolean = false): void {
  if (type === ThemeEnum.Dark) {
    // 设置为暗黑主题
    document.body.setAttribute('arco-theme', 'dark');
    if (!isInit) Message.success('已设为暗黑主题');
  } else {
    // 恢复亮色主题
    document.body.removeAttribute('arco-theme');
    if (!isInit) Message.success('已设为亮色主题');
  }
  appRef.theme = type;
  localStorage.setItem("theme", type)
}
</script>
<template>
  <div key="theme" v-if="show">
    <icon-sun-fill size="20" v-if="appRef.theme === ThemeEnum.Light" @click="changeTheme(ThemeEnum.Dark)" />
    <icon-moon-fill size="20" v-else @click="changeTheme(ThemeEnum.Light)" />
  </div>
</template>
<style lang='scss' scoped></style>