<script lang='ts' setup>
import { onMounted, ref } from 'vue';
import { LoreQuestionInfo } from '@/models/lore'
import { appRef } from '@/models/app.ref';
import { chatService } from '@/services/chat.service';
import VueDragResizeRotate from "@gausszhou/vue3-drag-resize-rotate";


const question = ref({} as LoreQuestionInfo)
onMounted(() => {
  appRef.lore.setData();
  getNewQuestion();
})

function init(): void {
  const index = appRef.lore.currSubject?.questions?.length;
  question.value = appRef.lore.currSubject?.questions[index - 1];
}

function getNewQuestion(): void {
  chatService.message(appRef.lore.newQuestionPrompt, chunk, end)
}


function chunk(text: string): void {
  text = text.replace(/[\n\s]+/g, "");
  if (text.length <= 2) return;

  try {
    question.value = JSON.parse(text + '"}');
  } catch (error) {
    console.log(text);
  }
}

function end(text: string): void {
  question.value = JSON.parse(text) as LoreQuestionInfo;
  appRef.lore.addQuestion(question.value);
}

</script>
<template>
  <VueDragResizeRotate w="600" h="500" style="border: none" drag-handle=".drag-handle" :parent="true">
    <div class="lore flex-c">
      <div class="title drag-handle">AI备考助手</div>
      <div class="conter">
        <div class="topic">{{ question.topic }}</div>
        <div class="answers">
          <div class="answer" v-if="question.A"> A: {{ question.A }} </div>
          <div class="answer" v-if="question.B"> B: {{ question.B }} </div>
          <div class="answer" v-if="question.C"> C: {{ question.C }} </div>
          <div class="answer" v-if="question.D"> D: {{ question.D }} </div>
        </div>
        <div class="analyze" v-if="question.analyze">
          <p>正确答案：{{ question.correct }} - 答案解析： </p>
          <p>{{ question.analyze }}</p>
        </div>
      </div>
      <div class="bottom">
        <button @click="getNewQuestion">xiayiti</button>
      </div>
    </div>
  </VueDragResizeRotate>
</template>
<style lang='scss' scoped>
.lore {
  width: 100%;
  height: 100%;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px var(--color-border-4);
  overflow: hidden;

  .title {
    margin-bottom: 10px;
    cursor: move;
    width: 100%;
    text-align: center;
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px var(--color-border-4) solid;
  }

  .conter {
    width: 100%;

    .topic {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 20px;
    }

    .answers {
      .answer {
        font-size: 15px;
        margin-bottom: 20px;
      }
    }

    .analyze p {
      font-size: 15px;
      margin-bottom: 10px;
      line-height: 20px;
    }
  }
}
</style>