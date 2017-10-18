<template>
	<div class="player-box" v-show="playlist.length > 0">
		<transition name="normal" @enter="enter" @after-enter="afterEnter" @leave="leave" @after-leave="afterLeave">
			<div class="player" v-show="fullScreen">
				<div class="background" :style="`background-image:url(${currentSong.image})`"></div>
				<div class="player-title" ref="playerTitle">
					<div class="back" @click="back"><i class="icon-back"></i></div>
					<h1 class="title">{{currentSong.name}}</h1>
					<h2 class="subtitle">{{currentSong.singer}}</h2>
				</div>
				<div class="middle">
					<div class="middlel">
						<div class="cd-wrapper" ref="cdWrapper">
							<div class="cd" :class="playing?'play':'paused'"><img class="image" :src="currentSong.image"></div>
						</div>
					</div>
				</div>
				<div class="bottom">
					<div class="song-progress">
						<div class="songl">{{format(currentTime)}}</div>
						<div class="progress" ref="progress">
							<div class="progress-cont" :style="`width:${currentProgress}px`"></div>
							<div class="progress-btn-wapper" @touchstart="progressStart" @touchmove="progressMove" @touchend="progressEnd" :style="`transform:translate3d(${currentProgress}px,0,0)`">
								<div class="progress-btn"></div>
							</div>
						</div>
						<div class="songr">{{format(currentSong.duration)}}</div>
					</div>
					<div class="operators">
						<div class="icon i-left"><i class="icon-sequence"></i></div>
						<div class="icon i-left" @click="songPre" :class="{'disable':!songReady}"><i class="icon-prev"></i></div>
						<div class="icon i-center" @click="changePlaying" :class="{'disable':!songReady}"><i :class="playing?'icon-pause':'icon-play'"></i></div>
						<div class="icon i-right" @click="songNext" :class="{'disable':!songReady}"><i class="icon-next"></i></div>
						<div class="icon i-right"><i class="icon icon-not-favorite"></i></div>
					</div>
				</div>
			</div>
		</transition>
		<transition name="mini">
			<div class="min-player" v-show="!fullScreen" @click="open">
				<div class="min-player-img" :class="playing?'play':'paused'" ref="minPlayerImg">
					<img class="image" :src="currentSong.image">
				</div>
				<div class="min-player-info">
					<div class="title">{{currentSong.name}}</div>
					<div class="singer">{{currentSong.singer}}</div>
				</div>
				<div class="min-playin-icon" @click.stop="changePlaying">
					<div class="progress-circle">
						<svg viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
							<circle r="50" cx="50" cy="50" fill="transparent" class="progress-background"></circle>
							<circle r="50" cx="50" cy="50" fill="transparent" class="progress-bar" ref="progressBar" stroke-dasharray="314.1592653589793"></circle>
						</svg> 
						<i class="icon-mini" :class="playing?'icon-pause-mini':'icon-add'"></i>
					</div>
				</div>
				<div class="control list-icon"><i class="icon-playlist"></i></div>
			</div>
		</transition>
		<audio ref="audio" :src="currentSong.url" @canplay="audioReady" @error="audioError" @timeupdate="updateTime" @ended="songNext"></audio>
	</div>
</template>

