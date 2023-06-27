<script lang='ts' setup>
import { onMounted, ref } from 'vue';
import { LoreQuestionInfo } from '@/models/lore'
import { appRef } from '@/models/app.ref';
import { chatService } from '@/services/chat.service';

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
  <div class="lore">
    <div class="question">{{ question.topic }}</div>
    <div class="answers">
      <div class="answer"> {{ question.A }} </div>
      <div class="answer"> {{ question.B }} </div>
      <div class="answer"> {{ question.C }} </div>
      <div class="answer"> {{ question.D }} </div>
    </div>
    <div class="analyze"> {{ question.analyze }} </div>
  </div>
</template>
<style lang='scss' scoped></style>