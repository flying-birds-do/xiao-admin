const loadingDirective = {
	// 指令的定义
	mounted(el) {
		el.focus()
	},
}
const clickDirective = {
	mounted(el, binding, vnode) {
		el.addEventListener('click', () => {
			if (!el.disabled) {
				el.disabled = true
				let time = binding.value
				if (binding.arg == 's') {
					time = time * 1000
				}
				setTimeout(() => {
					el.disabled = false
				}, time)
			}
		})
	},
}

const GlobalDirective = {
	loadingDirective,
	clickDirective,
}
export default GlobalDirective
