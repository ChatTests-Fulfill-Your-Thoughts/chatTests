<script lang='ts' setup>
import { onMounted, ref } from 'vue';
import { LoreQuestionInfo } from '@/models/lore'
import { appRef } from '@/models/app.ref';

const question = ref({} as LoreQuestionInfo)
onMounted(() => {
  const index = appRef.lore.currSubject?.questions?.length;
  question.value = appRef.lore.currSubject?.questions[index - 1];
})

</script>
<template>
  <div class="lore">
    {{ question?.question }}
  </div>
</template>
<style lang='scss' scoped></style>