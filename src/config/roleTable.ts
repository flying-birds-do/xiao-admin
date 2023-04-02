// 基本表格配置
export const tableColumn: Table.Column[] = [
	{ type: 'selection', width: '50' },
	{ type: 'index', width: '60', label: '序号' },
	{ prop: 'name', label: '角色名称', sortable: true },
	{ type: 'date', prop: 'date', label: '日期' },
	{
		prop: 'status',
		label: '状态',
	},
	{
		prop: 'adress',
		label: '备注',
		slot: 'address',
		showOverflowTooltip: true,
	},
	{
		width: '180',
		label: '操作',
		buttons: [
			{ name: 'edit', type: 'primary', command: 'edit' },
			{ name: 'delete', type: 'danger', command: 'delete' },
		],
	},
]
// 带有分页的表格配置
export const tableDemoColumn: Table.Column[] = [
	{ type: 'index', width: '65', label: 'No.', align: 'center' },
	{
		prop: 'avatar',
		type: 'image',
		label: '头像',
		width: '100',
		align: 'center',
	},
	{ prop: 'name', label: '姓名', width: '100' },
	{ prop: 'age', label: '年龄', width: '90', align: 'center' },
	{
		prop: 'gender',
		label: '性别',
		width: '90',
		slot: 'gender',
		align: 'center',
	},
	{ prop: 'mobile', label: '手机号', width: '180' },
	{ prop: 'email', label: '邮箱', showOverflowTooltip: true },
	{ prop: 'address', label: '地址', showOverflowTooltip: true },
	{
		width: '120',
		label: '操作',
		buttons: [
			{ name: '编辑', type: 'success', command: 'edit' },
			{ name: '删除', type: 'danger', command: 'delete' },
		],
	},
]
