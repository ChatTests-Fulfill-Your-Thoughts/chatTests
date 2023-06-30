<script lang='ts' setup>
import { Drag } from "@/models/@types";
import { appContext } from "@/models/app.context";
import { appNotify, NotifyOption, NotifyType } from "@/models/app.notify";
import VueDragResizeRotate from "@gausszhou/vue3-drag-resize-rotate";
import { onMounted, reactive, ref } from 'vue';

/** 
 * 说明，公共拖拽窗口组件, 实例化为一个 Application， API 如下
 * -- props --
 * app              应用基础  Registry  在 config/base.ts/Registry   中注册你的应用
 * w , h            默认宽/高 number       
 * x , y            默认坐标  number      
 * draggable        是否允许拖动
 * specification    窗口初始化默认展现形式  Drag.Specification
 * style            自定义样式            'border: none'
 * minWidth         : number,
 * minHeight        : number,
 * maxWidth         : number,
 * maxHeight        : number,             
 * 
 * -- emits（暂未启用） --      
 * minimize         最小化    
 * maximize         最大化    
 * close            关闭      
 * 
 * -- slots --
 * content          主要内容  style:{flex: 1; overflow: auto;}
 * bottom           底部内容      
 */
const props = withDefaults(defineProps<{
  app: { appid: string, name: string, icon: string },
  x?: number, y?: number,
  w?: number, h?: number,
  draggable?: boolean,
  specification?: Drag.Specification,
  minWidth?: number,
  minHeight?: number,
  maxWidth?: number,
  maxHeight?: number,
  style?: string,
}>(), {
  w: 700,
  h: 500,
  draggable: true,
  specification: Drag.Specification.Free,
  style: 'border: none'
})
const emits = defineEmits(['minimize', 'maximize', 'close'])

onMounted(() => {
  appNotify.addListener(NotifyType.ApplicationRenew, renew, 'hope-drag' + props.app.appid);
  appNotify.addListener(NotifyType.ApplicationClick, taskClick, 'hope-drag' + props.app.appid);

  toFree(true);
  changeSpecification();
})

/** 应用有更新，同步更新 */
function renew(): void {
  position.value = appContext.applicationSet.getApplication(props.app.appid);
  console.log(props.app.name, position.value.zIndex);
}

function taskClick(opt: NotifyOption, msg?: string) {
  console.log(opt, msg, props.app);
  if (props.app.appid === msg) {
    isminimize.value = !isminimize.value
  }
}

const isminimize = ref(false);
const windowSpecification = ref(Drag.Specification.Default);
function changeSpecification(): void {
  windowSpecification.value = windowSpecification.value === Drag.Specification.Free ? Drag.Specification.Max : Drag.Specification.Free;
  if (windowSpecification.value === Drag.Specification.Free) {
    toFree();
  } else {
    toMax();
  }
}

function toFree(isInit: boolean = false): void {
  const { w, h, app } = props;
  let x = 0, y = 0;
  if (isInit) {
    x = props.x; y = props.y;
    const { viewWidth, viewHeight } = appContext.system.data;
    x = (viewWidth - w) / 2;
    y = (viewHeight - h) / 2 - 100;
    position.value = { x, y, w, h };
    appContext.applicationSet.setApplication({ ...app, x, y, w, h });
  } else {
    const application = appContext.applicationSet.getApplication(app.appid);
    if (application?.appid) {
      const { x, y, w, h } = appContext.applicationSet.getApplication(app.appid);
      position.value = { x, y, w, h };
      appContext.applicationSet.setApplication({ ...app, x, y, w, h });
    } else {
      toFree(true)
    }
  }
}

function toMax(): void {
  const { viewWidth, viewHeight } = appContext.system.data;
  position.value = { x: 0, y: 0, w: viewWidth, h: viewHeight };
  handles.value = [];
}

const handles = ref(['tl', 'tr', 'br', 'bl']);

const position = ref({} as Drag.PositionInfo)
function resizestop(x: number, y: number, w: number, h: number) {
  console.log('resizestop');
  position.value = { x, y, w, h };
  appContext.applicationSet.setApplication({ ...props.app, ...position.value });
}
function dragstop(x: number, y: number) {
  console.log('dragstop');
  position.value.x = x;
  position.value.y = y;
  appContext.applicationSet.setApplication({ ...props.app, ...position.value });
}


// 元素对齐辅助线
const vLine = ref([]);
const hLine = ref([]);
function getRefLineParams(params) {
  // console.log('getRefLineParams', params);
  const { vLine, hLine } = params;
  vLine.value = vLine;
  hLine.value = hLine;
}

</script>
<template>
  <VueDragResizeRotate :minWidth="minWidth" :minHeight="minHeight" :maxWidth="maxWidth" :maxHeight="maxHeight"
    :w="position.w" :h="position.h" :x="position.x" :y="position.y" :handles="handles" style="border:none;"
    :style="{ 'z-index': position.zIndex }" :snap="true" :snapTolerance="20" drag-handle=".drag-handle" :parent="true"
    @resizestop="resizestop" @dragstop="dragstop" @refLineParams="getRefLineParams" :key="app.appid" v-if="!isminimize">
    <div class="drag flex-c">
      <div class="drag-handle">
        <div class="title flex">
          <div class="left">{{ app.name }} {{ app.appid }}</div>
          <div class="right">
            <icon-minus class="icon" @click.stop="isminimize = true" />
            <icon-fullscreen class="icon" v-if="windowSpecification === Drag.Specification.Free"
              @click.stop.native="changeSpecification()" />
            <icon-fullscreen-exit class="icon" v-else @click.stop.native="changeSpecification()" />
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

  <!-- 辅助线 -->
  <span class="ref-line v-line" v-for="(  item, index  ) in   vLine  " :key="'v_' + index" v-show="item.display" :style="{
    left: item.position,
    top: item.origin,
    height: item.lineLength
  }
    "></span>
  <span class="ref-line h-line" v-for="(  item, index  ) in   hLine  " :key="'h_' + index" :style="{
    top: item.position,
    left: item.origin,
    width: item.lineLength
  }
    "></span>
</template>
<style lang='scss' scoped>
.drag {
  width: 100%;
  height: 100%;
  padding: 20px;
  overflow: hidden;
  background: #ffffff;

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
    overflow: auto;
  }

  .bottom {
    width: 100%;
  }
}

.ref-line {
  position: absolute;
  background-color: rgb(219, 89, 110);
  z-index: 9999;
}

.v-line {
  width: 1px;
}

.h-line {
  height: 1px;
}
</style>