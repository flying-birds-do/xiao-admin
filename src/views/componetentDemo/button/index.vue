<template>
  <section class="button-warp">
    <el-card class="box-card">
      <p>基础用法</p>
      <el-row class="mb-4">
        <el-button>Default</el-button>
        <el-button type="primary">Primary</el-button>
        <el-button type="success">Success</el-button>
        <el-button type="info">Info</el-button>
        <el-button type="warning">Warning</el-button>
        <el-button type="danger">Danger</el-button>
      </el-row>

      <el-row class="mb-4">
        <el-button plain>Plain</el-button>
        <el-button type="primary" plain>Primary</el-button>
        <el-button type="success" plain>Success</el-button>
        <el-button type="info" plain>Info</el-button>
        <el-button type="warning" plain>Warning</el-button>
        <el-button type="danger" plain>Danger</el-button>
      </el-row>

      <el-row class="mb-4">
        <el-button round>Round</el-button>
        <el-button type="primary" round>Primary</el-button>
        <el-button type="success" round>Success</el-button>
        <el-button type="info" round>Info</el-button>
        <el-button type="warning" round>Warning</el-button>
        <el-button type="danger" round>Danger</el-button>
      </el-row>

      <el-row class="mb-4">
        <el-button :icon="Search" circle />
        <el-button type="primary" :icon="Edit" circle />
        <el-button type="success" :icon="Check" circle />
        <el-button type="info" :icon="Message" circle />
        <el-button type="warning" :icon="Star" circle />
        <el-button type="danger" :icon="Delete" circle />
      </el-row>
    </el-card>
    <el-card class="box-card">
      <p>禁用状态</p>
     <el-row class="mb-4">
    <el-button disabled>Default</el-button>
    <el-button type="primary" disabled>Primary</el-button>
    <el-button type="success" disabled>Success</el-button>
    <el-button type="info" disabled>Info</el-button>
    <el-button type="warning" disabled>Warning</el-button>
    <el-button type="danger" disabled>Danger</el-button>
  </el-row>

  <el-row>
    <el-button plain disabled>Plain</el-button>
    <el-button type="primary" plain disabled>Primary</el-button>
    <el-button type="success" plain disabled>Success</el-button>
    <el-button type="info" plain disabled>Info</el-button>
    <el-button type="warning" plain disabled>Warning</el-button>
    <el-button type="danger" plain disabled>Danger</el-button>
  </el-row>
    </el-card>
    <el-card class="box-card">
      <p>链接按钮</p>
     <el-row class="mb-4">
    <el-button disabled>Default</el-button>
    <el-button type="primary" disabled>Primary</el-button>
    <el-button type="success" disabled>Success</el-button>
    <el-button type="info" disabled>Info</el-button>
    <el-button type="warning" disabled>Warning</el-button>
    <el-button type="danger" disabled>Danger</el-button>
  </el-row>
  </el-card>
  <el-card>
    <p>文字按钮</p>
  <div class="flex justify-space-between mb-4 flex-wrap gap-4">
    <el-button
      v-for="button in buttons"
      :key="button.text"
      :type="button.type"
      text
      >{{ button.text }}</el-button
    >
  </div>

  <p>Background color always on</p>
  <div class="flex justify-space-between mb-4 flex-wrap gap-4">
    <el-button
      v-for="button in buttons"
      :key="button.text"
      :type="button.type"
      text
      bg
      >{{ button.text }}</el-button
    >
  </div>

  <p>Disabled text button</p>
  <div class="flex justify-space-between flex-wrap gap-4">
    <el-button
      v-for="button in buttons"
      :key="button.text"
      :type="button.type"
      text
      disabled
      >{{ button.text }}</el-button
    >
  </div>
  </el-card>
    
  </section>
</template>

<script lang="ts" setup>
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from '@element-plus/icons-vue'
const buttons = [
  { type: '', text: 'plain' },
  { type: 'primary', text: 'primary' },
  { type: 'success', text: 'success' },
  { type: 'info', text: 'info' },
  { type: 'warning', text: 'warning' },
  { type: 'danger', text: 'danger' },
] as const
</script>

<style lang="scss" scoped>
.mb-4 {
  margin-bottom: 14px;
}
.button-warp {
  display: flex;
.el-button {
  margin-bottom: 10px;
}

}
</style>

<script lang="ts" setup></script>