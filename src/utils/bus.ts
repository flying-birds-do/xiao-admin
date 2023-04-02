import mitt from 'mitt'
const init_mitt = mitt()
const emitter: any = {
	_events: {},
	$emit: init_mitt.emit,
	$on: function (t: any, e: any) {
		this._events[t] = true
		init_mitt.on(t, e)
	},
	$off: function (t: any, e: any) {
		delete this._events[t]
		init_mitt.off(t, e)
	},
}
export default emitter
