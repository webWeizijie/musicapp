<template>
	<transition name="slide">
		<div class="add-song" v-show="addSongState" @click.stop>
			<div class="header">
				<h1 class="title">添加歌曲到列表</h1>
				<div class="close" @click="addSonghide">
					<i class="icon-close"></i>
				</div>
			</div>
			<search-box placeholder="搜索歌曲" @query="getQuery" ref="searchBox"></search-box>
			<div class="shortcut" v-show="query == ''">
				<switches :switches="switches" :currentIndex="currentIndex" @switch="changeCurrentIndex"></switches>
				<div class="list-wrapper">
					<scroll v-show="currentIndex == 0" ref="songList" :data="playHistory" class="play-history-box">
						<song-list :songs="playHistory" @select="selectSong">
						</song-list>
					</scroll>
					<scroll v-show="currentIndex == 1" :data="searchHistory" :refreshDelay="refreshDelay" class="list-wrapper-history" ref="searchList">
						<search-list :searches="searchHistory" @select="selectHot" @delete="deleteItem" @clear="clearAll"></search-list>
					</scroll>
				</div>
			</div>
			<div class="search-result" v-show="query">
				<suggest :query="query" @select="selectItem"></suggest>
				<top-tip ref="topTip">
					<div class="tip-title">
						<i class="icon-ok"></i>
						<span class="text">1首歌曲已经添加到播放列表</span>
					</div>
				</top-tip>
			</div>
			<confirm ref="confirmBox" text="是否清空所有搜索历史" @confirm="clearSearchAll"></confirm>
		</div>
	</transition>
</template>

<script>
	import searchBox from 'base/search-box/search-box'
	import switches from 'base/switches/switches'
	import searchList from 'base/search-list/search-list'
	import scroll from 'base/scroll/scroll'
	import { addSongList } from 'common/js/mixin.js'
	import suggest from 'components/suggest/suggest'
	import topTip from 'base/top-tip/top-tip'
	import confirm from 'base/confirm/confirm'
	import songList from 'base/song-list/song-list'
	import Song from 'common/js/song.js'
	export default {
		mixins: [addSongList],
		data() {
			return {
				addSongState: false,
				switches: [{
						name: '最近播放',
					},
					{
						name: '搜索历史',
					}
				],
				currentIndex: 0,
				query: '',
				refreshDelay: 120,
			}
		},
		methods: {
			addSongShow() {
				this.addSongState = true;
				this.normalScroll();
			},
			addSonghide() {
				this.addSongState = false;
			},
			changeCurrentIndex(index) {
				this.currentIndex = index;
			},
			getQuery(query) {
				this.query = query;
			},
			selectItem() {
				this.saveSearchHistory(this.query);
				this.$refs.topTip.show();
			},
			selectHot(item) {
				this.$refs.searchBox.setQuery(item);
			},
			deleteItem(item) {
				this.deleteSearchHistory(item)
			},
			clearAll() {
				this.$refs.confirmBox.show();
			},
			clearSearchAll() {
				this.clearSearchHistory()
			},
			normalScroll() {
				setTimeout(() => {
					if(this.currentIndex === 0) {
						this.$refs.songList.refresh()
					} else {
						this.$refs.searchList.refresh()
					}
				}, 20)
			},
			selectSong(item,index){
				if (index !== 0) {
				  this.$refs.topTip.show();
		          this.insertSong(new Song(item))
		       }
			}
		},
		components: {
			searchBox,
			switches,
			searchList,
			scroll,
			suggest,
			topTip,
			confirm,
			songList
		},
		watch: {
			//			query(newQuery){
			//				if(!newQuery){
			//					setTimeout(()=>{
			//						this.$refs.wrapperHistory.refresh();
			//					},20)
			//				}
			//			}
			currentIndex() {
				this.normalScroll();
			}
		}
	}
</script>

<style scoped>
	.add-song {
		position: fixed;
		top: 0;
		bottom: 0;
		width: 100%;
		z-index: 200;
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
	
	.add-song .header {
		position: relative;
		height: 44px;
		text-align: center;
	}
	
	.header .title {
		line-height: 44px;
		font-size: 18px;
		color: #fff;
		font-weight: 400;
	}
	
	.add-song .header .close {
		position: absolute;
		top: 0;
		right: 8px;
	}
	
	.add-song .header .close .icon-close {
		display: block;
		padding: 12px;
		font-size: 20px;
		color: #ffcd32;
	}
	
	.search-box-wrapper {
		margin: 20px;
	}
	
	.shortcut .list-wrapper {
		position: absolute;
		top: 165px;
		bottom: 0;
		width: 100%;
	}
	
	.list-scroll {
		height: 100%;
		overflow: hidden;
	}
	
	.list-inner {
		padding: 20px 30px;
	}
	
	.search-result {
		position: fixed;
		top: 124px;
		bottom: 0;
		width: 100%;
		overflow: hidden;
	}
	
	.search-result .tip-title {
		text-align: center;
		padding: 18px 0;
		font-size: 0;
	}
	
	.search-result .icon-ok {
		font-size: 14px;
		color: #ffcd32;
		margin-right: 4px;
	}
	
	.search-result .text {
		font-size: 14px;
		color: #fff;
	}
	
	.list-wrapper-history {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
		overflow: hidden;
	}
	
	.play-history-box {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
		overflow: hidden;
	}
</style>