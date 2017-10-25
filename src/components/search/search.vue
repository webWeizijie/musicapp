<template>
	<div class="search">
		<search-box ref="searchBox" @query="setQuery"></search-box>
		<div class="shortcut-wrapper" v-show="!query">
			<scroll-view  class="shortcut" :data="shortcutData" ref="shortcut">
				<div>
					<div class="hot-key">
						<h1 class="title">热门搜索</h1>
						<loading v-if="!hotList"></loading>
						<ul v-if="hotList">
							<li class="item" v-for="item in hotList" @click="selectHot(item.k)"><span>{{item.k}}</span></li>
						</ul>
					</div>
					<search-list :searches="searchHistory" @select="selectHot" @delete="deleteItem" v-show="searchHistory.length > 0" @clear="clearAll"></search-list>
				</div>
			</scroll-view >
		</div>
		<div class="search-result-box" v-show="query">
			<suggest :query="query" @listScroll="blurInput" @select="selectSearch"></suggest>
		</div>
		<confirm ref="confirmBox" text="是否清空所有搜索历史"  confirmBtnText="清空" @confirm="clearSearchAll"></confirm>
		<router-view></router-view>
	</div>
</template>

<script>
	import searchBox from 'base/search-box/search-box'
	import vueResource from 'vue-resource'
	import { getSearchHot } from 'api/search.js'
	import loading from 'base/loading/loading'
	import suggest from 'components/suggest/suggest'
	import {mapActions,mapGetters} from 'vuex'
	import scrollView from 'base/scroll/scroll'
	import {playlistMixin} from 'common/js/mixin'
	import searchList from 'base/search-list/search-list'
	import confirm from 'base/confirm/confirm'
	export default {
		mixins:[playlistMixin],
		data() {
			return {
				hotList: [],
				query: ''
			}
		},
		components: {
			searchBox,
			loading,
			suggest,
			scrollView,
			searchList,
			confirm
		},
		created() {
			this.$http.jsonp(getSearchHot.url, {
				params: getSearchHot.params,
				jsonp: getSearchHot.jsonp,
			}).then((res) => {
				if(res.body.code == 0) {
					for(let i = 0; i < 11; i++) {
						this.hotList.push(res.body.data.hotkey[i]);
					}
				}
			})
		},
		methods: {
			handlePlaylist(playlist){
				if(playlist.length > 0 && this.songs != ''){
					setTimeout(()=>{
						this.$refs.shortcut.$el.style.bottom = this.minPlayerHeight+ 'px';
						this.$refs.shortcut.refresh();
					},20)
				}else if(playlist.length == 0 && this.songs != ''){
					setTimeout(()=>{
						this.$refs.shortcut.$el.style.bottom = 0;
						this.$refs.shortcut.refresh();
					},20)	
				}
			},
			selectHot(item) {
				this.$refs.searchBox.setQuery(item);
			},
			setQuery(query) {
				this.query = query;
			},
			blurInput() {
				this.$refs.searchBox.blur();
			},
			selectSearch(){
				this.saveSearchHistory(this.query);
			},
			deleteItem(item){
				this.deleteSearchHistory(item)
			},
			clearAll(){
				this.$refs.confirmBox.show();
			},
			clearSearchAll(){
				this.clearSearchHistory()
			},
			...mapActions({
				saveSearchHistory:'saveSearchHistory',
				deleteSearchHistory:'deleteSearchHistory',
				clearSearchHistory:'clearSearchHistory'
			})
		},
		computed:{
			shortcutData(){
				return this.hotList.concat(this.searchHistory)
			},
			...mapGetters({
				searchHistory:'searchHistory'
			})
		},
		watch:{
			query(newQuery){
				if(!newQuery){
					setTimeout(()=>{
						this.$refs.shortcut.refresh();
					},20)
				}
			}
		}
	}
</script>

<style scoped>
	.search .shortcut-wrapper {
		position: fixed;
		top: 178px;
		bottom: 0;
		width: 100%;
		overflow: hidden;
	}
	
	.search .shortcut-wrapper .shortcut {
		position: absolute;
		top: 0;
		bottom: 0;
	}
	
	.search .shortcut-wrapper .shortcut .hot-key {
		margin: 0 20px 20px;
	}
	
	.search .shortcut-wrapper .shortcut .hot-key .title {
		margin-bottom: 20px;
		font-size: 14px;
		color: hsla(0, 0%, 100%, .5);
		font-weight: 400;
	}
	
	.search .shortcut-wrapper .hot-key ul {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
	
	.search .shortcut-wrapper .shortcut .hot-key .item {
		flex-shrink: 0;
		padding: 5px 10px;
		margin: 0 20px 10px 0;
		border-radius: 6px;
		background: #333;
		font-size: 14px;
		line-height: 14px;
		color: hsla(0, 0%, 100%, .3);
	}
	
	.search .shortcut-wrapper .shortcut .hot-key .item span {
		display: inline-block;
	}
	
	.search-result-box {}
	
	
</style>