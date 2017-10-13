<template>
	<div ref="scrollView">
		<slot></slot>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	export default{
		props:{
			data:{
				type:Array,
				default:function(){
					return []
				}
			},
			click:{
				type:Boolean,
				default:true,
			},
			probeType:{
				type:Number,
				default:0
			}
		},
		mounted(){
			setTimeout(()=>{
				this._initScrollView()
			},20)
		},
		methods:{
			_initScrollView(){
				this.scrollView = new BScroll(this.$refs.scrollView,{
					click:this.click,
					probeType:this.probeType,
				})
			},
			enable(){
				this.scrollView && this.scrollView.enable();
			},
			refresh(){
				this.scrollView && this.scrollView.refresh();
			},
			disable(){
				this.scrollView && this.scrollView.disable();
			},
		},
		watch:{
			data(){
				setTimeout(()=>{
					this.refresh()
				},20)
			}
		}
	}
</script>

<style>
	
</style>