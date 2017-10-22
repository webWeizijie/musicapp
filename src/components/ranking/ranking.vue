<template>
	<div>
		<div class="loading-box">
			<loading v-if="rankData.length == 0"></loading>
		</div>
		<scroll-view :data="rankData" class="rank-box" ref="rankBox">
			<div class="rank-box-list">
				<div class="rank-item" v-for="item in rankData" v-if="rankData.length > 0" @click="selectIndex(item)">
					<div class="rank-iteml">
						<img v-lazy="item.picUrl" />
					</div>
					<ul class="rank-itemr">
						<li v-for="(list,index) in item.songList">
							{{index + 1}} {{list.songname}}-{{list.singername}}
						</li>

					</ul>
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
	import scrollView from 'base/scroll/scroll'
	import vueResource from 'vue-resource'
	import { getRanking } from 'api/ranking.js'
	import { ERR_OK } from 'api/config.js'
	import {playlistMixin} from 'common/js/mixin'
	import {mapMutations} from 'vuex'
	export default {
		mixins:[playlistMixin],
		data() {
			return {
				rankData: []
			}
		},
		mounted() {
			this.$http.jsonp(getRanking.url, {
				params: getRanking.params,
				jsonp: getRanking.jsonp
			}).then((res) => {
				if(res.body.code == ERR_OK) {
					this.rankData = res.body.data.topList;
				}
			})
		},
		components: {
			scrollView,
			loading
		},
		methods:{
			handlePlaylist(playlist){
				if(playlist.length > 0){
					setTimeout(()=>{
						this.$refs.rankBox.$el.style.bottom = this.minPlayerHeight+ 'px';
						this.$refs.rankBox.refresh();
					},20)
				}else if(playlist.length == 0){
						this.$refs.rankBox.$el.style.bottom = 0;
						this.$refs.rankBox.refresh();
				}
			},
			selectIndex(item){
				this.$router.push({
					path:`/ranking/${item.id}`
				})
				this.setRanking(item);
			},
			...mapMutations({
				setRanking:'SET_RANKING'
			})
		}
	}
</script>

<style scoped>
	.loading-box{
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
	}
	.rank-box {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
		overflow: hidden;
	}
	
	.rank-box-list {
		padding: 0.32rem;
	}
	
	.rank-box-list .rank-item {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		margin-bottom: 0.316rem;
	}
	
	.rank-box-list .rank-item:last-child {
		margin: 0;
	}
	
	.rank-iteml {
		width: 1.636rem;
		height: 1.636rem;
	}
	
	.rank-iteml img {
		display: block;
		width: 1.636rem;
	}
	
	.rank-itemr {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 0 20px;
		overflow: hidden;
		background: #333;
		color: hsla(0, 0%, 100%, .3);
		font-size: 12px;
	}
	
	.rank-itemr li {
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		line-height: 26px;
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