import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'
import * as echarts from 'echarts'
// 全局挂载 echarts
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component)
}
app.config.globalProperties.$echarts = echarts
app.use(router).mount('#app')
