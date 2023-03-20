import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'path'
import Icons from 'unplugin-icons/vite'

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
	})