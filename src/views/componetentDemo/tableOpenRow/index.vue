<template>
  <div class="p-5">
    <el-card>
      <template #header>
        <span>展开行</span>
      </template>
      <Table :columns="tableColumn" :table-data="tableData" @pagination-change="handlePaginationChange" >
        <!-- 展开行插槽内容 -->
        <!-- <template #expand="{ row }">
                    <div class="p-5">
                        <p>名字： {{ row.name }}</p>
                        <p>地址： {{ row.address }}</p>
                        <p>日期： {{ row.date }}</p>
                    </div>
                </template> -->
        <!-- 普通列插槽内容 -->
        <template #address="{ row }">
          <span>演示slot使用--->{{ row.address }}</span>
        </template>
      </Table>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import { h,reactive } from 'vue'
import {useRoute, useRouter} from 'vue-router'
import Table from '@/components/XTable/index.vue'
// 本项目Table组件自动引入，如复制此代码，需根据路径引入Table组件后使用
interface User {
  date: number
  name: string
  address: string
}
const route = useRoute()
const router = useRouter()
const renderExpandContent = (row: User) =>
  h('div', { class: 'p-5' }, [
    h('p', `名字：${row.name}`),
    h('p', `地址：${row.address}`),
    h('p', `日期：${row.date}`)
  ])
const tableColumn: Table.Column[] = [
  // 使用render函数渲染展开行的内容
  { type: 'expand', width: '50', render: ({ row }) => renderExpandContent(row) },
  // 使用expand插槽自定义展开行的内容。注意：如果使用展开行的插槽， slot名字必须是 ‘expand’。
  // { type: 'expand', width: '50', slot: 'expand' },
  { type: 'index', width: '50', label: 'No.' },
  { prop: 'name', label: '名字', sortable: true },
  { prop: 'date', label: '日期', type: 'date' },
  { prop: 'address', label: '地址', slot: 'address', showOverflowTooltip: true },
  {
    width: '180',
    label: '操作',
    buttons: [
      { name: '编辑', type: 'success', command: 'edit' },
      { name: '删除', type: 'danger', command: 'delete' }
    ]
  }
]
const tableData: User[] = [
  {
    date: 1660737564000,
    name: '佘太君',
    address: '上海市普陀区金沙江路 1516 弄'
  },
  {
    date: 1462291200000,
    name: '王小虎',
    address: '上海市普陀区金沙江路 1517 弄'
  },
  {
    date: 1462032000000,
    name: '王小帅',
    address: '上海市普陀区金沙江路 1519 弄'
  },
  {
    date: 1462204800000,
    name: '王小呆',
    address: '上海市普陀区金沙江路 1516 弄'
  }
]
interface State {
  options: Table.Options
}
const state = reactive<State>({
  tableDemoList: [],
  options: { showPagination: true, height: 600 }
})

// pageSize或者currentPage改变触发
const handlePaginationChange = (page: number, pageSize: number) => {
  router.push({
    path: route.path,
    query: {
      page,
      pageSize
    }
  })
}
</script>
