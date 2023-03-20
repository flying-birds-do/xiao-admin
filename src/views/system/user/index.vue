<template>
  <section class="user-warp">
    <div class="tree-warp">
      <el-tree ref="treeRef" class="filter-tree" :data="data" :props="defaultProps" default-expand-all
        :filter-node-method="filterNode" />
    </div>
    <div class="right-warp">
      <SearchBar @onSubmit="onSubmit" @resetSubmit="resetSubmit" ref="childComp"></SearchBar>
      <el-row class="top-button-warp">
        <el-button type="primary" @click="newAdd">新建用户</el-button>
      </el-row>
      <el-table :data="tableData.data" style="width: 100%">
        <el-table-column label="用户昵称" prop="name" />
        <el-table-column label="手机号码" prop="phone" width="120" />
        <el-table-column label="用户状态" prop="status">
          <template #default="scope">
            {{ scope.row?.status === '1' ? '正常' : " 禁用" }}
          </template>
        </el-table-column>
        <el-table-column label="归属部门" prop="partment" />
        <el-table-column label="用户密码" prop="password" />
        <el-table-column label="用户性别">
          <template #default="scope">
            {{ scope.row?.ex === '1' ? '男' : " 女" }}
          </template>
        </el-table-column>
        <el-table-column label="岗位" prop="position" />
        <el-table-column label="角色" prop="roles" />
        <el-table-column label="操作" width="160">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-model:current-page="currentPage4" v-model:page-size="pageSize4" :page-sizes="[100, 200, 300, 400]"
        :small="small" :disabled="disabled" :background="background" layout="total, sizes, prev, pager, next, jumper"
        :total="400" @size-change="handleSizeChange" @current-change="handleCurrentChange" class="pagination" />
    </div>
    <xyDialog :dialogVisible="dialogVisible" @cancel="cancel" @sure="sure" :Tips="title">
      <el-form ref="ruleFormRef" :model="ruleForm" label-width="80px" class="demo-ruleForm" status-icon>
        <el-form-item label="用户昵称" prop="name">
          <el-input v-model.number="ruleForm.name" placeholder="请输入用户昵称" />
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="ruleForm.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="用户状态" prop="status">
          <el-select v-model="ruleForm.status" placeholder="请选择用户状态" class="set-select">
            <el-option label="正常" value="正常" />
            <el-option label="禁用" value="禁用" />
          </el-select>
        </el-form-item>
        <el-form-item label="归属部门" required prop="partment">
          <el-tree ref="treeRef" class="filter-tree" :data="data" :props="defaultProps"
            :filter-node-method="filterNode" />
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-input v-model="ruleForm.password" placeholder="请输入用户密码" />
        </el-form-item>
        <el-form-item label="用户性别" prop="ex">
          <el-select v-model="ruleForm.ex" placeholder="请选择用户性别" class="set-select">
            <el-option label="男" value="男" />
            <el-option label="女" value="女" />
          </el-select>
        </el-form-item>
        <el-form-item label="岗位" prop="position">
          <el-select v-model="ruleForm.position" placeholder="请选择岗位" class="set-select">
            <el-option label="董事长" value="董事长" />
            <el-option label="项目经理" value="项目经理" />
            <el-option label="人力资源" value="人力资源" />
            <el-option label="普通员工" value="普通员工" />
          </el-select>
        </el-form-item>
        <el-form-item label="角色" prop="roles">
          <el-select v-model="ruleForm.roles" placeholder="请选择角色" class="set-select">
            <el-option label="普通员工" value="普通员工" />
            <el-option label="管理员" value="管理员" />
          </el-select>
        </el-form-item>
      </el-form>
    </xyDialog>

  </section>
</template>
<script lang="ts" setup>
import xyDialog from '@/components/xDolog/index.vue'
import SearchBar from './components/searchBar/index.vue'
import { ref, reactive, watch } from 'vue'
import { ElMessage, ElMessageBox, FormInstance, FormRules, Action, ElTree } from 'element-plus'
import { useCounterStore } from '@/store/counter.js'

interface Tree {
  id: number
  label: string
  children?: Tree[]
}
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const filterText = ref('')
const currentPage4 = ref(4)
const pageSize4 = ref(100)
const treeRef = ref<InstanceType<typeof ElTree>>()
const defaultProps = {
  children: 'children',
  label: 'label',
}

