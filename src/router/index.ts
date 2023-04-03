import { fa } from 'element-plus/es/locale'
import {
	createRouter,
	createWebHistory,
	createWebHashHistory,
} from 'vue-router'
import layout from '../layout/index.vue'
/**
 * 菜单项字段配置结构
 */
const router = createRouter({
	history: createWebHashHistory(),
	routes: [
		{
			path: '/',
			component: layout,
			redirect: '/',
			meta: {
				title: 'dashboard',
				icon: 'dashboard',
				affix: true,
				hidden: true,
				needMenu: true,
				active: '/',
			},
			children: [
				{
					path: '/',
					component: () => import('../views/HomePage.vue'),
					name: 'Index',
					meta: {
						title: '首页',
						icon: 'dashboard',
						affix: true,
						hidden: true,
						active: '/',
					},
				},
			],
		},
		{
			name: 'componetentDemo',
			path: '/componetentDemo',
			component: layout,
			meta: {
				title: '组件示例',
				icon: 'Filter',
				hidden: true,
			},
			children: [
				// 使用手册
				{
					path: '/componetentDemo/button',
					component: () => import('../views/componetentDemo/button/index.vue'),
					name: 'button',
					meta: {
						title: '按钮',
						hidden: true,
						active: '/componetentDemo/button',
					},
				},
				{
					path: '/componetentDemo/card',
					component: () => import('../views/componetentDemo/card/index.vue'),
					name: 'card',
					meta: {
						title: '卡片',
						hidden: true,
						active: '/componetentDemo/card',
					},
				},
				{
					path: '/componetentDemo/table',
					component: () => import('../views/componetentDemo/table/index.vue'),
					name: 'table',
					meta: {
						title: '表格',
						hidden: true,
						active: '/componetentDemo/table',
					},
				},

				// {
				// 	path: '/componetentDemo/tableTemplate',
				// 	component: () =>
				// 		import('../views/componetentDemo/tableTemplate/index.vue'),
				// 	name: 'tableTemplate',
				// 	meta: {
				// 		title: '基础无分页',
				// 		hidden: true,
				// 	},
				// },
				// {
				// 	path: '/componetentDemo/tableOpenRow',
				// 	component: () =>
				// 		import('../views/componetentDemo/tableOpenRow/index.vue'),
				// 	name: 'tableOpenRow',
				// 	meta: {
				// 		title: '表格展开行',
				// 		hidden: true,
				// 	},
				// },
				{
					path: '/componetentDemo/toast',
					component: () => import('../views/componetentDemo/toast/index.vue'),
					name: 'toast',
					meta: {
						title: 'toast',
						hidden: true,
						active: '/componetentDemo/toast',
					},
				},
			],
		},
		{
			name: 'system',
			path: '/system',
			component: layout,
			meta: {
				title: '系统管理',
				icon: 'Grid',
				hidden: true,
			},
			children: [
				// 使用手册
				// {
				// 	path: '/system/permission',
				// 	component: () => import('../views/system/permission/index.vue'),
				// 	name: 'permission',
				// 	meta: {
				// 		title: '权限管理',
				// 		hidden: true,
				// 	},
				// },
				{
					path: '/system/user',
					component: () => import('../views/system/user/index.vue'),
					name: 'user',
					meta: {
						title: '用户管理',
						hidden: true,
						active: '/system/user',
					},
				},
				{
					path: '/system/user/detail',
					component: () => import('../views/system/user/detail/index.vue'),
					name: 'detail',
					meta: {
						title: '详情页面',
						hidden: false,
						active: '/system/user',
					},
				},
				{
					path: '/system/roles',
					component: () => import('../views/system/roles/index.vue'),
					name: 'roles',
					meta: {
						title: '角色管理',
						hidden: true,
						active: '/system/roles',
					},
				},
				{
					path: '/system/router',
					component: () => import('../views/system/router/index.vue'),
					name: 'router',
					meta: {
						title: '路由管理',
						hidden: true,
						active: '/system/router',
					},
				},
				{
					path: '/componetentDemo/logRecod',
					component: () => import('../views/system/logRecod/index.vue'),
					name: 'logRecod',
					meta: {
						title: '日志',
						hidden: true,
						active: '/componetentDemo/logs',
					},
				},
			],
		},
		{
			name: 'aboutFile',
			path: '/aboutFile',
			component: layout,
			meta: {
				title: '相关文档',
				icon: 'RefreshLeft',
				hidden: true,
				active: '/aboutFile',
			},
			children: [
				// 使用手册
				{
					path: '/aboutFile/vue',
					component: () => import('../views/vue/index.vue'),
					name: 'vue',
					meta: {
						title: 'vue',
						hidden: true,
						active: '/aboutFile/vue',
					},
				},
				{
					path: '/aboutFile/vueRouter',
					component: () => import('../views/vueRouter/index.vue'),
					name: 'vueRouter',
					meta: {
						title: 'vueRouter',
						hidden: true,
						active: '/aboutFile/vueRouter',
					},
				},
				{
					path: '/aboutFile/typeScript',
					component: () => import('../views/typeScript/index.vue'),
					name: 'typeScript',
					meta: {
						title: 'typeScript',
						hidden: true,
						active: '/aboutFile/typeScript',
					},
				},
				{
					path: '/aboutFile/vite',
					component: () => import('../views/vite/index.vue'),
					name: 'vite',
					meta: {
						title: 'vite',
						hidden: true,
						active: '/aboutFile/vite',
					},
				},
				{
					path: '/aboutFile/pinia',
					component: () => import('../views/pinia/index.vue'),
					name: 'pinia',
					meta: {
						title: 'pinia',
						hidden: true,
						active: '/aboutFile/pinia',
					},
				},
				{
					path: '/aboutFile/vuex',
					component: () => import('../views/vuex/index.vue'),
					name: 'vuex',
					meta: {
						title: 'vuex',
						hidden: true,
						active: '/aboutFile/vuex',
					},
				},
				{
					path: '/aboutFile/elementPlus',
					component: () => import('../views/elementPlus/index.vue'),
					name: 'elementPlus',
					meta: {
						title: 'elementPlus',
						hidden: true,
						active: '/aboutFile/elementPlus',
					},
				},
			],
		},

		{
			name: 'login',
			path: '/login',
			meta: {
				title: '登陆页面',
				hidden: false,
				active: '/login',
			},
			component: () => import('../views/login/index.vue'),
		},

		{
			name: 'pluginDemo',
			path: '/pluginDemo',
			component: layout,
			meta: {
				title: '插件示例',
				icon: 'TurnOff',
				hidden: true,
				active: '/pluginDemo',
			},
			children: [
				// 使用手册
				{
					path: '/pluginDemo/map',
					component: () => import('../views/pluginDemo/map/index.vue'),
					name: 'map',
					meta: {
						title: '地图',
						hidden: true,
						active: '/pluginDemo/map',
					},
				},
				{
					path: '/pluginDemo/audio',
					component: () => import('../views/pluginDemo/audio/index.vue'),
					name: 'audio',
					meta: {
						title: '音频',
						hidden: true,
						active: '/pluginDemo/audio',
					},
				},
				{
					path: '/pluginDemo/video',
					component: () => import('../views/pluginDemo/video/index.vue'),
					name: 'video',
					meta: {
						title: '视频',
						hidden: true,
						active: '/pluginDemo/video',
					},
				},
				{
					path: '/pluginDemo/print',
					component: () => import('../views/pluginDemo/print/index.vue'),
					name: 'print',
					meta: {
						title: '打印',
						hidden: true,
						active: '/pluginDemo/print',
					},
				},
				{
					path: '/pluginDemo/icon',
					component: () => import('../views/pluginDemo/icon/index.vue'),
					name: 'icon',
					meta: {
						title: '图标',
						hidden: true,
						active: '/pluginDemo/icon',
					},
				},
				{
					path: '/pluginDemo/cut',
					component: () => import('../views/pluginDemo/cut/index.vue'),
					name: 'cut',
					meta: {
						title: '剪切板',
						hidden: true,
						active: '/pluginDemo/cut',
					},
				},
				{
					path: '/pluginDemo/richText',
					component: () => import('../views/pluginDemo/richText/index.vue'),
					name: 'richText',
					meta: {
						title: '富文本',
						hidden: true,
						active: '/pluginDemo/richText',
					},
				},
				{
					path: '/pluginDemo/markdown',
					component: () => import('../views/pluginDemo/markdown/index.vue'),
					name: 'markdown',
					meta: {
						title: 'markdown',
						hidden: true,
						active: '/pluginDemo/markdown',
					},
				},
			],
		},
		{
			name: 'watchImage',
			path: '/watchImage',
			component: layout,
			meta: {
				title: '仪表盘',
				icon: 'Unlock',
				hidden: true,
				active: '/watchImage',
			},
			children: [
				// 使用手册
				// {
				// 	path: '/watchImage/analysis',
				// 	component: () => import('../views/analysis/index.vue'),
				// 	name: 'analysis',
				// 	meta: {
				// 		title: '大炫图表',
				// 		hidden: true,
				// 	},
				// },
				{
					path: '/watchImage/works',
					component: () => import('../views/works/index.vue'),
					name: 'works',
					meta: {
						title: '工作中心',
						hidden: true,
						active: '/watchImage/works',
					},
				},
			],
		},
		{
			name: 'about',
			path: '/about',
			meta: {
				title: '关于我们',
				icon: 'Avatar',
				hidden: true,
				needMenu: true,
				active: '/pluginDemo',
			},
			component: layout,
			children: [
				// 使用手册
				{
					path: '/about',
					component: () => import('../views/about/index.vue'),
					name: 'permission',
					meta: {
						title: '关于我们',
						hidden: true,
						active: '/about',
					},
				},
			],
		},
		// {
		// 	path: '/:pathMatch(.*)',
		// 	meta: {
		// 		hidden: true,
		// 	},
		// 	redirect: '/watchImage/analysis',
		// },
	],
})
router.beforeEach((to, from, next) => {
	const token: string | null = localStorage.getItem('token')
	if (!token && to.path !== '/login') {
		next('/login')
	} else {
		next()
	}
})

export default router
