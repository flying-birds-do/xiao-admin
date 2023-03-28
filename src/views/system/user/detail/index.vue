<template>
  <section class="detail-warp">
    <XBreadCrumbs />
    <div class="user-info-warp">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content">
            <h3>用户编号:</h3>
            <p>11243343</p>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <h3>用户名:</h3>
            <p>张三</p>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <h3>用户昵称:</h3>
            <p>小小子一支笔</p>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <h3>部门:</h3>
            <p>信息系统事业部</p>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content">
            <h3>手机号</h3>
            <p>15117960415</p>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <h3>状态:</h3>
            <p>正常</p>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <h3>创建时间: </h3>
            <p>2023-3-28</p>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <h3>备注信息: </h3>
            <p class="more-content">生活终究还是要靠自我成长的.生活终究还是要靠自我成长的.生活终究还是要靠自我成长的.</p>
          </div>
        </el-col>
      </el-row>
    </div>
      <div class="mt20 mb20">
      <el-steps :active="active" finish-status="success">
        <el-step title="创建账号" />
        <el-step title="审核中" />
        <el-step title="审核通过" />
      </el-steps>
      <!-- <el-button style="margin-top: 12px" @click="next">Next step</el-button> -->
   </div>
     <el-table :data="tableData" border style="width: 100%" :cell-style="{ textAlign: 'center' }">
      <el-table-column prop="date" label="时间" width="180" header-align="center"/>
      <el-table-column prop="name" label="姓名" width="180" header-align="center"/>
      <el-table-column prop="address" label="地址" header-align="center"/>
      <el-table-column prop="name" label="名称" header-align="center"/>
        <el-table-column prop="date" label="时间" header-align="center"/>
        <el-table-column prop="address" label="备注" header-align="center"/>
  </el-table>
  </section>
</template>
<script setup>
import { ref } from 'vue'
import XBreadCrumbs from '@/components/XBreadCrumbs/index.vue'
import { CaretBottom } from '@element-plus/icons-vue'
import { provide } from 'vue'
const active = ref(3)
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
// const next = () => {
//   if (active.value++ > 2) active.value = 0
// }
const BreadList = ref([
  {
    path: '/',
    title: '首页'
  },
  {
    path: '/system/user',
    title: '系统管理'
  },
  {
    path: '/system/user/detail',
    title: '详情'
  }
])
provide('BreadList', BreadList)

</script>
<style scoped lang="scss">
.user-info-warp {
  margin-top: 40px;

  .grid-content {
    overflow: hidden;

    h3 {
      float: left;
      font-weight: normal;
      margin: 0;
      padding: 0;

    }

    p {
      float: left;
      margin: 0;
      padding: 0;
      text-align: left;

      &.more-content {
        padding-left: 100px;
        float: none;
      }

    }
  }
}

.el-row {
  margin-bottom: 30px;
}

.detail-warp {
  margin-top: 20px;
}

.item {
  margin-top: 10px;
  margin-right: 40px;
}

.el-dropdown {
  margin-top: 1.1rem;
}
.mt20 {
  margin-top: 20px;
}
.mb20 {
  margin-bottom: 20px;
}
</style>