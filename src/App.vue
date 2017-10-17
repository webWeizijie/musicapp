<template>
  <div id="app">
  	<v-header></v-header>
  	<tabs></tabs>
		<keep-alive>
			<router-view class="tab-conts"></router-view>
		</keep-alive>
		<player></player>
  </div>
</template>

<script>
import vHeader from 'components/v-header/v-header'
import tabs from 'components/tabs/tabs'
import player from 'components/player/player'
export default {
  components:{
  	vHeader,
  	tabs,
  	player
  }
}
</script>
<style>
@import './common/css/reset.css';
@import './common/css/icon.css';
#app{
	color:#ffffff;
}
.tab-conts{
	width: 100%;
	position: fixed;
	bottom: 0;
	top: 1.43rem;
	z-index: 10;
	
}
</style>
