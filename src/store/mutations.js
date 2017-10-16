import * as types from './mutations-types.js'

const mutations = {
	[types.GET_MUSIC](state, singer) {
		state.singer = singer;
	}
}

export default mutations