<template>
  <section class="card-warp">
    <section class="basic-card">
      <div class="card-box">
        <p>基础卡片</p>
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>Card name</span>
              <el-button class="button" text>Operation button</el-button>
            </div>
          </template>
          <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
        </el-card>
      </div>
      <div class="card-box">
        <p>简单卡片</p>
        <el-card class="box-card">
          <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
        </el-card>
      </div>
    </section>
    <section class="basic-card">
      <div class="card-box">
        <p>有图片内容的卡片</p>
        <el-row style="width:100%;">
          <el-col v-for="(o, index) in 1" :key="o" :span="24" :offset="index > 0 ? 2 : 0">
            <el-card :body-style="{ padding: '0px' }">
              <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
                class="image" />
              <div style="padding: 14px">
                <span>Yummy hamburger</span>
                <div class="bottom">
                  <time class="time">{{ currentDate }}</time>
                  <el-button text class="button">Operating</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <div class="card-box">
        <p>带有阴影效果的卡片</p>
        <el-row :gutter="12">
          <el-col :span="24">
            <el-card shadow="always"> Always </el-card>
          </el-col>
          <el-col :span="24">
            <el-card shadow="hover"> Hover </el-card>
          </el-col>
          <el-col :span="24">
            <el-card shadow="never"> Never </el-card>
          </el-col>
        </el-row>
      </div>
    </section>

  </section>
</template>
<style>
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

.box-card {
  width: 480px;
}

.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
}

.basic-card {
  display: flex;
  justify-content: space-around;
}

.card-box {
  text-align: left;
  width: 480px;
}
</style>

<script lang="ts" setup>
import { ref } from 'vue'
const currentDate = ref(new Date())
</script>