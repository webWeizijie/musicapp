<template>
	<div class="music-list">
		<div class="back-box">
			<div class="back" @click="routeBack"><i class="icon-back"></i></div>
			<div class="singer-name">{{title}}</div>
		</div>
		
		<div class="music-singer" ref="musicSinger">
			<div class="singer-img" :style="singerPic" v-if="this.pic"></div>
			<div class="singer-filter"></div>
			<div class="play-wrapper" v-show="songs.length > 0" @click="random">
				<div class="play" style=""><i class="icon-play"></i> <span class="text">随机播放全部</span></div>
			</div>
		</div>
		<div class="loading" v-show="songs == ''">
			<loading></loading>
		</div>
		<div class="lazyer" ref="lazyer">
			
		</div>
		<scroll-view :listenScroll="listenScroll" :probeType="probeType" @getScrollJs="getScroll" class="music-list-box" :data="songs" v-if="songs != ''" ref="list">
			<div>
				<song-list :songs="songs" @select="selectSong" :rankingState="rankingState"></song-list>
			</div>
		</scroll-view>
	</div>
</template>

<script>
	import scrollView from 'base/scroll/scroll'
	import songList from 'base/song-list/song-list'
	import loading from 'base/loading/loading'
	import {mapActions} from 'vuex'
	import {playlistMixin} from 'common/js/mixin'

	export default{
		mixins:[playlistMixin],
		props:{
			songs:{
				type:Array,
				default(){
					return []
				}
			},
			title:{
				type:String,
				default:''
			},
			pic:{
				type:String,
				default:''
			},
			rankingState:{
				type:Boolean,
				default:false,
			}
		},
		data(){
			return {
				
			}
		},
		components:{
			scrollView,
			loading,
			songList
		},
		computed:{
			singerPic(){
				return `background-image: url(${this.pic})`
			}
		},
		created(){
			this.listenScroll = true;
			this.probeType = 3;
		},
		mounted(){
			this.lazyerHeight = this.$refs.lazyer.offsetTop;
			this.musicSingerHeight = this.$refs.musicSinger.clientHeight;
		},
		methods:{
			getScroll(scrollY){
				this.scrollY = scrollY;
				this.initLazyerHeight(scrollY)
			},
			initLazyerHeight(scrollY){
				let height = -scrollY;
				let musicSinger = this.$refs.musicSinger;
				let backHeight = document.getElementsByClassName('back')[0].clientHeight;
				let maxHeight = -this.musicSingerHeight + backHeight;
				if(height < maxHeight){
					height = maxHeight;
					musicSinger.style.height = backHeight + 'px';
					musicSinger.style.zIndex = 99;
				}else{
					musicSinger.style.height = this.musicSingerHeight + 'px';
					musicSinger.style.zIndex = 0;
				}
				if(height > 0){
					let scale = (height + this.musicSingerHeight ) / this.musicSingerHeight
					musicSinger.style['transform'] = `scale(${scale})`
				}
				this.$refs.lazyer.style['transform'] = `translate3d(0,${height}px,0)`;
			},
			routeBack(){
				this.$router.back();
			},
			selectSong(item,index){
				let list = this.songs;
				this.selectPlay({list,index});
			},
			random(){
				this.randomPlay({
					list:this.songs
				})
			},
			handlePlaylist(playlist){
				if(playlist.length > 0 && this.songs != ''){
					setTimeout(()=>{
						this.$refs.list.$el.style.bottom = this.minPlayerHeight+ 'px';
						this.$refs.list.refresh();
					},20)
				}else if(playlist.length == 0 && this.songs != ''){
					setTimeout(()=>{
						this.$refs.list.$el.style.bottom = 0;
						this.$refs.list.refresh();
					},20)	
				}
			},
			...mapActions({
				selectPlay:'selectPlay',
				randomPlay:'randomPlay'
			})
			
		},
		watch:{
			songs(){
				this.handlePlaylist(this.playlist)
			}
		}
	}
</script>

<style scoped>
	.music-list {
		width: 100%;
		position: fixed;
		z-index: 100;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background: #222;
	}
	
	.singer-img {
		width: 100%;
		height: 4.3rem;
		background-position: center top;
		background-size: cover;
		background-repeat: no-repeat;
	}
	
	.music-singer {
		position: relative;
		width: 100%;
		height: 4.3rem;
		overflow: hidden;
	}
	
	.singer-filter {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(7, 17, 27, .4);
	}
	
	.back {
		position: absolute;
		top: 0;
		padding: 0.16rem 0.15rem 0.12rem 0.26rem;
		color: #ffcd32;
		font-size: 0.36rem;
		z-index: 30;
	}
	
	.singer-name {
		position: absolute;
		top: 0;
		width: 76%;
		padding-top: 0.19rem;
		color: #ffffff;
		font-size: 0.29rem;
		z-index: 10;
		text-align: center;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		left: 12%;
	}
	
	.play-wrapper {
		position: absolute;
		width: 100%;
		top: 3.44rem;
	}
	
	.play-wrapper .play {
		width: 2.16rem;
		padding: 0.12rem 0;
		margin: 0 auto;
		text-align: center;
		border: 1px solid #ffcd32;
		color: #ffcd32;
		border-radius: 0.3rem;
		font-size: 0;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
	/*@media screen and (-webkit-min-device-pixel-ratio:2) {
		.play-wrapper .play {
			border: 0.5px solid #ffcd32;
		}
	}
	
	@media screen and (-webkit-min-device-pixel-ratio:3) {
		.play-wrapper .play {
			border: 0.3px solid #ffcd32;
		}
	}*/
	
	.play-wrapper .play .icon-play {
		margin-right: 0.09rem;
		font-size: 0.26rem;
	}
	
	.play-wrapper .play .text {
		font-size: 0.19rem;
	}
	
	.music-list-box{
		width: 100%;
		position: fixed;
		top: 4.3rem;
		bottom: 0;
	}
	.loading{
		position: fixed;
		top: 4.83rem;
		width: 100%;
		z-index: 99;
	}
	.lazyer{
		position: fixed;
		top: 4.3rem;
		width: 100%;
		background: #222;
		bottom: 0;
	}
	.back-box{
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 100;
	}
</style>