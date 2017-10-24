<template>
	<div class="search-history">
		<h1 class="title"><span class="text">搜索历史</span> <span class="clear" @click="clearSearch"><i class="icon-clear"></i></span></h1>
		<div class="search-list">
			<ul>
				<li class="search-item" v-for="item in searches" @click="selectItem(item)"><span class="text">{{item}}</span> <i class="icon-delete" @click.stop="deleteOne(item)"></i></li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		props:{
			searches:{
				type:Array,
				default(){
					return []
				}
			}
		},
		methods:{
			selectItem(item){
				this.$emit('select',item)
			},
			deleteOne(item){
				this.$emit('delete',item)
			},
			clearSearch(){
				this.$emit('clear')
			}
		}
	}
</script>

<style scoped>
	.shortcut-wrapper .shortcut .search-history {
		position: relative;
		padding: 0 20px;
		width: 100%;
		box-sizing: border-box;
	}
	
	.shortcut-wrapper .shortcut .search-history .title {
		display: flex;
		align-items: center;
		height: 40px;
		font-size: 14px;
		color: hsla(0, 0%, 100%, .5);
	}
	
	.shortcut-wrapper .shortcut .search-history .title .text {
		flex: 1;
		font-weight: 400;
	}
	
	.shortcut-wrapper .shortcut .search-history .title .clear {
		position: relative;
		padding: 8px;
		margin-right: -8px;
	}
	
	.search-list .search-item{
		display: flex;
		align-items: center;
		flex-direction: row;
		flex-wrap: nowrap;
		height: 40px;
		overflow: hidden;
	}
	
	.search-list .search-item .text {
		flex: 1;
		color: hsla(0, 0%, 100%, .5);
		font-size: 16px;
	}
	.search-list .search-item .icon {
		
	}
	.search-list .search-item .icon-delete {
		font-size: 12px;
		color: hsla(0, 0%, 100%, .3);
		display: inline-block;
		padding: 8px;
		margin-right: -8px;
	}
</style>