import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'path'
import Icons from 'unplugin-icons/vite'
import viteCompression from 'vite-plugin-compression'
// import { Plugin as importToCDN } from 'vite-plugin-cdn-import'
// import viteImagemin from 'vite-plugin-imagemin'
import { visualizer } from 'rollup-plugin-visualizer'
// https://vitejs.dev/config/
export default ({ mode }) =>
	defineConfig({
		resolve: {
			alias: {
				/** @ 符号指向 src 目录 */
				'@': resolve(__dirname, './src'),
			},
		},
		plugins: [
			vue(),
			AutoImport({
				resolvers: [ElementPlusResolver()],
			}),
			Components({
				resolvers: [ElementPlusResolver()],
			}),
			Icons({
				/* options */
			}),
			// gzip压缩
			viteCompression(),
			// importToCDN({
			// 	modules: [
			// 		{
			// 			// 需要 CDN 加速的包名称
			// 			name: 'lodash',
			// 			// 全局分配给模块的变量，Rollup 需要这个变量名称
			// 			var: 'lodash',
			// 			// 指定 CDN 上的加载路径
			// 			path: `https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js`,
			// 		},
			// 	],
			// }),
			// 图片压缩
			// viteImagemin({
			// 	gifsicle: {
			// 		optimizationLevel: 7,
			// 		interlaced: false,
			// 	},
			// 	optipng: {
			// 		optimizationLevel: 7,
			// 	},
			// 	mozjpeg: {
			// 		quality: 20,
			// 	},
			// 	pngquant: {
			// 		quality: [0.8, 0.9],
			// 		speed: 4,
			// 	},
			// 	svgo: {
			// 		plugins: [
			// 			{
			// 				name: 'removeViewBox',
			// 			},
			// 			{
			// 				name: 'removeEmptyAttrs',
			// 				active: false,
			// 			},
			// 		],
			// 	},
			// }),
			// 将 visualizer 插件放到最后
			visualizer(),
		],
		server: {
			open: true, // 自动打开浏览器
			proxy: {
				'/api': {
					target: 'http://',
					changeOrigin: true,
					rewrite(path) {
						return path.replace(/^\/api/, '')
					},
				},
			},
		},
		base: mode === 'production' ? '/xiao-admin/' : '/',
		build: {
			rollupOptions: {
				output: {
					manualChunks: {
						// 每个 '键' 都表示一个分包块，'值' 包含列出的模块及其所有依赖项
						vue: ['vue', 'vue-router', 'pinia', 'axios'],
						editor: [],
					},
				},
			},
		},
	})
