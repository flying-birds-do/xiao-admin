import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
const app = createApp(App)
import router from './router/index'
import * as echarts from 'echarts'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'animate.css/animate.min.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import eventBus from 'vue3-print-nb' // 打印
import vue3videoPlay from 'vue3-video-play' // 引入组件
import 'vue3-video-play/dist/style.css' // 引入css
// 全局过滤器
import installFilter from '@/utils/XFilter'
// 自定义指令
import GlobalDirective from '@/utils/XDirective' // 全局自定义指令
// 全局弹框
import Toast from '@/components/XToast'
import store from './store'
import VMdPreview from '@kangc/v-md-editor/lib/preview'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
VMdPreview.use(vuepressTheme)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component)
}
app.config.globalProperties.$echarts = echarts
// 注册全局方法过滤器
installFilter(app)
type Toast = {
	show: <T>(str: string | number, time?: number) => void
}
type GlobalDirective = {
	el: any
	binding: any
	vnode: any
}
// 编写自定义插件的声明文件，防止报错，声明后也会有智能提示
declare module '@vue/runtime-core' {
	export interface ComponentCustomProperties {
		$toast: Toast
	}
}

app
	.use(router)
	.use(ElementPlus, {
		locale: zhCn,
	})
	.use(eventBus)
	.use(VMdPreview)
	.use(vue3videoPlay)
	.use(store)
	.use(Toast)
	.mount('#app')
