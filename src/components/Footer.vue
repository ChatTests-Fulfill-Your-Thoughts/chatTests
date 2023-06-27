<script lang='ts' setup>
import { Site } from "@/config/base";
import { ref } from "vue";

</script>
<template>
  <div class="footer flex-c">
    <a class="desc" href="https://beian.miit.gov.cn" target="_blank">
      {{ Site.filing_number }}
    </a>
    <div>Copyright © 2023 - {{ new Date().getFullYear() }} AIGeniusHackers All Rights Reserved</div>
  </div>
</template>
<style lang='scss' scoped>
.footer {
  width: 100%;
  padding: 20px;
  border-top: 1px var(--color-fill-1) solid;
  z-index: 1;

  * {
    font-family: "SmileySans-Oblique 得意黑";
  }

  .desc {
    color: var(--color-text-2);
    margin-bottom: 10px;
  }
}
</style>