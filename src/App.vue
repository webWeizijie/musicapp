<template>
  <div id="app">
  	<v-header></v-header>
  	<div class="music-nav">
  		<ul>
  			<li><router-link to="/recommend" tag="div">推荐</router-link></li>
  			<li><router-link to="/singer" tag="div">歌手</router-link></li>
  			<li><router-link to="/ranking" tag="div">排行</router-link></li>
  			<li><router-link to="/search" tag="div">搜索</router-link></li>
  		</ul>
  	</div>
  	<div class="music-cont">
  		<router-view></router-view>
  	</div>
    
  </div>
</template>

<script>
import vHeader from './components/v-header/v-header'
export default {
  components:{
  	vHeader,
  }
}
</script>

<style>
@import './common/css/reset.css';
@import './common/css/icon.css';
#app{
	color:#ffffff;
}
.music-nav{
	width: 100%;
	position: fixed;
	top: 0.7rem;
	height: 0.6rem;
	line-height: 0.6rem;
}
.music-nav ul{
	display: flex;
	flex-flow: row nowrap;
	align-items: center;
	font-size:0.25rem;
}
.music-nav ul li{
	flex-grow: 1;
	flex-shrink: 0;
	text-align: center;
}
.music-cont{
	width: 100%;
	position: fixed;
	bottom: 0;
	top:1.3rem;
}
.music-nav ul li .router-link-active{
	color: #ffcd32;
	position: relative;
}
.music-nav ul li .router-link-active:before{
	height: 0.03rem;
	position: absolute;
	bottom: 0.04rem;
	width: 0.5rem;
	content: '';
	background: #FFCD32;
}
</style>
