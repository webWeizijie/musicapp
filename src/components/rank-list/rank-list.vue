<template>
	<div class="rank-list-box">			
		<music-list :pic="pic" :title="title" :songs="rankingSong" :rankingState="rankingState"></music-list>
	</div>
</template>

<script>
	import musicList from 'components/music-list/music-list'
	import {mapGetters} from 'vuex'
	import {getRankingSong} from 'api/ranking.js'
	import vueResource from 'vue-resource'
	import { createSong } from 'common/js/song.js'
	import {ERR_OK} from 'api/config.js'
	
	export default{
		data(){
			return {
				rankingSong:[],
				rankingState:true,
				data:{}
			}
		},
		components:{
			musicList,
		},
		computed:{
			...mapGetters({
				ranking:'ranking'
			}),
			pic(){
				return this.data.topinfo?this.data.topinfo.pic_album : '';
			},
			title(){
				return this.ranking.topTitle;
			}
		},
		created(){
			if(!this.ranking.id){
				this.$router.push({
					path:'/ranking'
				})
				return
			}
			this.$http.jsonp(getRankingSong.url,{
				params:{
					...getRankingSong.params,
					topid:this.ranking.id,
				},
				jsonp:getRankingSong.jsonp
			}).then((res)=>{
				
				if(res.body.code == ERR_OK){
					this.data = res.body;
					this.initRankSong();
				}
			})
		},
		methods:{
			initRankSong(){
				let result = []
				this.data.songlist.forEach((item)=>{
					result.push(createSong(item.data))
				})
				this.rankingSong = result;
			}
		}
	}
</script>

<style>
	.rank-list-box{
		position:fixed;
		top: 0;
		bottom: 0;
		width: 100%;
		z-index: 99;
	}
</style>