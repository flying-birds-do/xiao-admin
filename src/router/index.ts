import { createRouter, createWebHistory } from 'vue-router'
import layout from '../layout/index.vue'
/**
 * 菜单项字段配置结构
 */
const router = createRouter({
	history: createWebHistory(),
	routes: [
		// {
		// 	path: '',
		// 	component: layout,
		// 	redirect: 'index',
		// 	meta: { title: '首页', icon: 'dashboard', affix: true, hidden: true },
		// 	children: [
		// 		{
		// 			path: 'index',
		// 			component: () => import('../views/HomePage.vue'),
		// 			name: 'Index',
		// 			meta: { title: '首页', icon: 'dashboard', affix: true, hidden: true },
		// 		},
		// 	],
		// },
		{
			name: 'login',
			path: '/login',
			meta: {
				title: '登陆页面',
				hidden: false,
			},
			component: () => import('../views/login/index.vue'),
		},
		{
			name: 'watchImage',
			path: '/watchImage',
			component: layout,
			meta: {
				title: '仪表盘',
				icon: 'Unlock',
				hidden: true,
			},
			children: [
				// 使用手册
				{
					path: '/watchImage/analysis',
					component: () => import('../views/analysis/index.vue'),
					name: 'analysis',
					meta: {
						title: '大炫图表',
						hidden: true,
					},
				},
				{
					path: '/watchImage/works',
					component: () => import('../views/works/index.vue'),
					name: 'works',
					meta: {
						title: '工作中心',
						hidden: true,
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
					},
				},
				{
					path: '/aboutFile/vueRouter',
					component: () => import('../views/vueRouter/index.vue'),
					name: 'vueRouter',
					meta: {
						title: 'vueRouter',
						hidden: true,
					},
				},
				{
					path: '/aboutFile/typeScript',
					component: () => import('../views/typeScript/index.vue'),
					name: 'typeScript',
					meta: {
						title: 'typeScript',
						hidden: true,
					},
				},
				{
					path: '/aboutFile/vite',
					component: () => import('../views/vite/index.vue'),
					name: 'vite',
					meta: {
						title: 'vite',
						hidden: true,
					},
				},
				{
					path: '/aboutFile/elementPlus',
					component: () => import('../views/elementPlus/index.vue'),
					name: 'elementPlus',
					meta: {
						title: 'elementPlus',
						hidden: true,
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
					},
				},
				{
					path: '/componetentDemo/card',
					component: () => import('../views/componetentDemo/card/index.vue'),
					name: 'card',
					meta: {
						title: '卡片',
						hidden: true,
					},
				},
				{
					path: '/componetentDemo/table',
					component: () => import('../views/componetentDemo/table/index.vue'),
					name: 'table',
					meta: {
						title: '表格',
						hidden: true,
					},
				},
			],
		},
		{
			name: 'pluginDemo',
			path: '/pluginDemo',
			component: layout,
			meta: {
				title: '插件示例',
				icon: 'TurnOff',
				hidden: true,
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
					},
				},
				{
					path: '/pluginDemo/audio',
					component: () => import('../views/pluginDemo/audio/index.vue'),
					name: 'audio',
					meta: {
						title: '音频',
						hidden: true,
					},
				},
				{
					path: '/pluginDemo/print',
					component: () => import('../views/pluginDemo/print/index.vue'),
					name: 'print',
					meta: {
						title: '打印',
						hidden: true,
					},
				},
				{
					path: '/pluginDemo/icon',
					component: () => import('../views/pluginDemo/icon/index.vue'),
					name: 'icon',
					meta: {
						title: '图标',
						hidden: true,
					},
				},
				{
					path: '/pluginDemo/cut',
					component: () => import('../views/pluginDemo/cut/index.vue'),
					name: 'cut',
					meta: {
						title: '剪切板',
						hidden: true,
					},
				},
				{
					path: '/pluginDemo/richText',
					component: () => import('../views/pluginDemo/richText/index.vue'),
					name: 'richText',
					meta: {
						title: '富文本',
						hidden: true,
					},
				},
				{
					path: '/pluginDemo/markdown',
					component: () => import('../views/pluginDemo/markdown/index.vue'),
					name: 'markdown',
					meta: {
						title: 'markdown',
						hidden: true,
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
				{
					path: '/system/permission',
					component: () => import('../views/system/permission/index.vue'),
					name: 'permission',
					meta: {
						title: '权限管理',
						hidden: true,
					},
				},
				{
					path: '/system/roles',
					component: () => import('../views/system/roles/index.vue'),
					name: 'roles',
					meta: {
						title: '角色管理',
						hidden: true,
					},
				},
				{
					path: '/system/router',
					component: () => import('../views/system/router/index.vue'),
					name: 'router',
					meta: {
						title: '路由管理',
						hidden: true,
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
			},
			component: () => import('../views/about/index.vue'),
		},
	],
})
// let routerPush = Router.prototype.push
// Router.prototype.push = function push(location) {
// 	return routerPush.call(this, location).catch((err) => err)
// }
export default router
