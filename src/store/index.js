import Vue from "vue"
import Vuex from "vuex"
import createLogger from 'vuex/dist/logger'
import * as getters from './getters'
import * as actions from './actions'
import state from './state'
import mutations from './mutations'
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

