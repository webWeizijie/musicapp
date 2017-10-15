<template>
	<scroll-view class="singer-box" :data="singerList" :probeType="probeType" ref="scroll" @getScrollJs="getScroll">
		<div class="singer-scroll" ref="singerScroll">
			<div class="singer-list" v-for="item in singerList">
				<div class="singer-title">{{item.title}}</div>
				<div class="singer-list-cont">
					<ul>
						<li v-for="singers in item.item">
							<div><img v-lazy="singers.picUrl" /></div>
							<div class="name">{{singers.name}}</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="singer-choose-list">
			<ul>
				<!--<div>{{initSingerHeight}}</div>-->
				<li v-for="(item,index) in singerList" :class="{'active':index == nowScrollIndex}" @touchstart="scrollTo(index)" @touchmove.stop.prevent="moveScrollto">{{item.title=='热门'?'热':item.title}}</li>
			</ul>
		</div>
	</scroll-view>
</template>

<script>
	import scrollView from 'base/scroll/scroll'
	import vueResource from 'vue-resource'
	import { getSinger } from 'api/singer.js'
	import Singer from 'common/js/singer'
	let HOT_NAME = '热门';
	let HOT_LENGTH = 10;
	export default {
		data() {
			return {
				singerList: [],
				probeType: 3,
				singersHeight: [],
				scrollChildren: [],
				scrollY: 0,
				num: 0,
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
					this.$nextTick(() => {
						this.initSingerHeight();
					})
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
			initSingerHeight() {
				if(this.singerList != '') {
					let scrollChildren = this.$refs.singerScroll.children;
					this.scrollChildren = scrollChildren
					let singersHeight = [];
					let height = 0;
					singersHeight.push(height);
					for(let i = 0; i < scrollChildren.length; i++) {
						height += scrollChildren[i].clientHeight;
						singersHeight.push(parseInt(height) - 1);
					}
					this.singersHeight = singersHeight
				}

			},
			getScroll(scrollY) {
				if(scrollY < 0) {
					this.scrollY = 0;
				} else {
					this.scrollY = scrollY;
				}

			},
			scrollTo(index) {
				this.$refs.scroll.scrollTo(0,-this.singersHeight[index],600);
				console.log(this.singersHeight[index])
			},
			moveScrollto(){
				
			}
		},
		mounted() {
			setTimeout(() => {
				this._getSingerData();
			}, 20)
		},
		components: {
			scrollView,
		},
		computed: {
			nowScrollIndex() {
				for(let i = 0; i < this.singersHeight.length; i++) {
					let height1 = this.singersHeight[i];
					let height2 = this.singersHeight[i + 1]
					if(!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
						//this.num = i;
						return i
					}
				}
				return 0
			}
		},
		watch: {
			scrollY() {

			}
		}
	}
</script>

<style scoped>
	.singer-box {}
	
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
</style>