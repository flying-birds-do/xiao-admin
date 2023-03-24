import { App, createVNode, VNode, render } from 'vue'
import Toast from './index.vue'

export default {
	install(app: App) {
		// 将组件转换为虚拟DOM
		const Vnode: VNode = createVNode(Toast)
		// 将虚拟DOM挂载到页面节点上
		render(Vnode, document.body)
		// 将插件的主要方法挂载到 app.config.globalProperties 上，这里的 $toast 是自定义的
		app.config.globalProperties.$toast = {
			// 这里仅挂载了一个 show 方法到 $toast 上
			show(str: string | number, time?: number) {
				Vnode.component?.exposed?.show(str, time)
			},
		}
	},
}
