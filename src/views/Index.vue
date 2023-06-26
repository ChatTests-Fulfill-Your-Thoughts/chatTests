<script setup lang='ts'>
import { ref, reactive } from 'vue';
import TakeNote from '@/components/TakeNote.vue'



</script>
<template>
  <div class="index">
    index
    <TakeNote />
  </div>
</template>
<style lang='scss' scoped>
.index {
  width: 100vw;
  height: 100vh;
}

.vdr.active:before {
  display: none;
}
</style>