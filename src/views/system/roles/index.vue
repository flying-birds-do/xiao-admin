<template>
	<section class="role-marge-warp">
		<SearchBar
			id="commodityInquiry2"
			ref="conditions"
			:search-conditions="searchList"
			:is-query="true"
			:is-reset="true"
			:is-expand="true"
			@screenChange="screenChange"
		/>
		<section class="public-table-warp">
			<div class="operate-btn-warp">
				<el-button type="primary" plain>新增</el-button>
				<el-button type="success" plain>修改</el-button>
				<el-button type="danger" plain>删除</el-button>
				<el-button type="warning" plain>导出</el-button>
			</div>
			<section class="table-pub-card">
				<TableTemplate
					:columns="tableColumn"
					:table-data="tableData"
					:options="{ defaultSort: { prop: 'name', order: 'ascending' } }"
					@selection-change="handleSelection"
					@command="handleAction"
					@sort-change="handleSortChange"
				>
					<template #address="{ row }">
						<span>演示slot使用--->{{ row.address }}</span>
					</template>
					<!-- 如果不传入按钮组的数据就使用自定义插槽的方式， 自定义插槽需在配置项里配置slot -->
					<!-- <template #action="{ row, index }">
                    <div>
                        <el-button type="success">添加</el-button>
                        <el-button type="warning" @click="handleDelete(row, index)">删除</el-button>
                    </div>
                </template> -->
				</TableTemplate>
				<PaginationTemplate
					:pagination="pagination"
					@paginationSizeChange="paginationpageSizeChange"
				/>
			</section>
		</section>
	</section>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
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
const pagination = reactive({
	pageNumber: 1,
	totalCount: 0,
	pageSize: 20,
})
// 将查询条件上移
const screenChange = function (conditions) {
	console.log(conditions)
	// pagination = {
	//   pageNumber: 1,
	//   pageSize: 10,
	//   totalCount: 0
	// }
	// searchValue = conditions
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
// import Table from '@/components/Table/index.vue'
// 本项目Table组件自动引入，如复制此代码，需根据路径引入Table组件后使用
interface User {
	date: number
	name: string
	address: string
}
// 基本表格数据
const tableData: User[] = [
	{
		date: 1660737564000,
		name: '佘太君',
		address: '上海市普陀区金沙江路 1516 弄',
	},
	{
		date: 1462291200000,
		name: '王小虎',
		address: '上海市普陀区金沙江路 1517 弄',
	},
	{
		date: 1462032000000,
		name: '王小帅',
		address: '上海市普陀区金沙江路 1519 弄',
	},
	{
		date: 1462204800000,
		name: '王小呆',
		address: '上海市普陀区金沙江路 1516 弄',
	},
]
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
		ElMessage.success(`点击了【${prop}】排序`)
	}
}
const handleSelection = (val: User[]) => {
	console.log('父组件接收的多选数据', val)
}
const handleAction = (command: Table.Command, row: User, index: number) => {
	switch (command) {
		case 'edit':
			alert('点击了编辑')
			break
		case 'delete':
			console.log('row', row)
			console.log('index', index)
			ElMessageBox.confirm('确认删除吗？', '提示')
				.then(() => {
					ElMessage(JSON.stringify(row))
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
	}
}
</style>
