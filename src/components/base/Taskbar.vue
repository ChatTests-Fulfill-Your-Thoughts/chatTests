<script lang='ts' setup>
import { appContext } from '@/models/app.context';
import { appNotify, NotifyOption, NotifyType } from '@/models/app.notify';
import { ApplicationInfo } from '@/models/application';
import { onMounted, ref } from 'vue';
import Setting from '../Setting.vue'


const isSetting = ref(false);
const applications = ref([] as ApplicationInfo[])

onMounted(() => {
  appNotify.addListener(NotifyType.Application, setApplications, 'hope-taskbar');
  setApplications();
})

function setApplications(): void {
  applications.value = appContext.applicationSet.applications;
  console.log(applications.value);
}

/** 点击了某个应用 */
function onItem(appid: string): void {
  console.log('点击了某个应用', appid);
  appNotify.send(NotifyType.ApplicationClick, NotifyOption.Empty, appid)
}

</script>
<template>
  <div class="task-bar flex">
    <div class="item setting flex-c" @click="isSetting = true">
      <icon-apps class="icon" />
    </div>
    <div class="group flex">
      <div class="item" v-for="item in applications" :key="item.appid" @click="onItem(item.appid)">
        <img class="icon" :src="item.icon" alt="">
      </div>
    </div>
  </div>
  <a-modal fullscreen v-model:visible="isSetting" title="全局设置" @cancel="isSetting = false" :footer="false">
    <Setting />
  </a-modal>
</template>
<style lang='scss' scoped>
.task-bar {
  width: 100%;
  height: 50px;
  overflow: hidden;
  padding: 0 50px;
  background: #ffffff60;

  .group {
    height: 100%;

  }

  .item {
    height: 100%;
    cursor: pointer;
    padding: 10px;
    animation: all 1s;
    border-radius: 3px;

    &:hover {
      background: #ffffffb0;
    }

    .icon {
      width: min-content;
      height: 100%;
      font-size: 30px;
      color: #00000060;
      object-fit: cover;
    }
  }

  .setting {
    margin-right: 50px;
  }

  .activity {
    background: #ffffffb0;
  }
}
</style>