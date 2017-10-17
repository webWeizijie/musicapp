import Vue from "vue"
import Vuex from "vuex"
import * as getters from './getters'
import * as actions from './actions'
import state from './state'
import mutations from './mutations'
//检测vuex数据变化.console出来，vue自带
import createLogger from 'vuex/dist/logger'
Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
	state,
	mutations,
	getters,
	actions,
	strict:debug,
	plugins:debug ? [createLogger()] : []
})

