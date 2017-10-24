<template>
	<scroll-view class="search-result" :data="result" :pullup="pullup" @scrollToEnd="searchMore" ref="suggestScroll" @beforeScroll="listScroll" :beforeScroll="beforeScroll">
		<div class="suggest">
			<ul class="suggest-list">
				<li class="suggest-item" v-for="item in result" @click="selectItem(item)">
					<div class="icon"><i class="icon-music" :class="getIconCls(item)"></i></div>
					<div class="name">
						<p class="text" v-html="getDisplayName(item)"></p>
					</div>
				</li>
				<div class="loading-newbox">
					<loading loadText="" v-show="hasMore"></loading>
				</div>
			</ul>
		</div>
		<div class="no-result-wrapper" v-show="!hasMore  && !result.length">
			<noResult title="抱歉，暂无搜索结果"></noResult>
		</div>
	</scroll-view>
</template>

<script>
	import loading from 'base/loading/loading'
	import { searchSongs } from 'api/search.js'
	import vueResource from 'vue-resource'
	import { ERR_OK } from 'api/config.js'
	import { createSong } from 'common/js/song.js'
	import scrollView from 'base/scroll/scroll'
	import singer from 'common/js/singer.js'
	import {mapMutations,mapActions} from 'vuex'
	import {playlistMixin} from 'common/js/mixin'
	import noResult from 'base/no-result/no-result'
	
	const TYPE_SINGER = 'singer'
	const perpage = 20
	export default {
		mixins:[playlistMixin],
		props: {
			query: {
				type: String,
				default: ''
			},
			showSinger: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				page: 1,
				result: [],
				//getState:false,
				pullup:true,
				hasMore:true,
				beforeScroll:true,
				
			}
		},
		components: {
			loading,
			scrollView,
			noResult
		},
		methods: {
			search() {
				this.hasMore = true;
				this.page = 1;
				this.$refs.suggestScroll.scrollTo(0,0)
				this.$http.jsonp(searchSongs.url, {
					params: {
						...searchSongs.params,
						w: this.query,
						p: this.page,
						catZhida: this.showSinger? 1 : 0,
						perpage,
						n:perpage,
					},
					jsonp: searchSongs.jsonp,
				}).then((res) => {
					if(res.body.code == ERR_OK) {
						this.result = this._genResult(res.body.data);
						this._checkMore(res.body.data)
					}
				})
			},
			_genResult(data) {
				let ret = []
				if(data.zhida && data.zhida.singerid) {
					ret.push({
						...data.zhida,
						...{
							type: TYPE_SINGER
						}
					})
				}
				if(data.song) {
					ret = ret.concat(this._normaLizeSongs(data.song.list));
				}

				return ret
			},
			getIconCls(item) {
				if(item.type === TYPE_SINGER) {
					return 'icon-mine'
				} else {
					return 'icon-music'
				}
			},
			getDisplayName(item) {
				if(item.type === TYPE_SINGER) {
					return item.singername
				} else {
					return `${item.name}-${item.singer}`
				}
			},
			_normaLizeSongs(list){
				let ret = []
				list.forEach((musicData)=>{
					if(musicData.songid && musicData.albumid){
						ret.push(createSong(musicData))
					}
				})
				return ret
			},
			searchMore(){
				if(!this.hasMore){
					return
				}
				this.page++
				this.$http.jsonp(searchSongs.url, {
					params: {
						...searchSongs.params,
						w: this.query,
						p: this.page,
						catZhida: this.showSinger? 1 : 0,
						perpage,
						n:perpage,
					},
					jsonp: searchSongs.jsonp,
				}).then((res) => {
					if(res.body.code == ERR_OK) {
						this.result = this.result.concat(this._genResult(res.body.data));
						this._checkMore(res.body.data)
					}
				})
			},
			_checkMore(data){
				const song = data.song;
				if(!song.list.length || (song.curnum + song.curpage * perpage) > song.totalnum){
					this.hasMore = false;
				}
			},
			selectItem(item){
				if(item.type === TYPE_SINGER){
					const singerData = new singer({
						picUrl:item.singermid,
						name:item.singername
					})
					this.$router.push({
						path:`/search/${singerData.id}`
					})
					this.setSinger(singerData);
				}else{
					this.insertSong(item)
				}
				this.$emit('select')
			},
			handlePlaylist(playlist){
				if(playlist.length > 0 && this.songs != ''){
					setTimeout(()=>{
						this.$refs.suggestScroll.$el.style.bottom = this.minPlayerHeight+ 'px';
						this.$refs.suggestScroll.refresh();
					},20)
				}else if(playlist.length == 0 && this.songs != ''){
					setTimeout(()=>{
						this.$refs.suggestScroll.$el.style.bottom = 0;
						this.$refs.suggestScroll.refresh();
					},20)	
				}
			},
			listScroll(){
				this.$emit('listScroll');
			},
			...mapMutations({
				setSinger:'GET_MUSIC'
			}),
			...mapActions({
				insertSong:'insertSong'
			})
		},
		watch: {
			query() {
				this.search();
				this.getState = true;
				this.result = [];
			}
		}
	}
</script>

<style scoped>
	.search .search-result {
		position: fixed;
		width: 100%;
		top: 178px;
		bottom: 0;
		background: #222222;
		z-index: 9;
		overflow: hidden;
	}
	.suggest{
		position: relative;
	}
	.suggest .suggest-list {
		padding: 0 30px;
	}
	
	.suggest .suggest-list .suggest-item {
		display: flex;
		align-items: center;
		padding-bottom: 23px;
	}
	
	.suggest .suggest-list .icon {
		flex: 0 0 30px;
		width: 30px;
	}
	
	.suggest .suggest-list .name {
		flex: 1;
		font-size: 14px;
		color: hsla(0, 0%, 100%, .3);
		overflow: hidden;
	}
	
	.suggest .suggest-list .name .text {
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	
	.suggest .suggest-list .icon {
		display:block;
		flex: 0 0 30px;
		width: 30px;
	}
	
	.suggest .suggest-list .icon [class^="icon-"] {
		font-size: 14px;
		color: hsla(0, 0%, 100%, .3);
		display:block;
	}
	.no-result-wrapper{
		position: absolute;
		top: 40%;
		transform: translateY(-50%);
		width: 100%;
	}
</style>