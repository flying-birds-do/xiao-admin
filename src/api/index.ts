import { get, post } from '@/http/index'

export default {
	Login: (data: object) => post('/api/users/Login', data), // 登录
}
