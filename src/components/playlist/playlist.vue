<template>
	<transition name="list-fade">
		<div class="playlist" @click="closePlayList" v-show="flagShow">
			<div class="list-wrapper" @click.stop>
				<div class="list-header">
					<h1 class="title"><i class="icon" :class="iconMode" @click.stop="changeMode"></i> <span class="text">{{modeText}}</span><span class="clear" @click="clear"><i class="icon-clear"></i></span></h1></div>
				<scroll class="list-content" :data="sequenceList" :refreshDelay="refreshDelay" ref="listContent">
					<transition-group tag="ul" name="list">
						<li class="item" v-for="(item,index) in sequenceList" :key="item.id" @click="selectSong(index,item)" ref="songItem">
							<i class="current" :class="currentNowSong(item)"></i>
							<span class="text">{{item.name}}</span>
							<span class="like" @click.stop="addFavorite(item)"><i :class="favoriteIcon(item)"></i></span>
							<span class="delete" @click.stop="chooseDeleteSong(item)"><i class="icon-delete"></i></span>
						</li>
					</transition-group>
				</scroll>
				<div class="list-operate">
					<div class="add" @click="openAddsong">
						<i class="icon-addsong"></i>
						<span class="text">添加歌曲到队列</span>
					</div>
				</div>
				<div class="list-close" @click="closePlayList">
					<span>关闭</span>
				</div>
			</div>
			<confirm ref="confirm" text="是否清空播放列表" confirmBtnText="清空" @confirm="clearSongs"></confirm>
			<addSong ref="addSong"></addSong>
		</div>
	</transition>
</template>

<script>
	import Scroll from 'base/scroll/scroll'
	import Confirm from 'base/confirm/confirm'
	import {playerMixin} from 'common/js/mixin'
	import {playMode} from 'common/js/config.js'
	import addSong from 'components/add-song/add-song'
	
	export default {
		mixins: [playerMixin],
		data() {
			return {
				flagShow: false,
				refreshDelay:120,
			}
		},
		computed:{
			modeText() {
			   return this.mode === playMode.sequence ? '顺序播放' : this.mode === playMode.random ? '随机播放' : '单曲循环'
			}
		},
		components: {
			Scroll,
			Confirm,
			addSong
		},
		methods: {
			closePlayList() {
				this.flagShow = false;
			},
			openPlayList() {
				this.flagShow = true;
				setTimeout(() => {
		          this.$refs.listContent.refresh()
		          this.scrollToNowSong()
		        }, 20);
		        
			},
			changeMode(){
				const mode = (this.mode + 1) % 3;
				this.setPlayMode(mode);
			},
			currentNowSong(item){
				if(item.id === this.currentSong.id){
					return 'icon-play'
				}
				return ''
				
			},
			chooseDeleteSong(item){
				this.deleteSong(item)
			},
			clear(){
				this.$refs.confirm.show()
			},
			clearSongs(){
				
				this.clearAllSongs();
				
			},
			selectSong(index,item){
				let setCurrentIndex = this.playlist.findIndex((playListItem)=>{
					return playListItem.id == item.id
				})
				this.setCurrentIndex(setCurrentIndex);
				this.setPlayingState(true);
				this.scrollToNowSong()
			},
			scrollToNowSong(){
				
				let songItem = this.$refs.songItem;
				let index = this.sequenceList.findIndex((item)=>{
					return item.id == this.currentSong.id
				})
				this.$refs.listContent.scrollToElement(songItem[index],200)
			},
			openAddsong(){
				this.$refs.addSong.addSongShow();
			},
			addFavorite(item){
				this.setFavoriteSong(item);
			},
			favoriteIcon(song){
				let index = this.favoriteSong.findIndex((item)=>{
					return item.id == song.id
				})
				return index > -1? 'icon-favorite' : 'icon-not-favorite'
				
			},
		},
		mounted(){
			
		},
		watch:{
			sequenceList(newValue){
				if(newValue.length == 0){
					this.flagShow = false;
				}
			}
		}
	}
</script>

<style scoped>
	.playlist {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 200;
		background-color: rgba(0, 0, 0, 0.3);
	}
	
	.list-fade-enter-active,
	.list-fade-leave-active {
		transition: opacity 0.3s;
	}
	
	.list-wrapper {
		transition: all 0.3s;
	}
	
	.list-fade-enter,
	.list-fade-leave-to {
		opacity: 0;
	}
	
	.list-fade-enter .list-wrapper,
	.list-fade-leave-to .list-wrapper {
		transform: translate3d(0, 100%, 0);
	}
	
	.list-wrapper {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		background-color: #333;
	}
	
	.list-header {
		position: relative;
		padding: 20px 30px 10px 20px;
	}
	
	.title {
		display: flex;
		align-items: center;
	}
	
	.icon {
		margin-right: 10px;
		font-size: 30px;
		color: rgba(255, 205, 49, 0.5);
	}
	
	.list-header .text {
		flex: 1;
		font-size: 14px;
		color: rgba(255, 255, 255, 0.5);
		font-weight: 400;
	}
	
	.clear {
		position: relative;
		display:block;
	}
	
	.icon-clear {
		font-size: 14px;
		color: rgba(255, 255, 255, 0.3);
		display: block;
	}
	
	.list-content {
		max-height: 240px;
		overflow: hidden;
	}
	
	.item {
		display: flex;
		align-items: center;
		height: 40px;
		padding: 0 30px 0 20px;
		overflow: hidden;
	}
	
	.list-enter-active,
	.list-leave-active {
		transition: all 0.1s;
	}
	
	.list-enter,
	.list-leave-to {
		height: 0;
	}
	
	.current {
		flex: 0 0 20px;
		width: 20px;
		font-size: 12px;
		color: rgba(255, 205, 49, 0.5);
	}
	
	.item .text {
		flex: 1;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		font-size: 14px;
		color: rgba(255, 255, 255, 0.3);
		font-weight: 400;
	}
	
	.like {
		position: relative;
	}
	
	
	.icon-favorite {
		color: #d93f30;
	}
	
	.delete {
		position: relative;
	}
	
	.list-operate {
		width: 140px;
		margin: 20px auto 30px auto;
	}
	
	.add {
		display: flex;
		align-items: center;
		padding: 8px 16px;
		border: 1px solid rgba(255, 255, 255, 0.5);
		border-radius: 100px;
		color: rgba(255, 255, 255, 0.5);
	}
	
	.icon-addsong {
		margin-right: 5px;
		font-size: 12px;
	}
	
	.list-operate .text {
		font-size: 12px;
	}
	
	.list-close {
		text-align: center;
		line-height: 50px;
		background: #222;
		font-size: 16px;
		color: rgba(255, 255, 255, 0.5);
	}
	
	.playlist .list-wrapper .list-content .delete {
		position: relative;
		font-size: 12px;
		color: #ffcd32;
	}
	
	.playlist .list-wrapper .list-content .like {
		position: relative;
		margin-right: 15px;
		font-size: 12px;
		color: #ffcd32;
	}
	
	.playlist .list-wrapper .list-content .current {
		-webkit-box-flex: 0;
		-ms-flex: 0 0 20px;
		flex: 0 0 20px;
		width: 20px;
		font-size: 12px;
		color: rgba(255, 205, 49, .5);
	}
	
	.playlist .list-wrapper .list-header .title .clear .icon-clear {
		font-size: 14px;
		color: hsla(0, 0%, 100%, .3);
	}
	
	.playlist .list-wrapper .list-header .title .icon {
		margin-right: 10px;
		font-size: 30px;
		color: rgba(255, 205, 49, .5);
	}
	
</style>