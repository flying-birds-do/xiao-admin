<template>
  <div :class="['btn', 'btn-inner', popoverFlag && 'popverActive']" @click="popoverShow()" @click.stop></div>
  <transition name="opa-fade">
    <div :class="[
      'table-wrapper',
      popoverFlag && 'tableInner',
    ]" v-if="popoverFlag" @click.stop>
    </div>
  </transition>
</template>
<script setup>
const popoverFlag = ref(false)
const popoverShow = () => {
  chartState.getData(0)
  popoverFlag.value = true
}
onMounted(() => {
  window.addEventListener('click', chartState.closeTable)
})

onUnmounted(() => {
  window.removeEventListener('click', chartState.closeTable)
})//chartState.closeTable就是关闭弹框的方法
</script>