<script>
	import { mapGetters, mapMutations } from 'vuex'
	import animations from 'create-keyframe-animation'
	export default {
		data(){
			return{
				songReady:false,
				currentTime:0,
				currentProgress:0,
				nowModify:false,
			}
		},
		computed: {
			...mapGetters({
				playlist: 'playlist',
				fullScreen: 'fullScreen',
				currentSong: 'currentSong',
				playing: 'playing',
				currentIndex:'currentIndex'
			})
		},
		created() {
			
		},
		methods: {
			back() {
				this.setFullScreen(false);
			},
			open() {
				this.setFullScreen(true);
				this._getPosAndScale()
			},
			changePlaying() {
				this.setPlayingState(!this.playing);
				
			},
			enter(el, done) {
				const {
					x,
					y,
					scale
				} = this._getPosAndScale();
				let animation = {
					0: {
						transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
					},
					60: {
						transform: `translate3d(0,0,0) scale(1.1)`
					},
					100: {
						transform: `translate3d(0,0,0) scale(1)`
					}
				}
				animations.registerAnimation({
					name: 'move',
					animation,
					presets: {
						duration: 500,
						easing: 'linear'
					}
				})
				animations.runAnimation(this.$refs.cdWrapper, 'move', done);
			},
			afterEnter() {
				animations.unregisterAnimation('move');
				this.$refs.cdWrapper.style.animation = ''
			},
			leave(el, done) {
				this.$refs.cdWrapper.style.transition = 'all 0.4s';
				const {
					x,
					y,
					scale
				} = this._getPosAndScale();
				this.$refs.cdWrapper.style['transform'] = `translate3d(${x}px,${y}px,0) scale(${scale})`
				this.$refs.cdWrapper.addEventListener('transitionend', done);
			},
			afterLeave() {
				this.$refs.cdWrapper.style.transition = '';
				this.$refs.cdWrapper.style['transform'] = '';
			},
			_getPosAndScale() {
				let minPlayerImg = this.$refs.minPlayerImg;
				const targetWidth = minPlayerImg.clientWidth;
				const paddingLeft = minPlayerImg.offsetLeft;

				const paddingBottom = minPlayerImg.offsetTop;

				let cdWrapper = this.$refs.cdWrapper;
				const top = this.$refs.playerTitle.clientHeight;
				const width = cdWrapper.clientWidth;
				
				const scale = targetWidth / width;
				const x = -(window.innerWidth / 2 - paddingLeft - (targetWidth / 2));
				const y = window.innerHeight - top - width / 2 - paddingBottom - (targetWidth / 2);

				return {
					x,
					y,
					scale
				}
			},
			songPre(){
				if(!this.songReady){
					return
				}
				this.songReady = false;
				let index = this.currentIndex == 0 ? this.playlist.length - 1 : this.currentIndex - 1
				this.setCurrentIndex(index);
				if(!this.playing){
					this.changePlaying();
				}
			},
			songNext(){
				if(!this.songReady){
					return
				}
				this.songReady = false;
				let index = this.currentIndex == this.playlist.length - 1?0:this.currentIndex + 1
				this.setCurrentIndex(index);
				if(!this.playing){
					this.changePlaying();
				}
			},
			audioReady(){
				this.songReady = true;
			},
			audioError(){
				this.songReady = true;
			},
			updateTime(e){
				this.currentTime = e.target.currentTime;
			},
			format(interval){
				interval = interval | 0;
				const minute = interval / 60 | 0;
				
				const second = this._pad(interval % 60);
				return `${minute}:${second}`
			},
			_pad(num,n=2){
				let len = num.toString().length;
				while(len < n){
					num = '0' + num
					len++
				}
				return num
			},
			progressStart(e){
				this.startX = e.touches[0].clientX;
				this.startProgress = this.currentProgress;
				this.nowModify = true;
			},
			progressMove(e){
				this.moveX = e.touches[0].clientX;
				this.diff = this.moveX - this.startX;
				let res = this.diff + this.startProgress;
				
				if(res < 0){
					res = 0;
				}else if(res > this.progressWidth){
					res = this.progressWidth;
				}
				console.log(res)
				this.currentProgress = res;
			},
			progressEnd(){
				this.$refs.audio.currentTime = this.currentProgress / this.progressWidth * this.currentSong.duration;
				this.nowModify = false;
			},
			...mapMutations({
				setFullScreen: 'SET_FULL_SCREEN',
				setPlayingState: 'SET_PLAYING_STATE',
				setCurrentIndex:'SET_CURRENT_INDEX'
			})
		},
		mounted(){
			
		},
		watch:{
			currentSong(){
				this.$nextTick(()=>{
					this.$refs.audio.play()
					
				})
			},
			playing(newPlaying){
				let audio = this.$refs.audio;
				this.$nextTick(()=>{
					newPlaying?audio.play():audio.pause();
				})
			},
			currentTime(){
				let width = this.$refs.progress.clientWidth;
				this.progressWidth = width - 12;
				let currentProgress = this.progressWidth * (this.currentTime / this.currentSong.duration);
				this.minCurrentProgress = 314.1592653589793 * (1 - this.currentTime / this.currentSong.duration);
				this.$refs.progressBar.setAttribute('stroke-dashoffset',this.minCurrentProgress)
				if(!this.nowModify){
					if(currentProgress > this.progressWidth){
						currentProgress = this.progressWidth;
					}
					this.currentProgress = currentProgress
				}
			}
		}
	}
