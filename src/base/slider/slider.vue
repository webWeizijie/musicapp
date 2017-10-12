<template>
	<div class="slider" ref="slider">
		<div class="slider-group" ref="sliderGroup">
			<slot></slot>
		</div>
		<div class="slider-current">
			<span v-for="(item,index) in dots" :class="{'active': index == currentPageIndex }"></span>
		</div>
	</div>
</template>

<script>
	import {addClass} from 'common/js/dom.js'
	import BScroll from 'better-scroll'
	export default {
		data(){
			return {
				dots:[],
				currentPageIndex:0,
			}
		},
		props:{
			loop:{
				type:Boolean,
				default:true,
			},
			autoPlay:{
				type:Boolean,
				default:true,
			},
			interval:{
				type:Number,
				default:2000,
			}
		},
		mounted(){
			setTimeout(()=>{
				this._initSliderWidth();
				this._initDots();
				this._initSlider();
				if(this.autoPlay == true){
					this._play()
				}
				
			},20)
			window.addEventListener('resize',() => {
				if(!this.slider){
					return
				}
				this._initSliderWidth(true);
				this.slider.refresh();
			})
		},
//		destroyed(){
//			clearTimeout(this.timer);
//		},
		methods:{
			_initSliderWidth(resize){
				let sliderWidth = this.$refs.slider.clientWidth;
				let child = this.$refs.sliderGroup.children;
				this.children = child;
				let width = 0;
				for(let i = 0; i < child.length; i++){
					child[i].style.width = sliderWidth + 'px';
					addClass(child[i],'slider-group-item');
					width += sliderWidth;
				}
				if(this.loop == true && !resize){
					width += 2 * sliderWidth;
				}
				this.$refs.sliderGroup.style.width = width + 'px';
			},
			_initSlider(){
				this.slider = new BScroll(this.$refs.slider,{
					scrollY:false,
					scrollX:true,
					momentum:false,
					snap: {
			            loop: this.loop,
			            threshold: 0.3,
			            speed: 400
			        },
				})
				this.slider.on('scrollEnd',() => {
					let pageIndex = this.slider.getCurrentPage().pageX;
					if(this.loop){
						pageIndex -= 1;
					}
					this.currentPageIndex = pageIndex;
					
					if(this.autoPlay == true){
						clearTimeout(this.timer);
						this._play();
					}
				})
			},
			_initDots(){
				this.dots = this.children.length;
			},
			_play(){
				let pageIndex = this.currentPageIndex + 1;
				if(this.loop){
					pageIndex += 1;
				}
				this.timer = setTimeout(()=>{
					this.slider.goToPage(pageIndex,0,400);
				},this.interval);
			}
		}
	}
</script>

<style>
	.slider{
		width: 100%;
		overflow: hidden;
		position: relative;
	}
	.slider-group{
		
	}
	.slider-group a{
		display: block;
		width: 100%;
	}
	.slider-group img{
		display: block;
		width: 100%;
	}
	.slider-group-item{
		float: left;
	}
	.slider-current{
		width: 100%;
		position: absolute;
		bottom: 0.2rem;
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
	.slider-current span{
		width: 0.12rem;
		height: 0.12rem;
		border-radius: 50%;
		background: #fff;
		display: block;
		opacity: 0.7;
		margin:0 0.06rem;
	}
	.slider-current span.active{
		width: 0.24rem;
		border-radius: 0.13rem;
	}
</style>