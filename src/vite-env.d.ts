/// <reference types="vite/client" />
declare module '*.vue' {
	import { DefineComponent } from 'vue'
	const component: DefineComponent<{}, {}, any>
	export default component
}

/* eslint-disable */
declare module '*.vue' {
	import type { DefineComponent } from 'vue'
	const component: DefineComponent<{}, {}, any>
	export default component
}

declare module '*.scss' {
	const css: string
	export default css
}
declare module '*.sass' {
	const css: string
	export default css
}

declare module 'vue3-print-nb' {
	const content: any
	export = content
}

/* eslint-disable */
declare module '*.vue' {
	import type { DefineComponent } from 'vue'
	const component: DefineComponent<{}, {}, any>
	export default component
}
declare module 'vue-video-player/src'

declare module '@kangc/v-md-editor/lib/preview'

declare module '@kangc/v-md-editor/lib/theme/vuepress.js'

declare module '@/store/counter.js'
declare interface Window {
	_AMapSecurityConfig: any
}

declare module 'qs'
