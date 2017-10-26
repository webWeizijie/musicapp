<template>
	<transition name="slide">
		<div class="user-center">
			<div class="back" @click="back">
				<i class="icon-back"></i>
			</div>
			<div class="switches-wrapper">
				<switches @switch="switchItem" :switches="switchesText" :currentIndex="currentIndex"></switches>
			</div>
			<div ref="playBtn" class="play-btn" @click="random">
				<i class="icon-play"></i>
				<span class="text">随机播放全部</span>
			</div>
			<div class="list-wrapper" ref="listWrapper">
				<scroll ref="favoriteList" class="list-scroll" v-show="currentIndex===0">
					<div class="list-inner">
						<song-list @select="selectSong" :songs="favoriteSong"></song-list>
					</div>
				</scroll>
				<scroll ref="scrollBox" class="list-scroll" v-show="currentIndex===1" :data="playHistory">
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
	import { userCenter, playlistMixin } from 'common/js/mixin.js'
	import { getPlayerHistory } from 'common/js/catch.js'
	import noResult from 'base/no-result/no-result'
	import Song from 'common/js/song.js'
	export default {
		mixins: [userCenter, playlistMixin],
		data() {
			return {
				switchesText: [{
					name: '我喜欢的',
				}, {
					name: '最近听的',
				}],
				currentIndex: 0,
				favoriteSongs: []
			}
		},
		methods: {
			back() {
				this.$router.back();
			},
			switchItem(currentIndex) {
				this.currentIndex = currentIndex;
			},
			selectSong(item, index) {
				this.insertSong(new Song(item))
			},
			favoriteList() {

			},
			handlePlaylist(playlist) {
				if(playlist.length > 0 && this.songs != '') {
					this.$refs.listWrapper.style.bottom = this.minPlayerHeight + 'px';
				} else if(playlist.length == 0 && this.songs != '') {
					this.$refs.listWrapper.style.bottom = 0;
				}
				this.initScroll()
			},
			initScroll() {
				let scroll = this.$refs.favoriteList
				if(this.currentIndex == 1) {
					scroll = this.$refs.scrollBox
				}
				setTimeout(() => {
					scroll.refresh();
				})
			},
			random() {
				let songs = []
				if(this.currentIndex == 0 && this.favoriteSong != '') {
					songs = this.favoriteSong;
				} else if(this.currentIndex == 1 && this.playHistory != '') {
					songs = this.playHistory;
				} else {
					return
				}
				let newsongs = songs.map((item) => {
					return new Song(item)
				})
				this.randomPlay({
					list: newsongs
				})
			}
		},
		components: {
			switches,
			scroll,
			songList,
			noResult
		},
		mounted() {

		},
		computed: {
			noResult() {
				if(this.currentIndex === 0) {
					return !this.favoriteSong.length
				} else {
					return !this.playHistory.length
				}
			},
			noResultDesc() {
				if(this.currentIndex === 0) {
					return '暂无收藏歌曲'
				} else {
					return '你还没有听过歌曲'
				}
			},
		},
		watch: {
			currentIndex() {
				this.initScroll()
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
	
	.list-inner {}
	
	.no-result-wrapper {
		position: absolute;
		width: 100%;
		top: 50%;
		transform: translateY(-50%);
	}
</style>