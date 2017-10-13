<template>
	<scroll-view class="singer-box">
		<div class="singer-list">
			<div class="singer-title">
				热门
			</div>
		</div>
	</scroll-view>
</template>

<script>
	import scrollView from 'base/scroll/scroll'
	import vueResource from 'vue-resource'
	import { getSinger } from 'api/singer.js'
	import Singer from 'common/js/singer'
	let HOT_NAME = '热门';
	let HOT_LENGTH = 10;
	export default{
		data(){
			return {
				englishList:[],
			}
		},
		methods:{
			_getSingerData(){
				this.$http.jsonp(getSinger.url,{
					params:getSinger.params,
					jsonp:getSinger.jsonp
				}).then((res)=>{
					this.singerData = res.body.data.list;
					this._initSingerList();
				})
			},
			_initSingerList(){
				//console.log(this.singerData)
				let map = {
					hot:{
						title:HOT_NAME,
						item:[]
					}
				}
				this.singerData.forEach((item,index) => {
					if(item.Fsort <= HOT_LENGTH){
						map.hot.item.push(
							new Singer({
								name:item.Fsinger_name,
								picUrl:item.Fsinger_mid
							})
						)
					}
					
					let key = item.Findex
					if(!map[key]){
						map[key] = {
							title:key,
							item:[]
						}
					}
					map[key].item.push(
						new Singer({
							name:item.Fsinger_name,
							picUrl:item.Fsinger_mid
						})
					)
				})
				let hot = []
				let ret = []
				for(var k in map){
					if(map[k].title.match(/[a-zA-Z]/)){
						ret.push(map[k]);
					}else if(map[k].title == HOT_NAME){
						hot.push(map[k]);
					}
				}
				ret.sort((a,b)=>{
					return a.title.charCodeAt(0) - b.title.charCodeAt(0);
				})
				console.log(hot.concat(ret)) 
			}
		},
		mounted(){
			setTimeout(()=>{
				this._getSingerData();
				
			},20)
		},
		components:{
			scrollView,
		}
	}
</script>

<style scoped>
	.singer-box{
		
	}
	.singer-title{
		height: 0.49rem;
	    line-height: 0.49rem;
	    padding-left: 0.3rem;
	    font-size: 0.12rem;
	    color: hsla(0,0%,100%,.5);
	    background: #333;
	}
</style>