watch(filterText, (val) => {
  treeRef.value!.filter(val)
})
const filterNode = (value: any, data: any) => {
  if (!value) return true
  return data.label.includes(value)
}

const data: Tree[] = [
  {
    id: 1,
    label: '北京智慧医疗有限公司',
    children: [
      {
        id: 4,
        label: '市场扩展部',
        children: [
          {
            id: 9,
            label: '设计部',
          },
          {
            id: 10,
            label: '运营部',
          },
          {
            id: 11,
            label: '开阔业务部',
          },
          {
            id: 12,
            label: '医疗服务部',
          }
        ],
      },
      {
        id: 4,
        label: '产品研发部',
        children: [
          {
            id: 9,
            label: '设计部',
          },
          {
            id: 10,
            label: '产品部',
          },
          {
            id: 11,
            label: '后台管理',
          },
          {
            id: 12,
            label: '前端',
          }
        ],
      },
    ],
  }
]
const remdomData = (prefix: any, randomLength: any) => {
  // 第一个参数为你想生成的固定的文字开头比如: 微信用户xxxxx
  // 第二个为你想生成出固定开头文字外的随机长度
  // 兼容更低版本的默认值写法
  prefix === undefined ? prefix = "" : prefix;
  randomLength === undefined ? randomLength = 8 : randomLength;
  // 设置随机用户名
  // 用户名随机词典数组
  let nameArr = [
    ['张', '王', '李', '赵', '毕', '慕容', '上官', '欧阳', '刘', '范'],
    ["昔", "苏", "迪", "飞", "宇", "杰", "月", "国", "佳", "晓", "爱", "章", "往", "呆", "我", "他", "草", "花", "鼠", "扬", "科", "阳", "亮", "真", "家", "雨"]
  ]
  // 随机名字字符串
  let name = prefix;
  // 循环遍历从用户词典中随机抽出一个
  for (var i = 0; i < randomLength; i++) {
    // 随机生成index
    let index = Math.floor(Math.random() * 2);
    let zm: any = nameArr[index][Math.floor(Math.random() * nameArr[index].length)];
    // 如果随机出的是英文字母
    if (index === 1) {
      // 则百分之50的概率变为大写
      if (Math.floor(Math.random() * 2) === 1) {
        zm = zm.toUpperCase();
      }
    }
    // 拼接进名字变量中
    name += zm;
  }
  // 将随机生成的名字返回
  return name;
}
const handleSizeChange = (val: number) => {
  for (let i = 0; i < val; i++) {
    let name = remdomData('', 3)
    let obj = {
      id: 1 + i,
      name: name,
      password: '12345678',
      partment: '财务部',
      status: '1',
      roles: '管理员',
      phone: '15117960415',
      ex: '1',
      position: "基础岗位" + i
    }
    tableData.data.push(obj)
  }

}
const handleCurrentChange = (val: number) => {
  for (let i = 0; i < val * 10; i++) {
    let name = remdomData('', 4)
    let obj = {
      id: 1 + i,
      name: name,
      password: '12345678',
      partment: '财务部',
      status: '1',
      roles: '管理员',
      phone: '15117960415',
      ex: '1',
      position: "基础岗位" + i
    }
    tableData.data.push(obj)
  }

}
const resetSubmit = () => {
  tableData.data = [
    {
      id: 1,
      name: '爱笑的猫1',
      password: '12345678',
      partment: '财务部',
      status: '1',
      roles: '管理员',
      phone: '15117960415',
      ex: '1',
      position: "基础岗位"
    },
    {
      id: 1,
      name: 'admin',
      password: '12345678',
      partment: '办公室',
      status: '1',
      roles: '超级管理员',
      phone: '15117960416',
      ex: '2',
      position: "管理"
    },
    {
      id: 2,
      name: '丽丽',
      password: '12345678',
      partment: '研发部',
      status: '1',
      roles: '管理员',
      phone: '15117960415',
      ex: '1',
      position: "基础岗位"
    },
    {
      id: 3,
      name: '小美',
      password: '12345678',
      partment: '运营部',
      status: '1',
      roles: '管理员',
      phone: '15117960415',
      ex: '1',
      position: "基础岗位"
    },
    {
      id: 4,
      name: '晓璐',
      password: '12345678',
      partment: '财务部',
      status: '1',
      roles: '普通员工',
      phone: '15117960415',
      ex: '1',
      position: "基础岗位"
    },
    {
      id: 5,
      name: '王芳',
      password: '12345678',
      partment: '财务部',
      status: '1',
      roles: '普通员工',
      phone: '15117960415',
      ex: '1',
      position: "基础岗位"
    },
    {
      id: 6,
      name: '李小冉',
      password: '12345678',
      partment: '财务部',
      status: '1',
      roles: '普通员工',
      phone: '15117960415',
      ex: '1',
      position: "基础岗位"
    }]
}
const onSubmit = (row: any) => {
  if (row.name) {
    if (tableData.data.length) {
      let flag = ref(false);
      tableData.data.filter((item) => {
        if (item.name.includes(row.name)) {
          tableData.data = []
          tableData.data.push(item)
          flag.value = true;
        }
      }) 
      if (!flag.value) {
         tableData.data = []
      }
    } else {
      tableData.data = [
        {
          id: 1,
          name: '爱笑的猫1',
          password: '12345678',
          partment: '财务部',
          status: '1',
          roles: '管理员',
          phone: '15117960415',
          ex: '1',
          position: "基础岗位"
        },
        {
          id: 1,
          name: 'admin',
          password: '12345678',
          partment: '办公室',
          status: '1',
          roles: '超级管理员',
          phone: '15117960416',
          ex: '2',
          position: "管理"
        },
        {
          id: 2,
          name: '丽丽',
          password: '12345678',
          partment: '研发部',
          status: '1',
          roles: '管理员',
          phone: '15117960415',
          ex: '1',
          position: "基础岗位"
        },
        {
          id: 3,
          name: '小美',
          password: '12345678',
          partment: '运营部',
          status: '1',
          roles: '管理员',
          phone: '15117960415',
          ex: '1',
          position: "基础岗位"
        },
        {
          id: 4,
          name: '晓璐',
          password: '12345678',
          partment: '财务部',
          status: '1',
          roles: '普通员工',
          phone: '15117960415',
          ex: '1',
          position: "基础岗位"
        },
        {
          id: 5,
          name: '王芳',
          password: '12345678',
          partment: '财务部',
          status: '1',
          roles: '普通员工',
          phone: '15117960415',
          ex: '1',
          position: "基础岗位"
        },
        {
          id: 6,
          name: '李小冉',
          password: '12345678',
          partment: '财务部',
          status: '1',
          roles: '普通员工',
          phone: '15117960415',
          ex: '1',
          position: "基础岗位"
        }]
    }
  }
  if (row.roles) {
    if (tableData.data.length) {
      let flag = ref(false);
      tableData.data.filter((item) => {
        if (item.roles.includes(row.roles)) {
          tableData.data = []
          tableData.data.push(item)
           flag.value = true;
        }
      })
      if (!flag.value) {
         tableData.data = []
      }
    } else {
      tableData.data = [
        {
          id: 1,
          name: '爱笑的猫1',
          password: '12345678',
          partment: '财务部',
          status: '1',
          roles: '管理员',
          phone: '15117960415',
          ex: '1',
          position: "基础岗位"
        },
        {
          id: 1,
          name: 'admin',
          password: '12345678',
          partment: '办公室',
          status: '1',
          roles: '超级管理员',
          phone: '15117960416',
          ex: '2',
          position: "管理"
        },
        {
          id: 2,
          name: '丽丽',
          password: '12345678',
          partment: '研发部',
          status: '1',
          roles: '管理员',
          phone: '15117960415',
          ex: '1',
          position: "基础岗位"
        },
        {
          id: 3,
          name: '小美',
          password: '12345678',
          partment: '运营部',
          status: '1',
          roles: '管理员',
          phone: '15117960415',
          ex: '1',
          position: "基础岗位"
        },
        {
          id: 4,
          name: '晓璐',
          password: '12345678',
          partment: '财务部',
          status: '1',
          roles: '普通员工',
          phone: '15117960415',
          ex: '1',
          position: "基础岗位"
        },
        {
          id: 5,
          name: '王芳',
          password: '12345678',
          partment: '财务部',
          status: '1',
          roles: '普通员工',
          phone: '15117960415',
          ex: '1',
          position: "基础岗位"
        },
        {
          id: 6,
          name: '李小冉',
          password: '12345678',
          partment: '财务部',
          status: '1',
          roles: '普通员工',
          phone: '15117960415',
          ex: '1',
          position: "基础岗位"
        }]
    }
  }


}
const counter = useCounterStore()

