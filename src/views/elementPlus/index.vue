<template>
  <section class="vue-full-warp">
    <iframe class="wh-full" :src="src"></iframe>
  </section>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const src = ref('https://element-plus.gitee.io/zh-CN/guide/quickstart.html');
</script>

<style lang="scss" scoped>
.vue-full-warp {
  display: flex;
  width: calc(100vw - 220px);
  height: calc(100vh - 60px);
  iframe {
    width: 98%;
    border: none;
  }
}
</style>