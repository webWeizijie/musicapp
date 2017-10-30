<template>
	<transition name="fadeOut">
		<div class="star-page">
			<div class="time" @click="router">
				跳过 {{time}}s
			</div>
			<img src="./index.png" />
		</div>
	</transition>
</template>

<script>
	export default {
		data(){
			return{
				time:8,
			}
		},
		activated() {
			this.time= 3;
		},
		methods:{
			router(){
				this.$router.push({
					path:'/recommend'
				})
				this.time = 0;
			},
			changeTime(){
				setTimeout(() => {
					this.time--
				}, 1000)
			}
		},
		watch:{
			time(){
				if(this.time > 0){
					this.changeTime()
				}else{
					this.$router.push({
						path:'/recommend'
					})
				}
			}
		}
	}
</script>

<style scoped>
	.star-page {
		position: fixed;
		top: 0;
		bottom: 0;
		width: 100%;
		background: #222;
	}
	
	.fadeOut-leave-active {
		transition: all 0.5s ease;
	}
	
	.fadeOut-leave-to {
		opacity: 0;
		transform: translate3d(80%, 0, 0);
	}
	
	.time {
		opacity: 0.7;
		position: absolute;
		right: 14px;
		top: 18px;
		font-size: 14px;
		border: 1px solid rgba(255, 255, 255, 0.5);
		padding: 5px 11px;
		border-radius: 20px;
	}
	.star-page img{
		display: block;
		height: 100%;
		margin: 0 auto;
	}
</style>