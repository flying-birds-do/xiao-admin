<template>
  <section class="table-warp">
    <el-row class="top-button-warp">
      <SearchBar @onSubmit="onSubmit" @resetSubmit="resetSubmit" ref="childComp"></SearchBar>
      <el-button type="success" @click="newAdd">新建</el-button>
    </el-row>
    <div class="table-template-warp">
      <el-table :data="tableData.data" style="width: 100%" :cell-style="{ textAlign: 'center' }"
        :header-cell-style="{ 'text-align': 'center' }"  @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" />
        <el-table-column label="商品id" prop="id" />
        <el-table-column label="仓库名称" prop="storeName" />
        <el-table-column label="商品图片">
          <template #default="scope">
            <img :src="scope.row?.img" alt="图片" width="100" height="50">
          </template>
        </el-table-column>
        <el-table-column label="商品状态" prop="status">
          <template #default="scope">
            {{ scope.row?.status === '1' ? '出库中' : " 成功" }}
          </template>
        </el-table-column>
        <el-table-column label="商品源" prop="origin" width="240" />
        <el-table-column label="日期">
          <template #default="scope" v-model.n>
            <div style="display: flex; align-items: center;justify-content: center;">
              <el-icon>
                <timer />
              </el-icon>
              <span style="margin-left: 10px">{{$filters.dateFliter(scope.row?.date,'YYYY/MM/DD') }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination v-model:current-page="currentPage4" v-model:page-size="pageSize4" :page-sizes="[5, 10, 20, 50]"
        :small="small" :disabled="disabled" :background="background" layout="total, sizes, prev, pager, next, jumper"
        :total="100" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
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
import xyDialog from '@/components/XDialog/index.vue'
import { ref, reactive } from 'vue'
import { Timer } from '@element-plus/icons-vue'
import SearchBar from './components/searchBar/index.vue'
import { ElMessage, ElMessageBox, FormInstance, FormRules, Action,ElTable } from 'element-plus'
import { getCurrentInstance } from 'vue'
// const { proxy }: any = getCurrentInstance();
const { dateFliter }: any = getCurrentInstance()?.appContext.config.globalProperties


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
      date: '2016-05-03',
      storeName: name,
      status: '出库中',
      origin: '上海市普陀区金沙江路 1518 弄',
      phone: '15117960415',
      concat: '小鱼仔' + i,
      createTime: '2022-1-15',
      storeCount: 12,
      img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    }
    tableData.data.push(obj)
  }

}
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const currentPage4 = ref(4)
const pageSize4 = ref(5)
const handleCurrentChange = (val: number) => {
  for (let i = 0; i < val * 10; i++) {
    let name = remdomData('', 4)
    let obj = {
      id: 1 + i,
      date: '2016-05-03',
      storeName: name,
      status: '1',
      origin: '上海市普陀区金沙江路 1518 弄',
      phone: '15117960415',
      concat: '小鱼仔' + i,
      createTime: '2022-1-15',
      storeCount: 12,
      img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    }
    tableData.data.push(obj)
  }

}
const resetSubmit = () => {
  tableData.data = [{
    id: 1,
    storeId: 1,
    date: '2016-05-03',
    storeName: '王小虎12',
    status: '出库中',
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
    storeName: '王小虎11',
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
    storeName: '王小虎10',
    status: '出库中',
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
    storeName: '王小虎9',
    status: '出库中',
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
    storeName: '王小虎8',
    status: '成功',
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
    storeName: '王小虎7',
    status: '成功',
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
    storeName: '王小虎6',
    status: '成功',
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
    storeName: '王小虎5',
    status: '成功',
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
    storeName: '王小虎4',
    status: '成功',
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
    storeName: '王小虎3',
    status: '成功',
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
    storeName: '王小虎2',
    status: '成功',
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
    storeName: '王小虎1',
    status: '成功',
    origin: '上海市普陀区金沙江路 1518 弄',
    phone: '15117960415',
    concat: '小鱼仔',
    createTime: '2022-1-15',
    storeCount: 1
  }
  ]
}
const onSubmit = (row: any) => {
  if (row.storeName) {
    if (tableData.data.length) {
      let flag = ref(false);
      tableData.data.filter((item) => {
        if (item.storeName.includes(row.storeName)) {
          tableData.data = []
          tableData.data.push(item)
          flag.value = true;
        }
      })
      if (!flag.value) {
        tableData.data = []
      }
    } else {
      tableData.data = [{
        id: 1,
        storeId: 1,
        date: '2016-05-03',
        storeName: '王小虎12',
        status: '出库中',
        origin: '上海市普陀区金沙江路 1518 弄',
        phone: '15117960415',
        concat: '小鱼仔',
        createTime: '2022-1-15',
        storeCount: 12,
        img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      },
      {
        id: 1,
        storeId: 2,
        date: '2016-05-02',
        storeName: '王小虎11',
        status: '2',
        origin: '上海市普陀区金沙江路 1518 弄',
        phone: '15117960415',
        concat: '小鱼仔',
        createTime: '2022-1-15',
        storeCount: 13,
        img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      },
      {
        id: 2,
        storeId: 3,
        date: '2016-05-04',
        storeName: '王小虎10',
        status: '出库中',
        origin: '上海市普陀区金沙江路 1518 弄',
        phone: '15117960415',
        concat: '小鱼仔',
        createTime: '2022-1-15',
        storeCount: 2,
        img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      },
      {
        id: 2,
        storeId: 4,
        date: '2016-05-01',
        storeName: '王小虎9',
        status: '出库中',
        origin: '上海市普陀区金沙江路 1518 弄',
        phone: '15117960415',
        concat: '小鱼仔',
        createTime: '2022-1-15',
        storeCount: 5,
        img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      },
      {
        id: 3,
        storeId: 5,
        date: '2016-05-08',
        storeName: '王小虎8',
        status: '成功',
        origin: '上海市普陀区金沙江路 1518 弄',
        phone: '15117960415',
        concat: '小鱼仔',
        createTime: '2022-1-15',
        storeCount: 1,
        img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      },
      {
        id: 4,
        storeId: 6,
        date: '2016-05-06',
        storeName: '王小虎7',
        status: '成功',
        origin: '上海市普陀区金沙江路 1518 弄',
        phone: '15117960415',
        concat: '小鱼仔',
        createTime: '2022-1-15',
        storeCount: 1,
        img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      },
      {
        id: 4,
        storeId: 7,
        date: '2016-05-07',
        storeName: '王小虎6',
        status: '成功',
        origin: '上海市普陀区金沙江路 1518 弄',
        phone: '15117960415',
        concat: '小鱼仔',
        createTime: '2022-1-15',
        storeCount: 1,
        img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      },
      {
        id: 4,
        storeId: 7,
        date: '2016-05-07',
        storeName: '王小虎5',
        status: '成功',
        origin: '上海市普陀区金沙江路 1518 弄',
        phone: '15117960415',
        concat: '小鱼仔',
        createTime: '2022-1-15',
        storeCount: 1,
        img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      },
      {
        id: 4,
        storeId: 7,
        date: '2016-05-07',
        storeName: '王小虎4',
        status: '成功',
        origin: '上海市普陀区金沙江路 1518 弄',
        phone: '15117960415',
        concat: '小鱼仔',
        createTime: '2022-1-15',
        storeCount: 1,
        img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      },
      {
        id: 4,
        storeId: 7,
        date: '2016-05-07',
        storeName: '王小虎3',
        status: '成功',
        origin: '上海市普陀区金沙江路 1518 弄',
        phone: '15117960415',
        concat: '小鱼仔',
        createTime: '2022-1-15',
        storeCount: 1,
        img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      },
      {
        id: 4,
        storeId: 7,
        date: '2016-05-07',
        storeName: '王小虎2',
        status: '成功',
        origin: '上海市普陀区金沙江路 1518 弄',
        phone: '15117960415',
        concat: '小鱼仔',
        createTime: '2022-1-15',
        storeCount: 1,
        img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      },
      {
        id: 4,
        storeId: 7,
        date: '2016-05-07',
        storeName: '王小虎1',
        status: '成功',
        origin: '上海市普陀区金沙江路 1518 弄',
        phone: '15117960415',
        concat: '小鱼仔',
        createTime: '2022-1-15',
        storeCount: 1,
        img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      }
      ]
    }
  }
  if (row.status) {
    console.log(row.status)
    console.log(999)
    if (tableData.data.length) {
      let flag = ref(false);
      tableData.data.filter((item) => {
        if (item.status.includes(row.status)) {
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
          storeId: 1,
          date: '2016-05-03',
          storeName: '王小虎',
          status: '1',
          origin: '上海市普陀区金沙江路 1518 弄',
          phone: '15117960415',
          concat: '小鱼仔',
          createTime: '2022-1-15',
          storeCount: 12,
          img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
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
          storeCount: 13,
          img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
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
          storeCount: 2,
          img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
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
          storeCount: 5,
          img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
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
          storeCount: 1,
          img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
        },
        {
          id: 1,
          storeId: 1,
          date: '2016-05-03',
          storeName: '王小虎12',
          status: '出库中',
          origin: '上海市普陀区金沙江路 1518 弄',
          phone: '15117960415',
          concat: '小鱼仔',
          createTime: '2022-1-15',
          storeCount: 12,
          img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
        },
        {
          id: 1,
          storeId: 1,
          date: '2016-05-03',
          storeName: '王小虎12',
          status: '出库中',
          origin: '上海市普陀区金沙江路 1518 弄',
          phone: '15117960415',
          concat: '小鱼仔',
          createTime: '2022-1-15',
          storeCount: 12,
          img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
        },
        {
          id: 1,
          storeId: 1,
          date: '2016-05-03',
          storeName: '王小虎12',
          status: '出库中',
          origin: '上海市普陀区金沙江路 1518 弄',
          phone: '15117960415',
          concat: '小鱼仔',
          createTime: '2022-1-15',
          storeCount: 12,
          img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
        },


      ]
    }
  }


}
const ruleFormRef = ref<FormInstance>()
let ruleForm: any = ref({
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
const multipleSelection = ref<User[]>([])
const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val
  // for (let i = 0; i < val.length; i++) {
  //  tableData.data = tableData.data.includes(val[i]) ? tableData.data.splice(tableData.data.indexOf(val[i]),1) :tableData.data
  // }
}
const cancel = () => {
  ruleForm.value = {}
  dialogVisible.value = false
}
const newAdd = () => {
  ruleForm.value = {}
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
  data: [{
    id: 11,
    storeId: 1,
    date: '2016-05-03',
    storeName: '王小虎12',
    status: '出库中',
    origin: '上海市普陀区金沙江路 1518 弄',
    phone: '15117960415',
    concat: '小鱼仔',
    createTime: '2022-1-15',
    storeCount: 12,
    img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
  },
  {
    id: 3,
    storeId: 1,
    date: '2016-05-03',
    storeName: '王小虎12',
    status: '出库中',
    origin: '上海市普陀区金沙江路 1518 弄',
    phone: '15117960415',
    concat: '小鱼仔',
    createTime: '2022-1-15',
    storeCount: 12,
    img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
  },
  {
    id: 4,
    storeId: 1,
    date: '2016-05-03',
    storeName: '王小虎12',
    status: '出库中',
    origin: '上海市普陀区金沙江路 1518 弄',
    phone: '15117960415',
    concat: '小鱼仔',
    createTime: '2022-1-15',
    storeCount: 12,
    img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
  },
  {
    id: 5,
    storeId: 1,
    date: '2016-05-03',
    storeName: '王小虎12',
    status: '出库中',
    origin: '上海市普陀区金沙江路 1518 弄',
    phone: '15117960415',
    concat: '小鱼仔',
    createTime: '2022-1-15',
    storeCount: 12,
    img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
  },
  {
    id: 1,
    storeId: 1,
    date: '2016-05-03',
    storeName: '王小虎12',
    status: '出库中',
    origin: '上海市普陀区金沙江路 1518 弄',
    phone: '15117960415',
    concat: '小鱼仔',
    createTime: '2022-1-15',
    storeCount: 12,
    img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
  },
    // {
    //   id: 1,
    //   storeId: 1,
    //   date: '2016-05-03',
    //   storeName: '王小虎12',
    //   status: '出库中',
    //   origin: '上海市普陀区金沙江路 1518 弄',
    //   phone: '15117960415',
    //   concat: '小鱼仔',
    //   createTime: '2022-1-15',
    //   storeCount: 12,
    //   img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    // },
    // {
    //   id: 1,
    //   storeId: 1,
    //   date: '2016-05-03',
    //   storeName: '王小虎12',
    //   status: '出库中',
    //   origin: '上海市普陀区金沙江路 1518 弄',
    //   phone: '15117960415',
    //   concat: '小鱼仔',
    //   createTime: '2022-1-15',
    //   storeCount: 12,
    //   img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    // },
    // {
    //   id: 1,
    //   storeId: 1,
    //   date: '2016-05-03',
    //   storeName: '王小虎12',
    //   status: '出库中',
    //   origin: '上海市普陀区金沙江路 1518 弄',
    //   phone: '15117960415',
    //   concat: '小鱼仔',
    //   createTime: '2022-1-15',
    //   storeCount: 12,
    //   img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    // },
    // {
    //   id: 1,
    //   storeId: 1,
    //   date: '2016-05-03',
    //   storeName: '王小虎12',
    //   status: '出库中',
    //   origin: '上海市普陀区金沙江路 1518 弄',
    //   phone: '15117960415',
    //   concat: '小鱼仔',
    //   createTime: '2022-1-15',
    //   storeCount: 12,
    //   img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    // },
    // {
    //   id: 1,
    //   storeId: 1,
    //   date: '2016-05-03',
    //   storeName: '王小虎12',
    //   status: '出库中',
    //   origin: '上海市普陀区金沙江路 1518 弄',
    //   phone: '15117960415',
    //   concat: '小鱼仔',
    //   createTime: '2022-1-15',
    //   storeCount: 12,
    //   img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    // },
    // {
    //   id: 1,
    //   storeId: 1,
    //   date: '2016-05-03',
    //   storeName: '王小虎12',
    //   status: '出库中',
    //   origin: '上海市普陀区金沙江路 1518 弄',
    //   phone: '15117960415',
    //   concat: '小鱼仔',
    //   createTime: '2022-1-15',
    //   storeCount: 12,
    //   img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    // },
    // {
    //   id: 1,
    //   storeId: 1,
    //   date: '2016-05-03',
    //   storeName: '王小虎12',
    //   status: '出库中',
    //   origin: '上海市普陀区金沙江路 1518 弄',
    //   phone: '15117960415',
    //   concat: '小鱼仔',
    //   createTime: '2022-1-15',
    //   storeCount: 12,
    //   img: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    // },
  ]

  
}
)
</script>
<style lang="scss" scoped>
.top-button-warp {
  margin-bottom: 30px;
  display: flex;
  // justify-content: space-between;
}

.pagination {
  text-align: right;
  margin-top: 30px;
}
</style>

