<template>
  <section class="role-marge-warp">
    <SearchBar id="commodityInquiry2" ref="conditions" :search-conditions="searchList" :is-query="true" :is-reset="true"
      :is-expand="true" @screenChange="screenChange" />
    <section class="public-table-warp">
      <div class="operate-btn-warp">
        <el-button type="primary" plain @click="newAdd">新增</el-button>
        <el-button type="success" plain @click="handleEditSingle">修改</el-button>
        <el-button type="danger" plain @click="deleteOperate">删除</el-button>
        <el-button type="warning" plain>导出</el-button>
      </div>
      <section class="table-pub-card">
        <TableTemplate :columns="tableColumn" :table-data="tableData"
          :options="{ defaultSort: { prop: 'name', order: 'ascending' } }" @selection-change="handleSelection"
          @command="handleAction" @sort-change="handleSortChange">
          <template #address="{ row }">
            <span>我是内容地址{{ row.address }}</span>
          </template>
          <!-- 如果不传入按钮组的数据就使用自定义插槽的方式， 自定义插槽需在配置项里配置slot -->
          <!-- <template #action="{ row, index }">
                    <div>
                        <el-button type="success">添加</el-button>
                        <el-button type="warning" @click="handleDelete(row, index)">删除</el-button>
                    </div>
                </template> -->
        </TableTemplate>
        <PaginationTemplate :pagination="pagination" @paginationSizeChange="paginationpageSizeChange" />
      </section>
    </section>
    <xyDialog :dialogVisible="dialogVisible" @cancel="cancel" @sure="sure" :Tips="title">
      <el-form ref="ruleFormRef" :model="ruleForm" label-width="80px" class="demo-ruleForm" status-icon>
        <el-form-item label="角色名称" prop="name">
          <el-input v-model.number="ruleForm.name" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="权限字符" prop="rolesLimit">
          <el-input v-model="ruleForm.rolesLimit" placeholder="请输入权限字符" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="ruleForm.status" placeholder="请选择状态" class="set-select">
            <el-option label="正常" value="正常" />
            <el-option label="禁用" value="禁用" />
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="adress">
          <el-input v-model="ruleForm.adress" placeholder="备注" />
        </el-form-item>
      </el-form>
    </xyDialog>
  </section>
