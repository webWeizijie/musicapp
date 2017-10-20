<template>
	<div>
		<div class="loading-box">
			<loading v-show="singerList == ''"></loading>
		</div>
		<list-view :data="singerList" v-if="singerList != ''" class="singer-box" @select="selectSinger" ref="singerList"></list-view>
		<router-view></router-view>
	</div>
</template>

<script>
	import scrollView from 'base/scroll/scroll'
	import vueResource from 'vue-resource'
	import { getSinger } from 'api/singer.js'
	import Singer from 'common/js/singer'
	import listView from 'base/listView/listView'
	import loading from 'base/loading/loading'
	import { mapMutations } from 'vuex'
	import {playlistMixin} from 'common/js/mixin'
	
	
	let HOT_NAME = '热门';
	let HOT_LENGTH = 10;
	export default {
		mixins:[playlistMixin],
		data() {
			return {
				singerList: [],
			}
		},
		methods: {
			_getSingerData() {
				this.$http.jsonp(getSinger.url, {
					params: getSinger.params,
					jsonp: getSinger.jsonp
				}).then((res) => {
					this.singerData = res.body.data.list;
					this._initSingerList();
				})
			},
			_initSingerList() {
				let map = {
					hot: {
						title: HOT_NAME,
						item: []
					}
				}
				this.singerData.forEach((item, index) => {
					if(item.Fsort <= HOT_LENGTH) {
						map.hot.item.push(
							new Singer({
								name: item.Fsinger_name,
								picUrl: item.Fsinger_mid
							})
						)
					}

					let key = item.Findex
					if(!map[key]) {
						map[key] = {
							title: key,
							item: []
						}
					}
					map[key].item.push(
						new Singer({
							name: item.Fsinger_name,
							picUrl: item.Fsinger_mid
						})
					)
				})
				let hot = []
				let ret = []
				for(var k in map) {
					if(map[k].title.match(/[a-zA-Z]/)) {
						ret.push(map[k]);
					} else if(map[k].title == HOT_NAME) {
						hot.push(map[k]);
					}
				}
				ret.sort((a, b) => {
					return a.title.charCodeAt(0) - b.title.charCodeAt(0);
				})
				this.singerList = hot.concat(ret);
			},
			selectSinger(singer){
				this.$router.push({
					path:`/singer/${singer.id}`
				})
				this.getMusic(singer);
			},
			handlePlaylist(playlist){
				if(playlist.length > 0){
					setTimeout(()=>{
						console.log(this.$refs.singerList)
						let a = this.$refs.singerList.$el.style.bottom = this.minPlayerHeight+ 'px';
						this.$refs.singerList.$refs.scroll.refresh();
						
					},20)
				}
			},
			...mapMutations({
				getMusic:'GET_MUSIC',
			})
		},
		mounted() {
			this._getSingerData();
		},
		components: {
			scrollView,
			listView,
			loading,
		},
		computed: {
			
		},
		watch: {

		}
	}
</script>

<style scoped>
	.singer-box {
		width: 100%;
	    position: absolute;
	    top: 0;
	    bottom:0;
	    overflow: hidden;
	   
	}
	.singer-title {
		height: 0.49rem;
		line-height: 0.49rem;
		padding-left: 0.33rem;
		font-size: 0.19rem;
		color: hsla(0, 0%, 100%, .5);
		background: #333;
	}
	
	.singer-list-cont ul li {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		padding: 0.32rem 0 0 0.49rem;
		align-items: center;
	}
	
	.singer-list-cont ul li img {
		display: block;
		width: 0.819rem;
		height: 0.819rem;
		border-radius: 50%;
	}
	
	.singer-list-cont ul {
		padding-bottom: 0.5rem;
	}
	
	.singer-list-cont ul li .name {
		font-size: 0.228rem;
		color: hsla(0, 0%, 100%, .5);
		margin-left: 0.32rem;
	}
	
	.singer-choose-list {
		position: absolute;
		z-index: 30;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
		width: 20px;
		padding: 20px 0;
		border-radius: 10px;
		text-align: center;
		background: rgba(0, 0, 0, .3);
		font-family: Helvetica;
	}
	
	.singer-scroll {}
	
	.singer-choose-list ul li {
		font-size: 0.2rem;
		padding: 0.05rem;
		color: hsla(0, 0%, 100%, .5);
	}
	
	.singer-choose-list ul li.active {
		color: #ffcd32;
	}
	.loading-box{
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
	}
</style>