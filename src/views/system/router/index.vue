<template>
  <section class="table-warp">
    <SearchBar id="commodityInquiry1" ref="conditions" :search-conditions="searchList" :is-query="true" :is-reset="true"
      :is-expand="true" @screenChange="screenChange" />
    <el-row class="top-button-warp">
      <el-button type="primary" @click="newAdd">新建路由</el-button>
    </el-row>
    <div class="table-pub-card">
    <el-table :data="tableData" style="width: 100%" class="table-style-warp">
      <el-table-column label="路由名称" prop="name" />
      <el-table-column label="是否显示" prop="show">
      </el-table-column>
      <el-table-column label="路由地址" prop="path" />
       <el-table-column label="所属上级" prop="parent" />
      <el-table-column label="高亮显示" prop="active" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
    <xyDialog :dialogVisible="dialogVisible" @cancel="cancel" @sure="sure" :Tips="title">
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="80px" class="demo-ruleForm" status-icon>
        <el-form-item label="路由名称" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入路由名称" />
        </el-form-item>
        <el-form-item label="所属上级" prop="partment">
          <el-select v-model="ruleForm.parent" placeholder="选择所属上级">
            <el-option label="顶级" value="顶级" />
            <el-option label="组件示例" value="组件示例" />
            <el-option label="系统管理" value="系统管理" />
            <el-option label="相关文档" value="相关文档" />
            <el-option label="插件示例" value="插件示例" />
            <el-option label="插件示例" value="插件示例" />
            <el-option label="仪表盘" value="仪表盘" />
            <el-option label="关于我们" value="关于我们" />
          </el-select>
        </el-form-item>
        <el-form-item label="路由地址" prop="path">
          <el-input v-model="ruleForm.path" placeholder="请输入路由地址" />
        </el-form-item>
        <el-form-item label="是否显示" prop="show">
          <el-select v-model="ruleForm.show" placeholder="是否显示在左侧菜单">
            <el-option label="是" value="1" />
            <el-option label="否" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="激活路由" prop="active">
          <el-input v-model="ruleForm.active" placeholder="请输入激活路由地址" />
        </el-form-item>
      </el-form>
    </xyDialog>
  </section>
</template>
<script lang="ts" setup>
import xyDialog from '@/components/XDialog/index.vue'
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox, FormInstance, FormRules, Action } from 'element-plus'
const searchList = ref([
  {
    label: '路由名称',
    prop: 'name',
    type: 'input',
    props: {
      placeholder: '路由名称',
    },
    list: [],
  },
  {
    label: '路由地址',
    prop: 'path',
    type: 'input',
    props: {
      placeholder: '路由地址',
    },
    list: [],
  },
  {
    label: '是否显示',
    prop: 'show',
    type: 'select',
    props: {
      placeholder: '请选择',
        list: [
      { label: '是', value: '1' },
       {label:'否',value:'2'}
    ],
    },
  },
  {
    label: '激活路由',
    prop: 'active',
    type: 'input',
    props: {
      placeholder: '激活路由',
    },
    list: [],
  },
])
// 将查询条件上移
const screenChange = function (conditions) {
  console.log(conditions)
  // searchValue = conditions
 tableData =  tableData.reverse()
}
const dialogVisible = ref(false);
const row = reactive({})
const title = ref('编辑')
interface User {
  name: string
  path: string
  show: string
  active: string
  parent:string

}
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
let ruleForm: any = ref({
  name: '',
  path: '',
  show: '',
  active: '',
  parent:''
})

const rules = reactive<FormRules>({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
  ],
  show: [
    {
      required: true,
      message: 'Please select Activity zone',
      trigger: 'blur',
    },
  ],
  path: [
    {
      required: true,
      message: 'Please select Activity count',
      trigger: 'change',
    },
  ],
  active: [
    {
      required: true,
      message: 'Please select activity resource',
      trigger: 'change',
    },
  ]
})

const cancel = () => {
  ruleForm.value = {
  name: '',
  path: '',
  show: '',
  active: '',
  parent:''
  }
  dialogVisible.value = false
}
const newAdd = () => {
  ruleForm.value = {
  name: '',
  path: '',
  show: '',
  active: '',
  parent:''
  }
  dialogVisible.value = true
  title.value = '新建'

}
const handleEdit = (index: number, row: User) => {
  dialogVisible.value = true
  ruleForm.value = row
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
  tableData.splice(0, 0, ruleForm.value)
}
let tableData: any[] = reactive([
  {
    name: 'dashboard',
    path: '小鱼仔',
    show: '显示',
    active: '/stystem/roles',
    parent:'顶级',
  },
  {
    name: '组件示例',
    path: '小鱼仔',
    show: '显示',
    active: '/stystem/roles',
      parent:'插件示例',
  },
  {
    name: '系统管理',
    path: '小鱼仔',
    show: '显示',
    active: '/stystem/roles',
      parent:'系统管理',
  },
  {
    name: '相关文档',
    path: '小鱼仔',
    show: '显示',
    active: '/stystem/roles',
      parent:'系统管理',
  },
    {
    name: '插件示例',
    path: '小鱼仔',
    show: '显示',
    active: '/stystem/roles',
      parent:'系统管理',
  },
    {
    name: '仪表盘',
    path: '小鱼仔',
    show: '隐藏',
    active: '/stystem/roles',
    parent:'系统管理',
  },

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
