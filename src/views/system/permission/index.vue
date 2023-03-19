<template>
  <section class="table-warp">
    <el-row class="top-button-warp">
      <el-button type="primary" @click="newAdd">新建权限{{ counter.count }}</el-button>
    </el-row>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="商品id" prop="id" />
      <el-table-column label="仓库名称" prop="storeName" />
      <el-table-column label="商品状态" prop="status">
        <template #default="scope">
          {{ scope.row?.status === '1' ? '出库中' : " 成功" }}
        </template>
      </el-table-column>
      <el-table-column label="商品源" prop="origin" />
      <el-table-column label="日期">
        <template #default="scope" v-model.n>
          <div style="display: flex; align-items: center">
            <el-icon>
              <timer />
            </el-icon>
            <span style="margin-left: 10px">{{ scope.row?.date }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <xyDialog :dialogVisible="dialogVisible" @cancel="cancel" @sure="sure" :Tips="title">
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="80px" class="demo-ruleForm" status-icon>
        <el-form-item label="商品id" prop="name">
          <el-input v-model.number="ruleForm.id" placeholder="请输入商品id" />
        </el-form-item>
        <el-form-item label="仓库名称" prop="storeName">
          <el-input v-model="ruleForm.storeName" placeholder="请输入仓库名称" />
        </el-form-item>
        <el-form-item label="商品状态" prop="status">
          <el-select v-model="ruleForm.status" placeholder="请选择商品状态">
            <el-option label="出库中" value="1" />
            <el-option label="成功" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="日期" required prop="date1">
          <el-date-picker v-model="ruleForm.date" type="date" label="Pick a date" placeholder="请选择日期"
            style="width: 100%" />
        </el-form-item>
        <el-form-item label="商品源" prop="desc">
          <el-input v-model="ruleForm.origin" type="textarea" placeholder="请输入商品源" />
        </el-form-item>
      </el-form>
    </xyDialog>
  </section>
</template>
<script lang="ts" setup>
import xyDialog from '@/components/xDolog/index.vue'
import { ref, reactive } from 'vue'
import { Timer } from '@element-plus/icons-vue'
import { tr } from 'element-plus/es/locale';
import { ElMessage, ElMessageBox, FormInstance, FormRules, Action } from 'element-plus'
import { useCounterStore } from '@/store/counter.js'
const counter = useCounterStore()
counter.count++
// 带自动补全 ✨
counter.$patch({ count: counter.count + 10 })
// 或使用 action 代替
counter.increment()
const dialogVisible = ref(false);
const row = reactive({})
const title = ref('编辑')
interface User {
  id: number;
  storeId: number;
  storeName: string;
  status: number;
  origin: string;
  phone: string;
  concat: string;
  date: string;
  createTime: string;
  storeCount: number;

}
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
let ruleForm: any = reactive({
  id: 1,
  storeId: 2,
  storeName: '',
  status: '',
  origin: '',
  phone: '',
  concat: '',
  date: '',
  createTime: '',
  storeCount: ''
})

const rules = reactive<FormRules>({
  storeName: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
  ],
  status: [
    {
      required: true,
      message: 'Please select Activity zone',
      trigger: 'blur',
    },
  ],
  origin: [
    {
      required: true,
      message: 'Please select Activity count',
      trigger: 'change',
    },
  ],
  date: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a date',
      trigger: 'change',
    },
  ],
  phone: [
    {
      type: 'array',
      required: true,
      message: 'Please select at least one activity type',
      trigger: 'change',
    },
  ],
  concat: [
    {
      required: true,
      message: 'Please select activity resource',
      trigger: 'change',
    },
  ]
})

