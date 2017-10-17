<template>
	<div class="player-box" v-show="playlist.length > 0">
		<transition name="normal">
			<div class="player" v-show="fullScreen">
				<div class="background" :style="`background-image:url(${currentSong.image})`"></div>
				<div class="player-title">
					<div class="back" @click="back"><i class="icon-back"></i></div>
					<h1 class="title">{{currentSong.name}}</h1>
					<h2 class="subtitle">{{currentSong.singer}}</h2>
				</div>
				<div class="middle">
					<div class="middlel">
						<div class="cd-wrapper">
							<div class="cd"><img class="image" :src="currentSong.image"></div>
						</div>
					</div>
				</div>
				<div class="bottom">
	
					<div class="operators">
						<div class="icon i-left"><i class="icon-sequence"></i></div>
						<div class="icon i-left"><i class="icon-prev"></i></div>
						<div class="icon i-center"><i class="icon-pause"></i></div>
						<div class="icon i-right"><i class="icon-next"></i></div>
						<div class="icon i-right"><i class="icon icon-not-favorite"></i></div>
					</div>
				</div>
			</div>
		</transition>
		<transition name="mini">
			<div class="min-player" v-show="!fullScreen" @click="open">
				<div class="min-player-img">
					<img class="image" :src="currentSong.image">
				</div>
				<div class="min-player-info">
					<div class="title">{{currentSong.name}}</div>
					<div class="singer">{{currentSong.singer}}</div>
				</div>
				
				<div class="control list-icon"><i class="icon-playlist"></i></div>
			</div>
		</transition>
	</div>
</template>

<script>
	import { mapGetters, mapMutations } from 'vuex'
	export default {
		computed: {
			...mapGetters({
				playlist: 'playlist',
				fullScreen: 'fullScreen',
				currentSong: 'currentSong'
			})
		},
		created() {
			console.log(this.currentSong)
		},
		methods: {
			back() {
				this.setFullScreen(false);
			},
			open() {
				this.setFullScreen(true);
			},
			...mapMutations({
				setFullScreen: 'SET_FULL_SCREEN'
			})
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
		margin: 0.16rem 0;
		font-size: 0.29rem;
		font-weight: normal;
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
		margin: 0.36rem auto 0 auto;
	}
	
	.middle .middlel .cd-wrapper .cd {
		width: 4.88rem;
		height: 4.88rem;
		border: 0.19rem solid hsla(0, 0%, 100%, .1);
		border-radius: 50%;
		box-sizing: border-box;
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
	.progress-circle{
		width: 30px;
		height: 30px;
	    position: relative;
	}
	.min-player .icon-mini {
	    font-size: 0.48rem;
	    color: rgba(255, 205, 49, .5);
	    margin-right: 0.17rem;
	    height: 0.48rem;
	    width: 0.48rem;
	}
	.progress-circle circle.progress-background {
	    -webkit-transform: scale(.9);
	    transform: scale(.9);
	    stroke: rgba(255,205,49,.5);
	}
	
	
	.progress-circle circle {
	    stroke-width: 8px;
	    -webkit-transform-origin: center;
	    transform-origin: center;
	}
	.progress-circle circle.progress-bar{
	    -webkit-transform: scale(.9) rotate(-90deg);
	    transform: scale(.9) rotate(-90deg);
	    stroke: #ffcd32;
	}
	.normal-enter-active,.normal-leave-active{
		transition: all 0.4s;
	}
	.normal-enter-active .player-title,.normal-leave-active .player-title{
		transition: all 0.4s cubic-bezier(0.86,0.18,0.82,1.32);
	}
	.normal-enter-active .bottom,.normal-leave-active .bottom{
		transition: all 0.4s cubic-bezier(0.86,0.18,0.82,1.32);
	}
	.normal-enter,.normal-leave-to{
		opacity: 0;
	}
	.normal-enter .player-title,.normal-leave-to .player-title{
		transform: translate3d(0,-100px,0);
	}.normal-enter .bottom,.normal-leave-to .bottom{
		transform: translate3d(0,100px,0);
	}
</style>