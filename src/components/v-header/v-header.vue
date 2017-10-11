<template>
	<div class="header-box">
		<div class="header-logo"><img src="../../common/image/logo@3x.png"></div>
		<div class="header-logo-name">Chicken Music</div>
		<div class="icon-mine"></div>
	</div>
</template>

<script>
	export default{
		
	}
</script>

<style scoped>
	.header-box{
		height: 0.7rem;
		background: #222222;
		width: 100%;
		position: fixed;
		top: 0;
		display: flex;
		flex-direction: rwo;
		align-items: center;
		flex-wrap: nowrap;
		justify-content: center;
		position: relative;
	}
	.icon-mine{
		color: #ffffff;
	}
	.header-box .header-logo img{
		width: 0.488rem;
		display: block;
		margin-right: 0.14rem;
	}
	.header-box .header-logo-name{
		font-size:0.293rem;
		color: #ffcd32;
	}
	.header-box .icon-mine{
		color: #FFCD32;
		font-size:0.318rem;
		justify-content: flex-end;
		position: absolute;
		right: 0.2rem;
	}
</style>