</template>
<script setup lang="ts">
import { reactive, ref,ToRefs } from 'vue'
import xyDialog from '@/components/XDialog/index.vue'
import { tableColumn } from '@/config/roleTable'
import { ElMessageBox, ElMessage } from 'element-plus'
import type { SortParams } from '@/components/XTable/index.vue'
const searchList = [
  {
    label: '角色名称',
    prop: 'rolesName',
    type: 'retrievalSelect',
    props: {
      placeholder: '角色名称',
    },
    list: [],
  },
  {
    label: '权限字符',
    prop: 'rolesLimit',
    type: 'input',
    props: {
      placeholder: '商品编号/商品名称',
    },
    list: [],
  },
  {
    label: '状态',
    prop: 'status',
    type: 'select',
    props: {
      placeholder: '请选择',
    },
    list: [],
  },
  {
    label: '创建时间',
    prop: 'createDate',
    type: 'datePicker',
    props: {
      placeholder: '请选择',
    },
    list: [],
  },
]
const totalChoice: any = ref([])
const dialogVisible = ref(false);
const title = ref('新建')
const currentRow = ref({})
let ruleForm: any = ref({
  id: 1,
  name: '',
  phone: '',
  status: '',
  ex: '',
  position: '',
  partment: '',
  password: '',
  roles: ''
})
let pagination = reactive({
  pageNumber: 1,
  totalCount: 200,
  pageSize: 5,
})
// 将查询条件上移
const screenChange = function (conditions) {
  console.log(conditions)
  pagination = {
    pageNumber: 1,
    pageSize: 5,
    totalCount: 400
  }
  let temp = JSON.parse(JSON.stringify(tableData.value))
  tableData.value = []
  tableData.value =temp.reverse()
}
// 分页
const paginationpageSizeChange = function (val) {
  // isFirst 用来标识 是点击的当前页码还是切换条数，当为true的时候是切换条数，当前分页需要重置为第一页
  if (val.isFirst) {
    pagination.pageNumber = 1
    pagination.pageSize = val.current
  } else {
    pagination.pageNumber = val.current
  }
}
const newAdd = () => {
  ruleForm.value = {}
  dialogVisible.value = true
  title.value = '新建'
}
const handleEditSingle = ():void => {
 if (totalChoice.value.length == 1) {
    currentRow.value = totalChoice.value[0]
  } else if (totalChoice.value.length === 0) {
    ElMessage.warning(`请选择`)
    return
  } else {
    ElMessage.warning(`只支持单个编辑`)
    return
 }
  ruleForm.value = currentRow
  dialogVisible.value = true
  title.value = '编辑'
}
const handleEdit = (index: number, row: User):void => {
  if (index) {
    ruleForm.value = row
  } else {
    ruleForm.value = currentRow
  }
  dialogVisible.value = true
  title.value = '编辑'

}
const sure = () => {
  dialogVisible.value = false
  tableData.value.splice(0, 0, ruleForm.value)
}
const cancel = () => {
  ruleForm.value = {}
  dialogVisible.value = false
}
// import Table from '@/components/Table/index.vue'
// 本项目Table组件自动引入，如复制此代码，需根据路径引入Table组件后使用
interface User {
  date: number
  name: string
  address: string
  status: string
  rolesLimit: string
}
// 基本表格数据
let tableData:any = ref([
  {
    date: 1660737564000,
    name: '佘太君',
    status: '正常',
    rolesLimit: 'admin',
    address: '上海市普陀区金沙江路 1516 弄',
  },
  {
    date: 1462291200000,
    name: '王小虎',
    status: '正常',
    rolesLimit: 'admin',
    address: '上海市普陀区金沙江路 1517 弄',
  },
  {
    date: 1462032000000,
    name: '王小帅',
    status: '禁用',
    rolesLimit: 'admin',
    address: '上海市普陀区金沙江路 1519 弄',
  },
  {
    date: 1462204800000,
    name: '王小呆',
    rolesLimit: 'general',
    status: '正常',
    address: '上海市普陀区金沙江路 1516 弄',
  },
])
/**
 * 排序
 * 在列中设置 sortable 属性即可实现以该列为基准的排序， 接受一个 Boolean，默认为 false。
 * 可以通过 Table 的 default-sort 属性设置默认的排序列和排序顺序。
 * 如果需要后端排序，需将 sortable 设置为 custom，同时在 Table 上监听 sort-change 事件，
 * 在事件回调中可以获取当前排序的字段名和排序顺序，从而向接口请求排序后的表格数据。
 */
const handleSortChange = ({ column, prop, order }: SortParams<User>) => {
  console.log(column, order)
  if (prop) {
    ElMessage.success(`按【${prop}】排序`)
  }
}
const deleteOperate = () => {
  if (!totalChoice.value.length) {
    ElMessage.warning(`请选择`)
    return
  }
  ElMessageBox.confirm('确认删除吗？', '提示')
    .then(() => {
      for (let i = 0; i < totalChoice.value.length; i++) {
        let index = tableData.value.indexOf(totalChoice.value[i])
        tableData.value.splice(index, 1)

      }
    })
    .catch(() => null)
}
const handleSelection = (val: User[]) => {
  // console.log('父组件接收的多选数据', val)
  totalChoice.value = val

}
const handleAction = (command: Table.Command, row: User, index: number) => {
  switch (command) {
    case 'edit':
      // alert('点击了编辑')
      handleEdit(index, row)
      break
    case 'delete':
      ElMessageBox.confirm('确认删除吗？', '提示')
        .then(() => {
          tableData.value.splice(index, 1)
          // ElMessage(JSON.stringify(row))
        })
        .catch(() => null)
      break
    default:
      break
  }
}
</script>
<style scoped lang="scss">
.public-table-warp {
  background: #fff;
  padding: 24px;

  .operate-btn-warp {
    text-align: left;
    margin-bottom: 24px;
  }
}
</style>
