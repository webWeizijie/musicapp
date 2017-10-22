<template>
	<scroll-view :data="data" :probeType="probeType" ref="scroll" @getScrollJs="getScroll" :listenScroll="listenScroll">
		
		<div class="singer-scroll" ref="singerScroll">
			<div class="singer-list" v-for="item in data">
				<div class="singer-title">{{item.title}}</div>
				<div class="singer-list-cont">
					<ul>
						<li v-for="singers in item.item"  @click="selectSinger(singers)">
							<div><img v-lazy="singers.picUrl" /></div>
							<div class="name">{{singers.name}}</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="flexd-title-box" v-show="flexdTitle" ref="flexdTitle">
			<div class="flexd-title">{{flexdTitle}}</div>
		</div>
		<div class="singer-choose-list">
			<ul>
				<li v-for="(item,index) in data" :class="{'active':index == nowScrollIndex}" @touchstart="scrollTo" :data-index="index" @touchmove.stop.prevent="scrollMove">{{item.title=='热门'?'热':item.title}}</li>
			</ul>
		</div>
	</scroll-view>
</template>

<script>
	import scrollView from 'base/scroll/scroll'
	import {getData} from 'common/js/dom.js'
	import {playlistMixin} from 'common/js/mixin'
	
	export default {
		mixins:[playlistMixin],
		created(){
			this.firstDisY = 0;
			this.lastDisY=0;
			this.firstIndex = 0;
			this.scrollListHeight = 0;
		},
		props: {
			data: {
				type: Array,
				default: []
			}
		},
		data() {
			return {
				probeType: 3,
				singersHeight: [],
				scrollChildren: [],
				scrollY: 0,
				listenScroll:true,
				nowScrollIndex:0,
				diff:-1,
			}
		},
		computed: {
			flexdTitle(){
				if(this.scrollY == 0){
					return ''
				}
				return this.data[this.nowScrollIndex].title
			}
		},
		components: {
			scrollView,
			
		},
		methods: {
			getScroll(scrollY) {
				if(scrollY < 0) {
					this.scrollY = 0;
				} else {
					this.scrollY = scrollY;
				}
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
			scrollTo(e) {
				let index = getData(e.target,'index');
				this.scrollY = this.singersHeight[index]
				this.scrollListHeight = e.target.clientHeight;
				this.firstIndex = index;
				this.firstDisY = e.touches[0].pageY;
				this.$refs.scroll.scrollTo(0, -this.singersHeight[index], 0);
			},
			scrollToElement(index) {
				this.$refs.scroll.scrollToElement(this.scrollChildren[index]);
			},
			scrollMove(e) {
				this.lastDisY = e.touches[0].pageY;
				let DisY = Math.floor((this.lastDisY - this.firstDisY) / this.scrollListHeight);
				let deliat = DisY + parseInt(this.firstIndex);
				if(deliat < 0){
					deliat = 0;
				}else if(deliat > this.singersHeight.length - 2){
					deliat = this.singersHeight.length - 2;
				}
				this.$refs.scroll.scrollTo(0, -this.singersHeight[deliat], 0);
				this.scrollY = this.singersHeight[deliat]
				
			},
			selectSinger(item){
				this.$emit('select',item);
			},
			handlePlaylist(playlist){
				if(playlist.length > 0){
					setTimeout(()=>{
						//console.log(this.$refs.scroll)
						let a = this.$refs.scroll.$el.style.bottom = this.minPlayerHeight+ 'px';
						this.$refs.scroll.refresh();
						
					},20)
				}else if(playlist.length == 0){
						this.$refs.scroll.$el.style.bottom = 0;
						this.$refs.scroll.refresh();
				}
			}
		},
		mounted() {
			this.initSingerHeight();
		},
		watch:{
			scrollY() {
				if(this.scrollY < 0){
					return 0;
				}
				for(let i = 0; i < this.singersHeight.length - 1; i++) {
					let height1 = this.singersHeight[i];
					let height2 = this.singersHeight[i + 1]
					if(this.scrollY >= height1 && this.scrollY < height2) {
						this.nowScrollIndex	 = i;
						this.diff = height2 - this.scrollY
						return
					}else{
						this.nowScrollIndex	 = this.singersHeight.length - 2
					}
				}
			},
			diff(){
				let flexdDom = this.$refs.flexdTitle;
				let flexdTop = (this.diff > 0 && this.diff < flexdDom.clientHeight) ? this.diff - flexdDom.clientHeight : 0;
				if(this.flexdTop == flexdTop){
					return
				}
				this.flexdTop = flexdTop
				flexdDom.style.transform ='translate3d(0,' + flexdTop + 'px,0)';
			}
		}
	}
</script>

<style scoped>
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
		width: 0.29rem;
		padding: 0.2rem 0;
		border-radius: 0.2rem;
		text-align: center;
		background: rgba(0, 0, 0, .3);
		font-family: Helvetica;
	}
	
	.singer-scroll {
		
	}
	
	.singer-choose-list ul li {
		font-size: 0.16rem;
		padding: 0.04rem;
		color: hsla(0, 0%, 100%, .5);
	}
	
	.singer-choose-list ul li.active {
		color: #ffcd32;
	}
	.flexd-title-box{
		position: absolute;
		top: 0;
		width: 100%;
	}
	.flexd-title{
		height: 0.49rem;
		line-height: 0.49rem;
		padding-left: 0.33rem;
		font-size: 0.19rem;
		color: hsla(0, 0%, 100%, .5);
		background: #333;
	}
</style>