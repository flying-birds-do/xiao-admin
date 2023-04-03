<template>
  <section class="table-warp">
    <SearchBar id="commodityInquiry1" ref="conditions" :search-conditions="searchList" :is-query="true" :is-reset="true"
      :is-expand="false" @screenChange="screenChange" />
    <div class="table-pub-card">
      <el-table :data="tableData" style="width: 100%" class="table-style-warp">
        <el-table-column label="日志编号" prop="id" />
        <el-table-column label="操作人员" prop="name" />
        <el-table-column label="状态显示" prop="show" />
        <el-table-column label="时间" prop="date" />
        <el-table-column label="操作地点" prop="place" />

      </el-table>
    </div>
  </section>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox, FormInstance, FormRules, Action } from 'element-plus'
const searchList = ref([
  {
    label: '操作人员',
    prop: 'name',
    type: 'input',
    props: {
      placeholder: '操作人员',
    },
    list: [],
  },
  {
    label: '状态',
    prop: 'show',
    type: 'select',
    props: {
      placeholder: '状态',
      list: [{ label: '正常', value: "正常" }, { label: '异常', value: "异常" }],
    },

  },
  {
    label: '时间',
    prop: 'date',
    type: 'datetimerange',
    props: { clearable: true, 'value-format': 'yyyy-MM-dd HH:mm:ss' }
  }
])
// 将查询条件上移
const screenChange = function (conditions) {
  console.log(conditions)
  // searchValue = conditions
  tableData = tableData.reverse()
}
let tableData: any[] = reactive([
  {
    id: '1',
    name: 'admin',
    path: '小鱼仔',
    show: '显示',
    date: '2023-04-03',
    place: '北京',
  },
  {
    id: '1',
    name: '张三',
    show: '显示',
    date: '2023-01-13',
    place: '上海',
  },
  {
    id: '2',
    name: '温昂',
    show: '显示',
    date: '2023-04-03',
    place: '苏州',
  },
  {
    id: '3',
    name: 'dashboard',
    show: '正常',
    date: '2023-04-03',
    place: '北京',
  },
  {
    id: '4',
    name: 'admin',
    show: '异常',
    date: '2023-04-03',
    place: '北京',
  },
  {
    id: '5',
    name: 'dsde',
    show: '显示',
    date: '2023-03-24',
    place: '上海',
  }

])
</script>
<style lang="scss" scoped>
.top-button-warp {
  margin-bottom: 14px;
}
</style>
<style>
.el-select {
  width: 100%;
}

.el-input__wrapper {
  box-sizing: border-box;
  width: 100%;
}

.table-style-warp .el-form-item,
.table-style-warp .el-form-item__content {
  width: 100%;
}
</style>
