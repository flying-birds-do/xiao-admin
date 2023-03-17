import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'
import * as echarts from 'echarts'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'animate.css/animate.min.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import eventBus from 'vue3-print-nb' // 打印
import { createApp } from 'vue'
import App from './App.vue'

// 视频插件
// import VideoPlayer from 'vue-video-player/src'
// import 'video.js/dist/video-js.css'
// import 'vue-video-player/src/custom-theme.css'

import VMdPreview from '@kangc/v-md-editor/lib/preview'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
VMdPreview.use(vuepressTheme)

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component)
}
app.config.globalProperties.$echarts = echarts
app
	.use(router)
	.use(ElementPlus, {
		locale: zhCn,
	})
	.use(eventBus)
	.use(VMdPreview)
	.mount('#app')
