<template>
  <section class="app-main">
      1221212

    <transition name="fade-transform" mode="out-in">
      <router-view/>
    </transition>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

</script>

<style lang="scss" scoped>
.app-main {
  margin: 122px 20px 0;
  min-height: calc(100vh - 122px);
  position: relative;
  // overflow: hidden;
  background: #fff;
  border-radius: 2px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
