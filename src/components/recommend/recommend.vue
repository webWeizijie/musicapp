<template>
	<div>
		{{name}}
	</div>
</template>

<script>
	import {getRecommend} from '../../api/recommend'
	import {ERR_OK} from '../../api/config'
	export default{
		data(){
			return {
				name:null,
			}
		},
		created(){
			this._getRecommend();
		},
		methods:{
			_getRecommend(){
				getRecommend().then((res) => {
					if(res.code === ERR_OK){
						console.log(res.data)
					}
				})
			}
		}
	}
</script>

<style>
	
</style>