</script>

<style scoped>
	.player-box {
		z-index: 200;
	}
	
	.player {
		position: fixed;
		top: 0;
		bottom: 0;
		width: 100%;
		background: #222;
		z-index: 200;
	}
	
	.player .background {
		width: 100%;
		height: 100%;
		background-repeat: no-repeat;
		opacity: 0.6;
		filter: 0.4rem;
		position: absolute;
		left: 0;
		top: 0;
		z-index: -1;
		filter: blur(0.32rem);
		background-size: 100% 100%;
		background-position: center;
	}
	
	.player-title {
		position: relative;
		text-align: center;
		padding-top: 1px;
		height: 1.26rem;
	}
	
	.player-title .back {
		position: absolute;
		display: block;
		padding: 0.23rem 0.14rem 0.14rem 0.29rem;
		font-size: 0.36rem;
		color: #ffcd32;
		-webkit-transform: rotate(-90deg);
		transform: rotate(-90deg);
	}
	
	.player-title .title {
		margin: 0.16rem auto;
		font-size: 0.29rem;
		font-weight: normal;
		width: 66%;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	
	.player-title .subtitle {
		font-size: 0.23rem;
		font-weight: normal;
		margin-top: 0.24rem;
	}
	
	.middle {}
	
	.middle .middlel {
		width: 100%;
	}
	
	.middle .middlel .cd-wrapper {
		width: 4.88rem;
		height: 4.88rem;
		margin: 0 auto;
	}
	.middle .middlel .cd-wrapper .cd.play{
		animation: rotate 20s linear infinite;
	}
	.middle .middlel .cd-wrapper .cd.paused {
		animation-play-state: paused;
	}
	.min-player .min-player-img.play{
		animation: rotate 20s linear infinite;
	}
	.min-player .min-player-img.paused {
		animation-play-state: paused;
	}
	.middle .middlel .cd-wrapper .cd {
		width: 4.88rem;
		height: 4.88rem;
		border: 0.19rem solid hsla(0, 0%, 100%, .1);
		border-radius: 50%;
		box-sizing: border-box;
		animation: rotate 20s linear infinite;
	}
	
	.middle .middlel .cd-wrapper .cd img {
		display: block;
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}
	
	.player .bottom {
		position: absolute;
		bottom: 0.77rem;
		width: 100%;
	}
	
	.player .bottom .operators {
		padding: 0 0.3rem;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
	}
	
	.player .bottom .operators .icon {
		-webkit-box-flex: 1;
		-ms-flex: 1;
		flex: 1;
		color: #ffcd32;
		font-size: 0.48rem;
		text-align: center;
	}
	.player .bottom .operators .icon.disable{
		color: rgba(255,205,49,.5);
	}
	.player .bottom .operators .icon.i-center {
		font-size: 0.65rem;
	}
	
	.player-box .min-player {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 180;
		width: 100%;
		background: #333;
		height: 0.98rem;
	}
	
	.min-player-img {
		margin-left: 0.32rem;
		animation: rotate 20s linear infinite;
	}
	
	.min-player-img img {
		display: block;
		border-radius: 50%;
		width: 0.64rem;
		height: 0.64rem;
	}
	
	.min-player-info {
		margin-left: 0.18rem;
		flex-grow: 1;
	}
	
	.min-player-info .title {
		font-size: 0.23rem;
		color: #ffffff;
	}
	
	.min-player-info .singer {
		font-size: 0.2rem;
		color: #ffffff;
		color: hsla(0, 0%, 100%, .3);
		margin-top: 0.14rem;
	}
	
	.min-player .list-icon {
		font-size: 0.48rem;
		color: rgba(255, 205, 49, .5);
		margin-right: 0.17rem;
		height: 0.48rem;
		width: 0.48rem;
	}
	
	.min-player .icon-mini {
		font-size: 0.48rem;
		color: rgba(255, 205, 49, .5);
		margin-right: 0.17rem;
		height: 0.48rem;
		width: 0.48rem;
	}
	
	
	.normal-enter-active,
	.normal-leave-active {
		transition: all 0.4s;
	}
	
	.normal-enter-active .player-title,
	.normal-leave-active .player-title {
		transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
	}
	
	.normal-enter-active .bottom,
	.normal-leave-active .bottom {
		transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
	}
	
	.normal-enter,
	.normal-leave-to {
		opacity: 0;
	}
	
	.normal-enter .player-title,
	.normal-leave-to .player-title {
		transform: translate3d(0, -100px, 0);
	}
	
	.normal-enter .bottom,
	.normal-leave-to .bottom {
		transform: translate3d(0, 100px, 0);
	}
	.min-playin-icon{
		margin-right: 0.33rem;
		width: 0.5rem;
		height: 0.5rem;
	}
	.progress-circle {
		width: 0.5rem;
		height: 0.5rem;
		position: relative;
	}
	.progress-circle svg{
		width: 0.53rem;
		height: 0.53rem;
		position: absolute;
		top: -1px;
		left: -1px;	
	}
	.progress-circle circle.progress-background {
		-webkit-transform: scale(.9);
		transform: scale(.9);
		stroke: rgba(255, 205, 49, .5);
	}
	
	.progress-circle circle {
		stroke-width: 8px;
		-webkit-transform-origin: center;
		transform-origin: center;
	}
	
	.progress-circle circle.progress-bar {
		-webkit-transform: scale(.9) rotate(-90deg);
		transform: scale(.9) rotate(-90deg);
		stroke: #ffcd32;
	}
	.min-player .icon-mini{
	    font-size:0.51rem;
	    position: absolute;
	    left: 0;
	    top: 0;
	}
	@keyframes rotate
	{
		0%{
			transform: rotate(0);
		}
		100%{
			transform: rotate(360deg);
		}
	}
	.song-progress{
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: center;
		align-items: center;
		font-size:0.19rem;
		padding-bottom: 0.3rem;
	}
	.song-progress .songl{
		margin-right: 0.1rem;
	}
	.song-progress .songr{
		margin-left: 0.1rem;
	}
	.song-progress .progress{
		position: relative;
		width: 3.85rem;
		background: rgba(0,0,0,.3);
		height: 4px;
	}
	.progress .progress-cont{
		position: absolute;
		height: 100%;
		top: 0;
		left: 0;
		background: #ffcd32;
	}
	.progress .progress-btn-wapper{
		position: absolute;
	    left: -8px;
	    top: -13px;
	    width: 30px;
	    height: 30px;
	}
	.progress .progress-btn{
		position: relative;
	    top: 7px;
	    left: 7px;
	    box-sizing: border-box;
	    width: 16px;
	    height: 16px;
	    border: 3px solid #fff;
	    border-radius: 50%;
	    background: #ffcd32;
	}
</style>