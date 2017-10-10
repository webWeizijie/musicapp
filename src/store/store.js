import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		list: [{
			name: 'wei',
			age: 18
		},
		{
			name: 'jie',
			age: 22
		},
		{
			name: 'yan',
			age: 22
		}]
	},
	getters:{
		computedList(state){
			return state.list.map(item => {
				return {
					name:'**'+ item.name + '**',
					age:item.age / 2
				}
			})
		}
	},
	mutations:{
		addAge(state,payload){
			state.list.forEach((item) => {
				item.age += 1;
			})
			console.log(payload)
		}
	},
	actions:{
		allAdd(context,data){
			setTimeout(() => {
				context.commit('addAge',{});
			},1000)
			console.log(data);
		}
	}
})

