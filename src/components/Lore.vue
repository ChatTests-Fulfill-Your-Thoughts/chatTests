<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { LoreQuestionInfo } from "@/models/lore";
import { appRef } from "@/models/app.ref";
import { chatService } from "@/services/chat.service";
import Drag from "./base/Drag.vue";
import { Registry } from "@/config/base";

const question = ref({} as LoreQuestionInfo);
const showAnswer = ref(false);
const getItRight = ref(false);
const answers = ref({ current: '' });

onMounted(() => {
  appRef.lore.setData();
  getNewQuestion();
});

function init(): void {
  const index = appRef.lore.currSubject?.questions?.length;
  question.value = appRef.lore.currSubject?.questions[index - 1];
}

function getNewQuestion(): void {
  showAnswer.value = false;
  answers.value.current='';
  chatService.message(appRef.lore.newQuestionPrompt, chunk, end);
}

function chunk(text: string): void {
  text = text.replace(/[\n\s]+/g, "");
  if (text.length <= 2) return;

  try {
    question.value = JSON.parse(text + '"}');
  } catch (error) {
    // pass
  }
}

function end(text: string): void {
  question.value = JSON.parse(text) as LoreQuestionInfo;
  appRef.lore.addQuestion(question.value);
}

function seeTheParse(): void {
  showAnswer.value = true;
}

function answerChange(value: string): void {
  // console.log(question);
  // console.log(value);
  // console.log("correct: " + question.value.correct + " selected: " + value);
  if (question.value.correct === value) {
    getItRight.value = true;
  } else {
    getItRight.value = false;
  }
}
</script>

<template>
  <Drag :app="Registry.lore">
    <template #content>
      <div class="conter">
        <div class="topic">{{ question.topic }}</div>
        <a-radio-group
          class="answers"
          direction="vertical"
          @change="answerChange"
          v-model="answers.current"
        >
          <a-radio value="A" size="large">A: {{ question.A }}</a-radio>
          <a-radio value="B" size="large">B: {{ question.B }}</a-radio>
          <a-radio value="C" size="large">C: {{ question.C }}</a-radio>
          <a-radio value="D" size="large">D: {{ question.D }}</a-radio>
        </a-radio-group>
        <div class="analyze" v-if="showAnswer">
          <a-col>
            <a-alert type="success" v-if="showAnswer && getItRight"
              >太棒啦！！回答正确！继续学习呀！</a-alert
            >
          </a-col>
          <a-col>
            <a-alert type="error" v-if="showAnswer && !getItRight"
              >这次答错啦！不要紧，再来一次！</a-alert
            >
          </a-col>
          <a-collapse>
            <a-collapse-item header="查看解析">
              <div>
                <p>{{ question.analyze }}</p>
              </div>
            </a-collapse-item>
          </a-collapse>
        </div>
      </div>
    </template>
    <template #bottom>
      <a-button type="primary" shape="round" @click="seeTheParse"
        >提交答案</a-button
      >
      <a-button type="primary" shape="round" @click="getNewQuestion"
        >下一题</a-button
      >
    </template>
  </Drag>
</template>

<style lang="scss" scoped>
.title {
  margin-bottom: 10px;
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
</style>
