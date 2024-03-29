<template>
  <section class="analysis-warp">
    <div class="analysis-top-warp">
      <div id="myChart" style="width: 600px; height: 600px"></div>
      <div id="main" style="width: 500px; height: 600px"></div>
    </div>
    <div class="data-warp">
      <div class="news-notice-warp">
        <div v-for="o in newsArr" :key="o" class="text item">{{ o }}</div>
      </div>
      <div class="news-notice-warp">
          <el-carousel :interval="5000" arrow="always">
            <el-carousel-item v-for="item in imgArr">
              <img :src="item.url" alt="" />
              <h3 text="2xl" justify="center">{{ item.title }}</h3>
            </el-carousel-item>
          </el-carousel>
      </div>
      <div class="news-data-warp">
        <ul>
          <li v-for="item in totalmount" :key="item.mount">
            <span>{{ item.mount }}</span>
            <p>{{ item.name }}</p>
          </li>
        </ul>
      </div>
    </div>
    <div id="broken" style="height: 300px" class="bottom-canvas"></div>
  </section>
</template>
<script lang="ts">
import { defineComponent, toRefs, reactive, onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import img1 from '@/assets/images/1.gif'
import img2 from '@/assets/images/2.gif'
import img3 from '@/assets/images/3.gif'
import img4 from '@/assets/images/4.gif'
export default defineComponent({
  name: 'analysis',
  setup() {
    const colors = ['#5470C6', '#91CC75', '#EE6666']
    const state = reactive({
      option: {
        color: colors,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
          },
        },
        grid: {
          right: '20%',
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        legend: {
          data: ['Evaporation', 'Precipitation', 'Temperature'],
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true,
            },
            // prettier-ignore
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          },
        ],
        yAxis: [
          {
            type: 'value',
            name: 'Evaporation',
            position: 'right',
            alignTicks: true,
            axisLine: {
              show: true,
              lineStyle: {
                color: colors[0],
              },
            },
            axisLabel: {
              formatter: '{value} ml',
            },
          },
          {
            type: 'value',
            name: 'Precipitation',
            position: 'right',
            alignTicks: true,
            offset: 80,
            axisLine: {
              show: true,
              lineStyle: {
                color: colors[1],
              },
            },
            axisLabel: {
              formatter: '{value} ml',
            },
          },
          {
            type: 'value',
            name: '温度',
            position: 'left',
            alignTicks: true,
            axisLine: {
              show: true,
              lineStyle: {
                color: colors[2],
              },
            },
            axisLabel: {
              formatter: '{value} °C',
            },
          },
        ],
        series: [
          {
            name: 'Evaporation',
            type: 'bar',
            data: [
              2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4,
              3.3,
            ],
          },
          {
            name: 'Precipitation',
            type: 'bar',
            yAxisIndex: 1,
            data: [
              2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0,
              2.3,
            ],
          },
          {
            name: 'Temperature',
            type: 'line',
            yAxisIndex: 2,
            data: [
              2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2,
            ],
          },
        ],
      },
      optionMian: {
        legend: {
          top: 'bottom',
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        series: [
          {
            name: 'Nightingale Chart',
            type: 'pie',
            radius: [50, 250],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 8,
            },
            data: [
              { value: 40, name: 'rose 1' },
              { value: 38, name: 'rose 2' },
              { value: 32, name: 'rose 3' },
              { value: 30, name: 'rose 4' },
              { value: 28, name: 'rose 5' },
              { value: 26, name: 'rose 6' },
              { value: 22, name: 'rose 7' },
              { value: 18, name: 'rose 8' },
            ],
          },
        ],
      },
      optionBroken: {
        color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
        title: {
          text: 'Gradient Stacked Area Chart',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985',
            },
          },
        },
        legend: {
          data: ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5'],
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          },
        ],
        yAxis: [
          {
            type: 'value',
          },
        ],
        series: [
          {
            name: 'Line 1',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(128, 255, 165)',
                },
                {
                  offset: 1,
                  color: 'rgb(1, 191, 236)',
                },
              ]),
            },
            emphasis: {
              focus: 'series',
            },
            data: [140, 232, 101, 264, 90, 340, 250],
          },
          {
            name: 'Line 2',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(0, 221, 255)',
                },
                {
                  offset: 1,
                  color: 'rgb(77, 119, 255)',
                },
              ]),
            },
            emphasis: {
              focus: 'series',
            },
            data: [120, 282, 111, 234, 220, 340, 310],
          },
          {
            name: 'Line 3',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(55, 162, 255)',
                },
                {
                  offset: 1,
                  color: 'rgb(116, 21, 219)',
                },
              ]),
            },
            emphasis: {
              focus: 'series',
            },
            data: [320, 132, 201, 334, 190, 130, 220],
          },
          {
            name: 'Line 4',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(255, 0, 135)',
                },
                {
                  offset: 1,
                  color: 'rgb(135, 0, 157)',
                },
              ]),
            },
            emphasis: {
              focus: 'series',
            },
            data: [220, 402, 231, 134, 190, 230, 120],
          },
          {
            name: 'Line 5',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
              width: 0,
            },
            showSymbol: false,
            label: {
              show: true,
              position: 'top',
            },
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(255, 191, 0)',
                },
                {
                  offset: 1,
                  color: 'rgb(224, 62, 76)',
                },
              ]),
            },
            emphasis: {
              focus: 'series',
            },
            data: [220, 302, 181, 234, 210, 290, 150],
          },
        ],
      },
    })
    const bsWrapper: any = ref<HTMLElement>()
    const chartDom: any = ref<HTMLElement>()
    const chartBroken: any = ref<HTMLElement>()
    const totalmount = reactive([
      {
        name: '用户总量',
        mount: 400,
      },
      {
        name: '购买量',
        mount: 600,
      },
      {
        name: '访问人数',
        mount: 80,
      },
      {
        name: '信息总数',
        mount: 100,
      },
      {
        name: '今日活动量',
        mount: 232,
      },
      {
        name: '离开日期',
        mount: 60,
      },
    ])
    const newsArr = reactive([
      '呷哺呷哺关停88家门店',
      '互联网红海,失业人数剧增',
      '大学生脱不下的长衫,到底是哪里出了问题?',
      '内卷的时代,不卷我们如何生存',
      '回村创业,回村啃老?我们到底在做什么',
      '当生存环境变得不适合繁育后代,动物就会停止',
      '可能我们以后想要成为怎样的人才',
    ])
    const imgArr = ref([
      { url: img1, title: '可爱' },
      { url: img2, title: '浪漫' },
      { url: img3, title: '优秀' },
      { url: img4, title: '快乐' },
    ])
    // 柱状图
    const initeCharts = () => {
      bsWrapper.value = document.getElementById('myChart')
      let myChart = echarts.init(bsWrapper.value)
      // 绘制图表
      myChart.setOption(state.option)
    }
    // 饼状图
    const initeCircleCharts = () => {
      chartDom.value = document.getElementById('main')
      let myCircleChart = echarts.init(chartDom.value)
      // 绘制图表
      myCircleChart.setOption(state.optionMian)
    }
    // 折线图
    const initeBrokenCharts = () => {
      chartBroken.value = document.getElementById('broken')
      let myBrokenChart = echarts.init(chartBroken.value)
      // 绘制图表
      myBrokenChart.setOption(state.optionBroken)
    }
    onMounted(() => {
      initeCharts()
      initeCircleCharts()
      initeBrokenCharts()
    })
    return {
      ...state,
      totalmount,
      newsArr,
      imgArr,
    }
  },
})
</script>
<style lang="scss" scoped>
.analysis-warp {
  overflow-x: hidden;
  width: 100wh;
  >div {
    margin-bottom: 20px;
  }

  .analysis-top-warp {
    display: flex;
    justify-content: space-between;

    >div {
      background: #fff;
      padding: 20px;

      &:last-child {
        margin-left: 20px;
        flex: 1;
      }
    }
  }

  .analysis-bottom-warp {
    display: flex;
  }
}

.bottom-canvas {
  background: #fff;
  padding: 20px;
}

.data-warp {
  display: flex;

  >div {
    height: 200px;
    &:first-child {
      flex: 1;
      background: #fff;
    }

    &:nth-child(2) {
      flex: 1;
      margin-left: 20px;
      background: #fff;
      padding: 0;
    }

    &:last-child {
      width: 400px;
      margin-left: 20px;
      background: #fff;
    }
  }

  .news-data-warp {
    overflow: hidden;
    padding: 20px;
    ul {
      margin-top: 24px;
    }

    // border: 1px solid #eaeaea;
    li {
      float: left;
      width: 33.33%;
      height: 40px;
      margin-bottom: 20px;
      // border-right: 1px solid #eaeaea;
      // border-bottom: 1px solid #eaeaea;

      span {
        font-size: 18px;

        &:hover {
          color: rgba(76, 171, 239, 0.544);
        }

        font-weight: bold;
        cursor: pointer;
      }
    }
  }
}

.news-notice-warp {
  line-height: 24px;
  padding: 20px;
}
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
  text-align: center;
}
.el-carousel__item img {
  text-align: center;
  background-position: center;
  width: 100%;
  overflow: hidden;
  padding: 0;
}

</style>
