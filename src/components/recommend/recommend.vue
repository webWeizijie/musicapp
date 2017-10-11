<template>
	<div>
		我是推荐
	</div>
</template>

<script>
	import Vue from 'vue'
	import { getRecommend } from '../../api/recommend'
	import { ERR_OK } from '../../api/config'
	import vueResource from 'vue-resource'
	Vue.use(vueResource);

	export default {
		data() {
			return {
				
			}
		},
		created() {
			this._getRecommend();
		},
		methods: {
			_getRecommend() {
				this.$http.jsonp(getRecommend.url, {
					params: getRecommend.params,
					jsonp: getRecommend.jsonp
				}).then((resolve) => {
					
					if(resolve.body.code == ERR_OK) {
						console.log(resolve.body.data);
					}
				})
			}
		}
	}
</script>

<style>

</style>