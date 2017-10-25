<template>
	<transition name="slide">
		<div class="user-center">
			<div class="back" @click="back">
				<i class="icon-back"></i>
			</div>
			<div class="switches-wrapper">
				<switches @switch="switchItem" :switches="switchesText" :currentIndex="currentIndex"></switches>
			</div>
			<div ref="playBtn" class="play-btn">
				<i class="icon-play"></i>
				<span class="text">随机播放全部</span>
			</div>
			<div class="list-wrapper" ref="listWrapper">
				<scroll ref="favoriteList" class="list-scroll" v-if="currentIndex===0">
					<div class="list-inner">
						<song-list @select="selectSong" :songs="favoriteSongs"></song-list>
					</div>
				</scroll>
				<scroll ref="scrollBox" class="list-scroll" v-if="currentIndex===1" :data="playHistory">
					<div class="list-inner">
						<song-list :songs="playHistory" @select="selectSong"></song-list>
					</div>
				</scroll>
			</div>
			<div class="no-result-wrapper" v-show="noResult">
				<no-result :title="noResultDesc"></no-result>
			</div>
		</div>
	</transition>
</template>

<script type="text/ecmascript-6">
	import switches from 'base/switches/switches'
	import scroll from 'base/scroll/scroll'
	import songList from 'base/song-list/song-list'
	import {userCenter,playlistMixin} from 'common/js/mixin.js'
	import {getPlayerHistory} from 'common/js/catch.js'
	import noResult from 'base/no-result/no-result'
	import Song from 'common/js/song.js'
	export default {
		mixins:[userCenter,playlistMixin],
		data() {
			return {
				switchesText: [{
					name: '我喜欢的',
				}, {
					name: '最近听的',
				}],
				currentIndex: 0,
				noResult:true,
				noResultDesc:'暂无收藏歌曲',
				favoriteSongs:[]
			}
		},
		methods: {
			back() {
				this.$router.back();
			},
			switchItem(currentIndex){
				this.currentIndex = currentIndex;
			},
			selectSong(item,index){
				if (index !== 0) {
		          this.insertSong(new Song(item))
		       }
			},
			favoriteList(){
				
			},
			handlePlaylist(playlist){
				if(playlist.length > 0 && this.songs != '' && this.$refs.scrollBox){
					setTimeout(()=>{
						this.$refs.listWrapper.style.bottom = this.minPlayerHeight+ 'px';
						this.$refs.scrollBox.refresh();
					},20)
				}else if(playlist.length == 0 && this.songs != '' && this.$refs.scrollBox){
					setTimeout(()=>{
						this.$refs.listWrapper.style.bottom = 0;
						this.$refs.scrollBox.refresh();
					},20)	
				}
			}
		},
		components: {
			switches,
			scroll,
			songList,
			noResult
		},
		mounted(){
			
		},
		computed:{
			playHistory(){
				return getPlayerHistory()
			}
		},
		watch:{
			currentIndex(newVaule){
					this.handlePlaylist(this.playlist);
					if(newVaule == 0 && this.favoriteSongs == ''){
							this.noResult = true;
							return
					}else if(newVaule == 1 && this.playHistory == ''){
							this.noResult = true;
							return
					}
					this.noResult = false;
			}
		}
	}
</script>

<style scoped>
	.user-center {
		position: fixed;
		top: 0;
		bottom: 0;
		z-index: 100;
		width: 100%;
		background: #222;
	}
	
	.slide-enter-active,
	.slide-leave-active {
		transition: all 0.3s;
	}
	
	.slide-enter,
	.slide-leave-to {
		transform: translate3d(100%, 0, 0);
	}
	
	.back {
		position: absolute;
		top: 0;
		left: 6px;
		z-index: 50;
	}
	
	.icon-back {
		display: block;
		padding: 10px;
		font-size: 22px;
		color: #ffcd32;
	}
	
	.switches-wrapper {
		margin: 10px 0 30px 0;
	}
	
	.play-btn {
		box-sizing: border-box;
		width: 135px;
		padding: 7px 0;
		margin: 0 auto;
		text-align: center;
		border: 1px solid rgba(255, 255, 255, 0.5);
		color: rgba(255, 255, 255, 0.5);
		border-radius: 100px;
		font-size: 0;
	}
	
	.icon-play {
		display: inline-block;
		vertical-align: middle;
		margin-right: 6px;
		font-size: 16px;
	}
	
	.text {
		display: inline-block;
		vertical-align: middle;
		font-size: 12px;
	}
	
	.list-wrapper {
		position: absolute;
		top: 110px;
		bottom: 0;
		width: 100%;
	}
	
	.list-scroll {
		height: 100%;
		overflow: hidden;
	}
	
	.list-inner {
		
	}
	
	.no-result-wrapper {
		position: absolute;
		width: 100%;
		top: 50%;
		transform: translateY(-50%);
	}
</style>