<template>
	<div class="search-box-wrapper">
		<div class="search-box">
			<i class="icon-search"></i>
			<input class="box" v-model="query" :placeholder="placeholder" ref="query" />
			<i @click="clear" v-show="query" class="icon-dismiss"></i>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import { debounce } from 'common/js/util.js'
	export default {
		props: {
			placeholder: {
				type: String,
				default: '搜索歌曲、歌手'
			}
		},
		data() {
			return {
				query: ''
			}
		},
		methods: {
		    clear() {
		      this.query = ''
		    },
		    setQuery(query) {
		      this.query = query
		    },
		    blur() {
		      this.$refs.query.blur()
		    }
		},
		created() {
		    this.$watch('query', debounce((newQuery) => {
		      this.$emit('query', newQuery)
		    },200))
		}
	}
</script>

<style scoped>
	.search-box-wrapper {
	    margin: 20px;
	}
	.search-box {
		display: flex;
		align-items: center;
		box-sizing: border-box;
		width: 100%;
		padding: 0 6px;
		height: 40px;
		background: #333;
		border-radius: 6px;
	}
	
	.search-box .icon-search {
		font-size: 24px;
		color: #222;
	}
	
	.search-box .box {
		-webkit-box-flex: 1;
		-ms-flex: 1;
		flex: 1;
		margin: 0 5px;
		line-height: 18px;
		background: #333;
		color: #fff;
		font-size: 14px;
		border: 0;
	}
	
	.search-box .icon-dismiss {
		font-size: 16px;
		color: #222;
	}
</style>