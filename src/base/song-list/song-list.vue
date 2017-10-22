<template>
	<div class="music-list-cont ">
		<ul>
			<li v-for="(item,index) in songs" @click="selectSong(item,index)">
				<div class="song-listl" v-if="rankingState">
					<div class="index">
						<span class="icon" :class="'icon'+ index" v-if="index < 3"></span>
						<span class="text" v-if="index >= 3">{{index + 1}}</span>
					</div>
					
				</div>
				<div class="song-listr">
					<div class="title">{{item.name}}</div>
					<div class="cont">{{item.singer}}·{{item.album}}</div>
				</div>
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
			},
			rankingState:{
				type:Boolean,
				default:false,
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
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.music-list-cont ul li:last-child{
		margin-bottom: 0;
	}
	.music-list-cont ul li .song-listr{
		flex-grow: 1;
		overflow: hidden;
	}
	.music-list-cont ul li .song-listr .title {
		font-size: 0.227rem;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		padding-top: 0.02rem;
	}
	
	.music-list-cont ul li .song-listr .cont {
		font-size: 0.227rem;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		margin-top: 0.185rem;
		color: hsla(0, 0%, 100%, .3);
		line-height: 0.23rem;
		padding-top: 0.02rem;
	}
	.music-list-cont ul li .song-listl{
		flex-grow: 0;
		flex-shrink: 0;
		color: #ffcd32;
    	font-size: 18px;
    	width: 0.9rem;
    	box-sizing: border-box;
    	text-align: center;
	}
	.music-list-cont ul li .song-listl .index{
		width: 0.41rem;
		height: 0.4rem;
		text-align: center;
		line-height: 0.4rem;
	}
	.music-list-cont ul li .song-listl .index .icon{
		background-repeat: no-repeat;
		display: inline-block;
		width: 0.41rem;
		height: 0.4rem;
		background-size: 0.41rem 0.395rem;
	}
	.music-list-cont ul li .song-listl .index .icon.icon0{
		background-image: url('./first.png');
	}
	.music-list-cont ul li .song-listl .index .icon.icon1{
		background-image: url('./second.png');
	}
	.music-list-cont ul li .song-listl .index .icon.icon2{
		background-image: url('./third.png');
	}
</style>