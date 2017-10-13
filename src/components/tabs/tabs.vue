<template>
	<div class="music-nav">
		<ul>
			<li>
				<router-link to="/recommend" tag="div">推荐</router-link>
			</li>
			<li>
				<router-link to="/singer" tag="div">歌手</router-link>
			</li>
			<li>
				<router-link to="/ranking" tag="div">排行</router-link>
			</li>
			<li>
				<router-link to="/search" tag="div">搜索</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
	export default{
		
	}
</script>

<style scoped>
	.music-nav {
		width: 100%;
		position: fixed;
		top: 0.7rem;
		height: 0.6rem;
		line-height: 0.6rem;
	}
	
	.music-nav ul {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
		font-size: 0.25rem;
	}
	
	.music-nav ul li {
		flex-grow: 1;
		flex-shrink: 0;
		text-align: center;
		color: hsla(0,0%,100%,.5);
	}
	
	.music-nav ul li .router-link-active {
		color: #ffcd32;
		position: relative;
	}
	
	.music-nav ul li .router-link-active:before {
		height: 0.03rem;
		position: absolute;
		bottom: 0.04rem;
		width: 0.5rem;
		content: '';
		background: #FFCD32;
	}
</style>