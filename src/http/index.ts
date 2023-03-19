import axios from 'axios'
import qs from 'qs'
import { useRouter } from 'vue-router'
const router = useRouter()
const baseUr = '/'
let path = '/' //请求根地址
// let path = "http://localhost:3060/"             //请求根地址

// 全局默认配置
axios.defaults.baseURL = path
axios.defaults.timeout = 10000
axios.defaults.headers.common['Authorization'] =
	localStorage.getItem('token') + ''
const CancelToken = axios.CancelToken
let pending = {}
const removePending = (key, isRequest = false) => {
	if (pending[key] && isRequest) {
		pending[key]('取消重复请求')
	}
	delete pending[key]
}
const getRequestIdentify = (config) => {
	const url = config.url
	if (config.method === 'post') {
		return encodeURIComponent(config.url + JSON.stringify(config.data))
	}
	return encodeURIComponent(url + JSON.stringify(config.params))
}

//请求拦截
axios.interceptors.request.use(
	async (config) => {
		// 每次发送请求之前判断vuex中是否存在token
		// 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
		// 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
		const requestData = getRequestIdentify(config)
		removePending(requestData, true)
		config.cancelToken = new CancelToken((c) => {
			pending[requestData] = c
		})
		config.headers.token = localStorage.getItem('token')
		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

// 添加响应拦截器
axios.interceptors.response.use(
	function (response) {
		let { data } = response
		if (data.token) {
			localStorage.setItem('token', data.token)
			axios.defaults.headers.common['Authorization'] = data.token
		}
		return response
	},
	function (error) {
		if (error.response.status) {
			switch (error.response.status) {
				// 401: 未登录
				// 未登录则跳转登录页面，并携带当前页面的路径
				// 在登录成功后返回当前页面，这一步需要在登录页操作。
				case 401:
					router.push('/')
					break
				// 403 token过期
				// 登录过期对用户进行提示
				// 清除本地token和清空vuex中token对象
				// 跳转登录页面
				default:
			}
			return Promise.reject(error.response)
		}
		return Promise.reject(error)
	}
)

const get = (url: string, params: object) => {
	return new Promise((resolve, reject) => {
		axios
			.get(url, { params })
			.then((res) => {
				resolve(res.data)
			})
			.catch((err) => {
				alert('服务出错')
			})
	})
}

const post = (url: string, data: object) => {
	return new Promise((resolve, reject) => {
		axios
			.post(url, qs.stringify(data))
			.then((res) => {
				resolve(res.data)
			})
			.catch((err) => {
				alert('服务出错')
			})
	})
}
const put = (url: string, data: object) => {
	return new Promise((resolve, reject) => {
		axios
			.put(url, qs.stringify(data))
			.then((res) => {
				resolve(res.data)
			})
			.catch((err) => {
				alert('服务出错')
			})
	})
}
const Del = (url: string, data: object) => {
	return new Promise((resolve, reject) => {
		axios
			.delete(url, qs.stringify(data))
			.then((res) => {
				resolve(res.data)
			})
			.catch((err) => {
				alert('服务出错')
			})
	})
}
export { get, post, put, Del }
