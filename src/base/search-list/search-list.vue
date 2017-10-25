<template>
	<div class="search-history">
		<h1 class="title"><span class="text">搜索历史</span> <span class="clear" @click="clearSearch"><i class="icon-clear"></i></span></h1>
		<div class="search-list">
			<transition-group name="list" tag="ul">
				<li :key="item" class="search-item" @click="selectItem(item)" v-for="item in searches">
					<span class="text">{{item}}</span>
					<span class="icon" @click.stop="deleteOne(item)">
			          <i class="icon-delete"></i>
			        </span>
				</li>
			</transition-group>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			searches: {
				type: Array,
				default() {
					return []
				}
			}
		},
		methods: {
			selectItem(item) {
				this.$emit('select', item)
			},
			deleteOne(item) {
				this.$emit('delete', item)
			},
			clearSearch() {
				this.$emit('clear')
			}
		}
	}
</script>

<style scoped>
	.search-history {
		position: relative;
		padding: 0 20px;
		width: 100%;
		box-sizing: border-box;
	}
	
	.search-history .title {
		display: flex;
		align-items: center;
		height: 40px;
		font-size: 14px;
		color: hsla(0, 0%, 100%, .5);
	}
	
	.search-history .title .text {
		flex: 1;
		font-weight: 400;
	}
	
	.search-history .title .clear {
		position: relative;
		padding: 8px;
		margin-right: -8px;
	}
	
	.search-item {
		display: flex;
		align-items: center;
		height: 40px;
		overflow: hidden;
	}
	
	.list-enter-active,
	.list-leave-active {
		transition: all 0.1s;
	}
	
	.list-enter,
	.list-leave-to {
		height: 0;
	}
	
	.text {
		flex: 1;
		color: rgba(255, 255, 255, 0.5);
		font-size: 16px;
	}
	.icon{
		font-size: 12px;
	}
	
	.icon .icon-delete {
		font-size: 12px;
		color: rgba(255, 255, 255, 0.3);
	}
</style>