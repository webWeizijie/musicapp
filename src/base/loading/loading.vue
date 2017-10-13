<template>
	<div class="loading-box">
		<div>
			<img src="./loading.gif"/>
		</div>
		<div class="loading-text">{{loadText}}</div>
	</div>
</template>

<script>
	export default{
		props:{
			loadText:{
				type:String,
				default:'正在载入…'
			}
		}
	}
</script>

<style>
	.loading-box{
		text-align: center;
		width: 100%;
	}
	.loading-box img{
		width: 0.4rem;
		height: 0.4rem;
		display: block;
		margin: 0 auto;
	}
	.loading-text{
		font-size:0.2rem;
		color: hsla(0,0%,100%,.5);
		margin-top: 0.14rem;
	}
</style>