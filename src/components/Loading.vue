<script lang='ts' setup>
import { ref } from 'vue';

</script>
<template>
  <div class="loader"></div>
</template>
<style lang='scss' scoped>
.loader {
  width: 80px;
  height: 80px;
  position: relative;
  margin: 20px auto;
}

.loader:before,
.loader:after {
  content: '';
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  opacity: 0.6;
  animation: pulse 2s ease-in-out infinite;
}

.loader:before {
  background-color: #3498db;
  animation-delay: 0s;
}

.loader:after {
  background-color: #f3f3f3;
  animation-delay: 1s;
}

@keyframes pulse {
  0% {
    transform: scale(0);
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}
</style>