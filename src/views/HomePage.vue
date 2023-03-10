<template>
  <div class="container">
     <el-row>
    <el-col :span="12">
      <el-input v-model="SearchVal" placeholder="Please input" class="input-with-select" @keyup.enter="enterSearch">
          <template #append>
        <el-button :icon="Search"  @click = "enterSearch"/>
      </template>
      </el-input>
    </el-col>
    <el-col :span="12">
    <el-button type="primary" @click = "handleAdd">add</el-button>
    <el-button type="danger" @click = "onDel">delete</el-button>
    </el-col>
  </el-row>
   <el-table :data="tableData" style="width: 100%">
    <el-table-column type="selection" width="55" />
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
    <el-table-column prop="order" label="xf" />
     <el-table-column label="Operations">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
          >Edit</el-button
        >
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >Delete</el-button
        >
      </template>
    </el-table-column>
  </el-table>
    <el-pagination background layout="prev, pager, next" 
      :total="1000"
      class="pagination-warp"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <add :isShow="isShow" :info="info" :title="title" @closeAdd="closeAdd" @sucess="sucess"></add>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { Search } from '@element-plus/icons-vue'
import add from '../components/add.vue'
import User from '../class/User';
import { ElMessage, ElMessageBox } from 'element-plus'
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    order:'1'
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
     order:'2'
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
     order:'3'
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
     order:'4'
  },
]
const SearchVal = ref('')
const title = ref('新增')
interface UserInfo {
  date: string
  name: string
  address: string
}
const isShow = ref(false)
const info = ref<User>(new User())
const enterSearch = () => {
}
const onDel = () => {
}
const closeAdd = () => {
  isShow.value = false
  info.value  = new User()
}
const sucess = (message:string) => {
  isShow.value = false
  info.value = new User()
  console.log(message)
  ElMessage({
    message: message,
    type: 'success',
  })
}
const handleAdd = () => {
  title.value = '新增'
  isShow.value = true
}
const handleEdit = (index: number, row: User) => {
  console.log(index, row)
  info.value = row
  title.value = '编辑'
  isShow.value = true
}
const handleDelete = (index: number, row: UserInfo) => {
  console.log(index, row)
}
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}
</script>
<style lang="scss" scoped>
.pagination-warp {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 20px;
}
</style>