<template>
  <section class="works-warp">
    <el-card class="day-works-warp">
      <div class="day-works-info">
        <p>大家好,新的一天,要努力学习,充实自己,做快乐的自己.</p>
      </div>
      <div class="day-works-waiting">
        <p>待办: 30</p>
        <p>消息: 50</p>
        <p>项目数:2</p>
      </div>
    </el-card>
    <div class="card-warp">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>新闻动态</span>
            <el-button class="button" text>更多</el-button>
          </div>
        </template>
        <div v-for="o in 4" :key="o" class="text item">{{ '我是新的消息通知,每一天都要加油哦,生命在于努力' + o }}</div>
      </el-card>
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>飞翔的鸟</span>
            <el-button class="button" text>更多</el-button>
          </div>
        </template>
        <div v-for="o in 4" :key="o" class="text item">{{ '过去是时间的累积啊,可我们什么都没有' + o }}</div>
      </el-card>
    </div>
    <div class="demo-progress">
    <el-progress :percentage="50" :indeterminate="true" />
    <el-progress :percentage="100" :format="format" :indeterminate="true" />
    <el-progress
      :percentage="100"
      status="success"
      :indeterminate="true"
      :duration="5"
    />
    <el-progress
      :percentage="100"
      status="warning"
      :indeterminate="true"
      :duration="1"
    />
    <el-progress :percentage="50" status="exception" :indeterminate="true" />
  </div>

  </section>
</template>
<script lang="ts" setup>
const format = (percentage:Number) => (percentage === 100 ? 'Full' : `${percentage}%`)
</script>
<style lang="scss" scoped>
.demo-progress .el-progress--line {
  margin-bottom: 15px;
  width: 350px;
}
.demo-progress {
  margin-top: 30px;
}
.works-warp {
  .day-works-warp {
    height: 80px;
    border: 1px solid #eaeaea;

    width: 100%;

    :deep .el-card__body {
      width: 100%;
      display: flex;
      justify-content: space-around;

      .day-works-waiting {
        display: flex;
        justify-content: space-around;
      }
    }

  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.card-warp {
  margin-top: 40px;
  display: flex;
  justify-content: space-around;
}

.box-card {
  width: 480px;
}
</style>