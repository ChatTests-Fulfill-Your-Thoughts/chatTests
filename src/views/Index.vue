<script setup lang='ts'>
import { ref, reactive } from 'vue';
import TakeNote from '@/components/TakeNote.vue'
import Welcome from '@/components/Welcome.vue';
import Header from '@/components/Header.vue';
import Lore from '@/components/Lore.vue';

const size = ref(0.5)

</script>
<template>
  <div class="index flex-c">
    <Header />
    <main class="main">
      <Lore />

      <!-- <a-split class="split" v-model:size="size" min="80px">
        <template #first>
          <a-typography-paragraph class="left">
            <Lore />
          </a-typography-paragraph>
        </template>
        <template #second>
          <a-typography-paragraph class="right">Right</a-typography-paragraph>
        </template>
      </a-split> -->
    </main>
    <Welcome />
  </div>
</template>
<style lang='scss' scoped>
.index {
  width: 100vw;
  height: 100vh;
  background: #fffdf3;

  .main {
    width: 100%;
    flex: 1;
    margin: 10px auto;

    .split {
      height: 100%;
      width: 99%;
      margin: 0 auto;
      border: 1px solid var(--color-border);

      .left {
        padding: 10px;
      }

      .right {
        padding: 10px;
      }
    }
  }
}

.vdr.active:before {
  display: none;
}
</style>