<template>
	<div class="recommend-box" ref="recommendBox">
		<div>
			<div class="banner-swiper" v-if="recommend">
				<slider>
					<div v-for="item in recommend.slider">
						<a :href="item.linkUrl">
							<img :src="item.picUrl" alt="" />
						</a>
					</div>
				</slider>
			</div>
			<div class="recommend-list">
				<div class="recommend-list-title">
					热门歌曲推荐
				</div>
				<div>
					<ul>
						<li v-for="item in discList">
							<div class="recommend-img"><img :src="item.imgurl" /></div>
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
	</div>
</template>

<script>
	import Vue from 'vue'
	import { getRecommend, getDiscList } from 'api/recommend'
	import { ERR_OK } from 'api/config'
	import vueResource from 'vue-resource'
	import slider from 'base/slider/slider'
	import axios from 'axios'
	import BScroll from 'better-scroll'
	Vue.use(vueResource);

	export default {
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
						this.discList = res.body.data.list;
						this.$nextTick(() => {
							this._initDiscListBox()
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
			_initDiscListBox(){
				this.recommendBox = new BScroll(this.$refs.recommendBox, {
					click: true,
				})
			}
		},
		components: {
			slider,
		}
	}
</script>

<style>
	.recommend-box {
		width: 100%;
		position: fixed;
		bottom: 0;
		top: 1.3rem;
		overflow: hidden;
	}
	
	.banner-swiper {
		width: 100%;
	}
	
	.recommend-list {}
	
	.recommend-list-title {
		color: #ffcd32;
		font-size: 0.27rem;
		text-align: center;
		padding: 0.4rem 0 0.3rem 0;
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
		
	}
	
	.recommend-list .recommend-cont h2 {
		font-size: 0.26rem;
		color: #ffffff;
		margin-top: 0.08rem;
		font-weight: 400;
	}
	
	.recommend-cont p {
		margin-top: 0.24rem;
		font-size: 0.23rem;
		opacity: 0.6;
		line-height: 0.28rem;
	}
</style>