const cancel = () => {
  ruleForm = {

  }
  dialogVisible.value = false
}
const newAdd = () => {
  ruleForm = {

  }
  dialogVisible.value = true
  title.value = '新建'

}
const handleEdit = (index: number, row: User) => {
  dialogVisible.value = true
  ruleForm = row

}
const handleDelete = (index: number, row: User) => {
  ElMessageBox.confirm(
    '确定删除当前这条数据么?',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      tableData.splice(index, 1)
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消',
      })
    })

}
const sure = () => {
  dialogVisible.value = false
  tableData.splice(0, 0, ruleForm)
}
const tableData: any[] = reactive([
  {
    id: 1,
    storeId: 1,
    date: '2016-05-03',
    storeName: '王小虎',
    status: '1',
    origin: '上海市普陀区金沙江路 1518 弄',
    phone: '15117960415',
    concat: '小鱼仔',
    createTime: '2022-1-15',
    storeCount: 12
  },
  {
    id: 1,
    storeId: 2,
    date: '2016-05-02',
    storeName: '王小虎',
    status: '2',
    origin: '上海市普陀区金沙江路 1518 弄',
    phone: '15117960415',
    concat: '小鱼仔',
    createTime: '2022-1-15',
    storeCount: 13
  },
  {
    id: 2,
    storeId: 3,
    date: '2016-05-04',
    storeName: '王小虎',
    status: '3',
    origin: '上海市普陀区金沙江路 1518 弄',
    phone: '15117960415',
    concat: '小鱼仔',
    createTime: '2022-1-15',
    storeCount: 2
  },
  {
    id: 2,
    storeId: 4,
    date: '2016-05-01',
    storeName: '王小虎',
    status: '4',
    origin: '上海市普陀区金沙江路 1518 弄',
    phone: '15117960415',
    concat: '小鱼仔',
    createTime: '2022-1-15',
    storeCount: 5
  },
  {
    id: 3,
    storeId: 5,
    date: '2016-05-08',
    storeName: '王小虎',
    status: '5',
    origin: '上海市普陀区金沙江路 1518 弄',
    phone: '15117960415',
    concat: '小鱼仔',
    createTime: '2022-1-15',
    storeCount: 1
  },
  {
    id: 4,
    storeId: 6,
    date: '2016-05-06',
    storeName: '王小虎',
    status: '6',
    origin: '上海市普陀区金沙江路 1518 弄',
    phone: '15117960415',
    concat: '小鱼仔',
    createTime: '2022-1-15',
    storeCount: 1
  },
  {
    id: 4,
    storeId: 7,
    date: '2016-05-07',
    storeName: '王小虎',
    status: '7',
    origin: '上海市普陀区金沙江路 1518 弄',
    phone: '15117960415',
    concat: '小鱼仔',
    createTime: '2022-1-15',
    storeCount: 1
  },
  {
    id: 4,
    storeId: 7,
    date: '2016-05-07',
    storeName: '王小虎',
    status: '7',
    origin: '上海市普陀区金沙江路 1518 弄',
    phone: '15117960415',
    concat: '小鱼仔',
    createTime: '2022-1-15',
    storeCount: 1
  },
  {
    id: 4,
    storeId: 7,
    date: '2016-05-07',
    storeName: '王小虎',
    status: '2',
    origin: '上海市普陀区金沙江路 1518 弄',
    phone: '15117960415',
    concat: '小鱼仔',
    createTime: '2022-1-15',
    storeCount: 1
  },
  {
    id: 4,
    storeId: 7,
    date: '2016-05-07',
    storeName: '王小虎',
    status: '7',
    origin: '上海市普陀区金沙江路 1518 弄',
    phone: '15117960415',
    concat: '小鱼仔',
    createTime: '2022-1-15',
    storeCount: 1
  },
  {
    id: 4,
    storeId: 7,
    date: '2016-05-07',
    storeName: '王小虎',
    status: '7',
    origin: '上海市普陀区金沙江路 1518 弄',
    phone: '15117960415',
    concat: '小鱼仔',
    createTime: '2022-1-15',
    storeCount: 1
  },
  {
    id: 4,
    storeId: 7,
    date: '2016-05-07',
    storeName: '王小虎',
    status: '7',
    origin: '上海市普陀区金沙江路 1518 弄',
    phone: '15117960415',
    concat: '小鱼仔',
    createTime: '2022-1-15',
    storeCount: 1
  }
])
</script>
<style lang="scss" scoped>
.top-button-warp {
  margin-bottom: 30px;
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

.el-form-item,
.el-form-item__content {
  width: 100%;
}
</style>
