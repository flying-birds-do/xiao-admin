import dayjs from 'dayjs'

// 时间戳转时分秒
function getformatDate(date, fmt) {
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(
			RegExp.$1,
			(date.getFullYear() + '').substr(4 - RegExp.$1.length)
		)
	}
	let o = {
		'M+': date.getMonth() + 1,
		'd+': date.getDate(),
		'h+': date.getHours(),
		'm+': date.getMinutes(),
		's+': date.getSeconds(),
	}
	for (let k in o) {
		if (new RegExp(`(${k})`).test(fmt)) {
			let str = o[k] + ''
			fmt = fmt.replace(
				RegExp.$1,
				RegExp.$1.length === 1 ? str : padLeftZero(str)
			)
		}
	}
	return fmt
}

function padLeftZero(str) {
	return ('00' + str).substr(str.length)
}

// 时间过滤
function formatDate(time) {
	return getformatDate(new Date(time), 'yyyy-MM-dd hh:mm')
}

// 状态转换
function formatStatus(status, typeArr) {
	//  status 1  typeArr [{status:1,value:'成功'},{status:2,value:'失败'}]
	for (let i = 0; i < typeArr.length; i++) {
		if (typeArr[i].status === status) {
			return typeArr[i].value
		}
	}
	return status
}

const dateFliter = (val, format = 'YYYY-MM-DD') => {
	if (!isNaN(val)) {
		val = parseInt(val)
	}
	return dayjs(val).format(format)
}

export default (app) => {
	app.config.globalProperties.$filters = {
		dateFliter,
		formatStatus,
		formatDate,
		padLeftZero,
		getformatDate,
	}
}
