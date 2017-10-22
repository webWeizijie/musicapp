<template>
	<div>
		<scroll-view class="recommend-box" ref="recommendBox" :data="discList">
			<div>
				<div class="banner-swiper" v-if="recommend">
					<slider>
						<div v-for="item in recommend.slider">
							<a :href="item.linkUrl">
								<img @load="imgLoad" :src="item.picUrl" alt=""/>
							</a>
						</div>
					</slider>
				</div>
				<div class="recommend-list">
					<div class="recommend-list-title">
						热门歌单推荐
					</div>
					<div class="recommend-loading" v-show="!discList.length">
						<loading></loading>
					</div>
					<div>
						<ul>
							<li @click="selectIndex(item)" v-for="item in discList">
								<div class="recommend-img"><img v-lazy="item.imgurl"/></div>
								<div class="recommend-cont">
									<div class="recommend-cont-info">
										<h2>{{item.creator.name}}</h2>
										<p>{{item.dissname}}</p>	
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</scroll-view>
		<transition name="translate">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
	import loading from 'base/loading/loading'
	import Vue from 'vue'
	import slider from 'base/slider/slider'
	import { getRecommend, getDiscList } from 'api/recommend'
	import { ERR_OK } from 'api/config'
	import vueResource from 'vue-resource'
	import axios from 'axios'
	import scrollView from 'base/scroll/scroll'
	import {playlistMixin} from 'common/js/mixin'
	import {mapMutations,mapGetters} from 'vuex'
	Vue.use(vueResource);

	export default {
		mixins:[playlistMixin],
		data() {
			return {
				recommend: null,
				discList: []
			}
		},
		created() {
			this._getRecommend();
			this._getDiscList();
		},
		methods: {
			_getRecommend() {
				this.$http.jsonp(getRecommend.url, {
					params: getRecommend.params,
					jsonp: getRecommend.jsonp
				}).then((resolve) => {
					if(resolve.body.code == ERR_OK) {
						this.recommend = resolve.body.data
					}
				})
			},
			_getDiscList() {
				this.$http.get(getDiscList.url, {
					params: getDiscList.params
				}).then((res) => {
					if(res.body.code == ERR_OK) {
						setTimeout(()=>{
							this.discList = res.body.data.list;	
							//console.log(this.discList)
						})
						
					}
				})
				//				axios.get('/api/getDiscList',{
				//					params:getDiscList.params
				//				}).then((res)=>{
				//					//return Promise.resolve(res.data)
				//					console.log(res.data)
				//				})
			},
			imgLoad(){
				if(!this.cheackLoad){
					setTimeout(()=>{
						this.$refs.recommendBox.refresh();
					},20)
					this.cheackLoad = true;
				}
			},
			handlePlaylist(playlist){
				if(playlist.length > 0){
					setTimeout(()=>{
						let a = this.$refs.recommendBox.$el.style.bottom = this.minPlayerHeight+ 'px';
						this.$refs.recommendBox.refresh();
					},20)
				}else if(playlist.length == 0){
						this.$refs.recommendBox.$el.style.bottom = 0;
						this.$refs.recommendBox.refresh();
				}
			},
			selectIndex(item){
				this.$router.push({
					path:`/recommend/${item.dissid}`
				})
				this.setDisc(item);
				
			},
			...mapMutations({
				setDisc:'SET_DISC'
			})
		},
		components: {
			slider,
			scrollView,
			loading
		},
		computed:{
			...mapGetters({
				disc:'disc'
			})
		}
		
	}
</script>

<style>
	.recommend-box {
		overflow: hidden;
		width: 100%;
		position: absolute;
		bottom: 0;
		top: 0;
	}
	
	.banner-swiper {
		width: 100%;
		overflow: hidden;
		height: 288;
	}
	
	.recommend-list {
		position: relative;
	}
	
	.recommend-list-title {
		color: #ffcd32;
		font-size: 0.23rem;
		text-align: center;
		padding: 0.4rem 0 0.4rem 0;
	}
	
	.recommend-list ul li {
		display: flex;
		flex-flow: row nowrap;
		padding: 0 0.3rem 0.3rem 0.3rem;
	}
	
	.recommend-list .recommend-img {
		width: 1rem;
		height: 1rem;
	}
	
	.recommend-list .recommend-img img {
		width: 1rem;
		height: 1rem;
	}
	
	.recommend-cont {
		margin-left: 0.3rem;
		flex-grow: 1;
		display: table;
		width: 4.3rem;
		height: 1rem;
	}
	.recommend-cont-info{
		display:table-cell;
		vertical-align: middle;
	}
	.recommend-list .recommend-cont h2 {
		font-size: 0.23rem;
		color: #ffffff;
		font-weight: 400;
	}
	
	.recommend-cont p {
		margin-top: 0.23rem;
		font-size: 0.23rem;
		opacity: 0.4;
		line-height: 0.28rem;
	}
	.recommend-loading{
		position:fixed;
		width: 100%;
		transform: translateY(100%);
		left: 0;
		z-index: 9;
	}
	.translate-enter-active,
	.translate-leave-active {
		transition: all 0.3s ease;
	}
	
	.translate-enter,
	.translate-leave-to {
		transform: translateX(100%);
		opacity: 0;
	}
</style>