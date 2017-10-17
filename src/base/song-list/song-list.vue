<template>
	<div class="music-list-cont ">
		<ul>
			<li v-for="(item,index) in songs" @click="selectSong(item,index)">
				<div class="title">{{item.name}}</div>
				<div class="cont">{{item.singer}}·{{item.album}}</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default{
		props:{
			songs:Array,
			default(){
				return []
			}
		},
		methods:{
			selectSong(item,index){
				this.$emit('select',item,index)
			}
		}
	}
</script>

<style scoped>
	.music-list-cont {
		padding: 0.53rem 0.49rem;
		width: 100%;
		box-sizing: border-box;
	}
	
	.music-list-cont ul li {
		margin-bottom: 0.434rem;
	}
	.music-list-cont ul li:last-child{
		margin-bottom: 0;
	}
	.music-list-cont ul li .title {
		font-size: 0.227rem;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	
	.music-list-cont ul li .cont {
		font-size: 0.227rem;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		margin-top: 0.185rem;
		color: hsla(0, 0%, 100%, .3);
	}
</style>