const dialogVisible = ref(false);
const row = reactive({})
const title = ref('编辑用户')
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
const ruleFormRef = ref<FormInstance>()
let ruleForm:any = ref({
  id: 1,
  name: '',
  phone: '',
  status: '',
  ex: '',
  position: '',
  partment: '',
  password:'',
  roles: ''
})
// const rules = reactive<FormRules>({
//   storeName: [
//     { required: true, message: 'Please input Activity name', trigger: 'blur' },
//   ],
//   status: [
//     {
//       required: true,
//       message: 'Please select Activity zone',
//       trigger: 'blur',
//     },
//   ],
//   origin: [
//     {
//       required: true,
//       message: 'Please select Activity count',
//       trigger: 'change',
//     },
//   ],
//   date: [
//     {
//       type: 'date',
//       required: true,
//       message: 'Please pick a date',
//       trigger: 'change',
//     },
//   ],
//   phone: [
//     {
//       type: 'array',
//       required: true,
//       message: 'Please select at least one activity type',
//       trigger: 'change',
//     },
//   ],
//   concat: [
//     {
//       required: true,
//       message: 'Please select activity resource',
//       trigger: 'change',
//     },
//   ]
// })
// pinaia 
const addPinaia = () => {
  counter.count++
  // 带自动补全 ✨
  counter.$patch({ count: counter.count })
  // 或使用 action 代替
  // counter.increment()
}
const cancel = () => {
  ruleForm.value = {}
  dialogVisible.value = false
}
const newAdd = () => {
  ruleForm.value = {}
  dialogVisible.value = true
  title.value = '新建用户'
  addPinaia()
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
      tableData.data.splice(index, 1)
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
  tableData.data.splice(0, 0, ruleForm.value)
}
let tableData: any = reactive({
  data: [
    {
      id: 1,
      name: '爱笑的猫',
      password: '12345678',
      partment: '财务部',
      status: '1',
      roles: '管理员',
      phone: '15117960415',
      ex: '1',
      position: "基础岗位"
    },
    {
      id: 1,
      name: 'admin',
      password: '12345678',
      partment: '办公室',
      status: '1',
      roles: '超级管理员',
      phone: '15117960416',
      ex: '2',
      position: "管理"
    },
    {
      id: 2,
      name: '丽丽',
      password: '12345678',
      partment: '研发部',
      status: '1',
      roles: '管理员',
      phone: '15117960415',
      ex: '1',
      position: "基础岗位"
    },
    {
      id: 3,
      name: '小美',
      password: '12345678',
      partment: '运营部',
      status: '1',
      roles: '管理员',
      phone: '15117960415',
      ex: '1',
      position: "基础岗位"
    },
    {
      id: 4,
      name: '晓璐',
      password: '12345678',
      partment: '财务部',
      status: '1',
      roles: '普通员工',
      phone: '15117960415',
      ex: '1',
      position: "基础岗位"
    },
    {
      id: 5,
      name: '王芳',
      password: '12345678',
      partment: '财务部',
      status: '1',
      roles: '普通员工',
      phone: '15117960415',
      ex: '1',
      position: "基础岗位"
    },
    {
      id: 6,
      name: '李小冉',
      password: '12345678',
      partment: '财务部',
      status: '1',
      roles: '普通员工',
      phone: '15117960415',
      ex: '1',
      position: "基础岗位"
    },
  ]
})
</script>
<style lang="scss" scoped>
.top-button-warp {
  margin-bottom: 30px;
}

.user-warp {
  display: flex;

  .tree-warp {
    width: 240px;
    margin-right: 20px;
    padding: 10px;
    border: 1px solid #eaeaea;
  }

  .right-warp {
    flex: 1;
  }

}

.set-select {
  width: 100%;
}

.pagination {
  text-align: right;
  margin-top: 40px;
}
</style>
<!-- <style>
.user-warp .el-select {
  width: 100%;
}

.user-warp .el-input__wrapper {
  box-sizing: border-box;
  width: 100%;
}

.user-warp .el-form-item,
.el-form-item__content {
  width: 100%;
}
</style> -->
