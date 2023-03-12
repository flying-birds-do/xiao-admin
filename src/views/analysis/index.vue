<template>
  <section class="analysis-warp">
    图表
    <div id="myChart" style="width: 600px;height:400px;"></div>
    <div id="main" style="width: 600px;height:400px;"></div>
  </section>
</template>
<script lang="ts">
import { defineComponent, toRefs, reactive, onMounted, ref } from 'vue'
import * as echarts from 'echarts'

export default defineComponent({
  name: 'Histogram',
  setup() {
    const state = reactive({
      option: {
        grid: {
          top: '4%',
          left: '2%',
          right: '4%',
          bottom: '0%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            data: ["芳草地国际", "实验小学", "白家庄小学", "外国语小学", "师范学校附属", "望京东园"],
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
          },
        ],
        series: [
          {
            name: '学校',
            type: 'bar',
            barWidth: '40%',
            data: [260, 680, 360, 460, 150, 320],
          },
        ],
      },
    })
    const bsWrapper: any = ref<HTMLElement>()
    const initeCharts = () => {
      bsWrapper.value = document.getElementById('myChart')
      let myChart = echarts.init(bsWrapper.value)
      // 绘制图表
      myChart.setOption(state.option)
    }

    onMounted(() => {
      initeCharts()
    })
 
  }

})

</script>