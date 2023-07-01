<script lang='ts' setup>
import { appRef } from '@/models/app.ref';
import { Message } from '@arco-design/web-vue';
import { onMounted, ref } from 'vue';
import Theme from './Theme.vue';
import { Site } from '@/config/base';
import { appNotify, NotifyOption, NotifyType } from '@/models/app.notify';
import { regExpImage } from '@/utils/common.methods';
import { appContext } from '@/models/app.context';

const openai_key = ref('');
const wallpaper = ref('');
onMounted(() => {
  openai_key.value = appRef.user.data.openai_key;
  wallpaper.value = appContext.system.data.wallpaper;
})

function blurOpenai(): void {
  appRef.user.setOpenKey(openai_key.value);
  Message.success('Api_Key 全局设置成功')
}

function blurWallpaper(): void {
  regExpImage(wallpaper.value).then((res) => {
    if (res) {
      appContext.system.setWallpaper(wallpaper.value);
      appNotify.send(NotifyType.Wallpaper, NotifyOption.Updated)
      Message.success('背景图设置成功')
    } else {
      wallpaper.value = '';
      Message.error('图片链接不可访问')
    }
  })
}

function onClear(): void {
  localStorage.clear();
  Message.success('缓存清除成功');
} 
</script>
<template>
  <div class="setting">
    <a class="tip flex" href="https://gitee.com/xu-zhanwei/chatanywhere/blob/master/Support.md" target="_blank">
      <icon-face-smile-fill size="20" />
      <span>点击此处支持项目后续开发</span>
    </a>
    <div class="group">
      <!-- <div class="cell  flex">
        <Theme :show="true" class="icon"></Theme>
        系统主题
      </div> -->
      <a :href="Site.oldwebsite" target="_black">
        <div class="cell flex"> <icon-schedule class="icon" /> 体验旧版 </div>
      </a>
      <a-popconfirm content="确认清空本地缓存吗?" @ok="onClear">
        <div class="cell flex"> <icon-delete class="icon" />清空本地缓存 </div>
      </a-popconfirm>
      <div class="cell  ">
        <p class="title flex" style="margin-bottom: 10px;"><icon-idcard class="icon" />Api_Key</p>
        <a-input placeholder="Please enter ..." allow-clear v-model="openai_key" @blur="blurOpenai" />
      </div>
      <div class="cell  ">
        <p class="title flex" style="margin-bottom: 10px;"><icon-idcard class="icon" />壁纸</p>
        <a-input placeholder="Please enter ..." allow-clear v-model="wallpaper" @blur="blurWallpaper" />
      </div>
    </div>

  </div>
</template>
<style lang='scss' scoped>
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

.setting {
  .group {
    .cell {
      margin: 17px 0;
      box-shadow: 0 0 10px var(--color-border-3);
      padding: 17px 20px;
      border-radius: 3px;
    }

    .icon {
      margin-right: 10px;
      font-size: 20px;
    }
  }
}
</style>