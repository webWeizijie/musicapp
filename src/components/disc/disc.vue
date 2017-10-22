<template>
	<div class="disc-box" v-if="disc.creator">
		<music-list :title="title" :pic="pic" :songs="songs"></music-list>
	</div>
</template>

<script>
	import musicList from 'components/music-list/music-list'
	import {mapGetters} from 'vuex'
	import {getDiscData} from 'api/recommend.js'
	import vueResource from 'vue-resource'
	import { createSong } from 'common/js/song.js'
	import {ERR_OK} from 'api/config.js'
	export default{
		data(){
			return {
				songs:[],
			}
		},
		components:{
			musicList,
		},
		computed:{
			title(){
				return this.disc.creator.name;
			},
			pic(){
				return this.disc.imgurl;
			},
			...mapGetters({
				disc:'disc'
			})
		},
		created(){
			
		},
		mounted(){
			if(!this.disc.dissid){
				this.$router.push({
					path:'/recommend'
				})
				return
			}
			this.$http.get(getDiscData.url,{
				params:{
					...getDiscData.params,
					disstid:this.disc.dissid
				}
			}).then((res)=>{
				let ret = res.body;
				if(typeof ret === 'string'){
					let data = ret.substring(13,ret.length - 1);
					this.data = JSON.parse(data)
					if(this.data.code == ERR_OK){
						this.initDiscData();
					}
				}
			})
		},
		methods:{
			initDiscData(data){
				let result = [];
				this.data.cdlist[0].songlist.forEach((item)=>{
					result.push(createSong(item))
				})
				this.songs = result;
			},
			
		}
	}
</script>

<style scoped>
	.disc-box{
		position: fixed;
		top: 0;
		bottom: 0;
		width: 100%;
		z-index: 99;
	}
</style>