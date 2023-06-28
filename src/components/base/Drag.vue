<script lang='ts' setup>
import { Drag } from "@/models/@types";
import { appContext } from "@/models/app.context";
import VueDragResizeRotate from "@gausszhou/vue3-drag-resize-rotate";
import { onMounted, reactive, ref } from 'vue';

/** 
 * 说明，公共拖拽窗口组件 API 如下
 * -- props --
 * title        应用标题  string
 * w            默认宽度  number       
 * h            默认高度  number      
 * isrefresh    是否显示重新获取会话按钮
 * isGoodIdea   是否显示 Good Idea 按钮
 * chunk        流数据显示，仅在 isSend 为 true 时有效，isSend 结束后，需将该条消息写入  sessions 中
 * 
 * -- emits --
 * minimize       最小化   Parma： value:string   会话框中的文本内容
 * maximize       最大化   Parma： value:string   回答/问题 的 uid
 * close          关闭     Parma： value:string   该回答的 quote 
 * 
 * -- slots --
 * title        选择模型插槽
 * stop-send    停止响应
 */
const props = withDefaults(defineProps<{
  appid: string,
  title: string, style?: string,
  x?: number, y?: number,
  w?: number, h?: number,
  minWidth?: number,
  minHeight?: number,
  maxWidth?: number,
  maxHeight?: number,
}>(), {
  w: 500,
  h: 500,
  style: 'border: none'
})
const emits = defineEmits(['minimize', 'maximize', 'close'])

onMounted(() => {
  const { x, y, w, h, appid } = props;
  position.value = { x, y, w, h };
  const app = { appid, x, y, w, h };
  appContext.applicationSet.setApplication(app);
})



const windowSpecification = ref(Drag.Specification.Free);
function onWindowSpecification(type: Drag.Specification): void {
  windowSpecification.value = type;
  if (type === Drag.Specification.Min) {
    console.log('min');
  } else if (type === Drag.Specification.Max) {
    console.log('max');
  } else {
    console.log('free');
  }
}

const handles = ref(['tl', 'tr', 'br', 'bl']);

const position = ref({} as Drag.PositionInfo)
function resizestop(x: number, y: number, w: number, h: number) {
  position.value = { x, y, w, h };
  console.log(position.value);
}
function dragstop(x: number, y: number) {
  position.value.x = x;
  position.value.y = y;
  console.log(position.value);
}

</script>
<template>
  <VueDragResizeRotate :minWidth="minWidth" :minHeight="minHeight" :maxWidth="maxWidth" :maxHeight="maxHeight" :w="w"
    :h="h" :handles="handles" :style="style" drag-handle=".drag-handle" :parent="true" @resizestop="resizestop"
    @dragstop="dragstop" v-if="windowSpecification !== Drag.Specification.Min">
    <div class="drag flex-c">
      <div class="drag-handle">
        <div class="title flex">
          <div class="left">{{ title }}</div>
          <div class="right">
            <icon-minus class="icon" @click.stop="onWindowSpecification(Drag.Specification.Min)" />
            <icon-fullscreen class="icon" @click.stop="onWindowSpecification(Drag.Specification.Max)" />
          </div>
        </div>
      </div>
      <div class="content">
        <slot name="content"></slot>
      </div>
      <div class="bottom">
        <slot name="bottom"></slot>
      </div>
    </div>

  </VueDragResizeRotate>
</template>
<style lang='scss' scoped>
.drag {
  width: 100%;
  height: 100%;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px var(--color-border-4);
  overflow: hidden;
  background: #ffffff9a;

  .drag-handle {
    width: 100%;
    cursor: move;

    .title {
      width: 100%;
      text-align: center;
      border-bottom: 1px #666 solid;
      margin-bottom: 20px;
      padding-bottom: 20px;
      justify-content: space-between;

      .left {
        font-weight: 600;
        font-size: 20px;
      }

      .right {
        .icon {
          font-size: 20px;
          margin-left: 17px;
          cursor: pointer;
        }
      }
    }
  }

  .content {
    width: 100%;
    flex: 1;
    overflow-y: auto;
  }

  .bottom {
    width: 100%;
  }
}
</style>