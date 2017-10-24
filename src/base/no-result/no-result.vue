<template>
	<div class="no-result">
		<div class="no-result-icon"></div>
		<p class="no-result-text">{{title}}</p>
	</div>
</template>

<script type="text/ecmascript-6">
	export default {
		props: {
			title: {
				type: String,
				default: ''
			}
		}
	}
</script>

<style scoped>
	.no-result {
		text-align: center;
	}
	
	.no-result-icon {
		width: 86px;
		height: 90px;
		margin: 0 auto;
		background:url('./no-result@3x.png');
		background-size: 86px 90px;
	}
	
	.no-result-text {
		margin-top: 30px;
		font-size: 14px;
		color: rgba(255, 255, 255, 0.3);
	}
</style>