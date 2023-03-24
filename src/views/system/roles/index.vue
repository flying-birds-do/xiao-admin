<template>
 <section class="table-warp">
    <SearchBar @onSubmit="onSubmit" @resetSubmit="resetSubmit"></SearchBar>
    <el-row class="top-button-warp">
      <el-button type="primary" @click="newAdd">新建角色</el-button>
    </el-row>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="角色编号" prop="id" />
      <el-table-column label="角色名称" prop="storeName" />
      <el-table-column label="权限字符" prop="status">
        <template #default="scope">
          {{ scope.row?.status === '1' ? '出库中' : " 成功" }}
        </template>
      </el-table-column>
      <el-table-column label="显示顺序" prop="origin" />
      <el-table-column label="创建时间">
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
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
     <xyDialog :dialogVisible="dialogVisible" @cancel="cancel" @sure="sure" :Tips="title">
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="80px" class="demo-ruleForm"
         status-icon>
        <el-form-item label="角色名称" prop="name">
          <el-input v-model.number="ruleForm.id"  placeholder="请输入角色名称"/>
        </el-form-item>
        <el-form-item label="权限字符" prop="storeName">
          <el-input v-model="ruleForm.storeName" placeholder="请输入权限字符"/>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="ruleForm.status" placeholder="请选择状态">
            <el-option label="正常" value="1" />
            <el-option label="停用" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="desc" >
          <el-input v-model="ruleForm.origin" type="textarea"  placeholder="请输入备注"/>
        </el-form-item>
      </el-form>
    </xyDialog>
  </section>
</template>
<script lang="ts" setup>
import SearchBar from './components/searchBar/index.vue'
import xyDialog from '@/components/XDialog/index.vue'
import { ref, reactive } from 'vue'
import { Timer } from '@element-plus/icons-vue'
import { tr } from 'element-plus/es/locale';
import { ElMessage, ElMessageBox, FormInstance, FormRules, Action } from 'element-plus'

const dialogVisible = ref(false);
const row = reactive({})
const title = ref('编辑角色')
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
  id: [
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
const resetSubmit = () => {
  console.log(122)
}
const onSubmit = (row: any) => {
  console.log(row)
}
const newAdd = () => {
  ruleForm = {}
  dialogVisible.value = true
  title.value = '新建角色'

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
<style lang="scss">
.demo-ruleForm .el-select {
  width: 100%;
}

.demo-ruleForm .el-input__wrapper {
  box-sizing: border-box;
  width: 100%;
}

.demo-ruleForm .el-form-item,
.el-form-item__content {
  width: 100%;
}
</style>
