<template>
  <div id="app">
  	<v-header></v-header>
  	<tabs></tabs>
  		<keep-alive>
  			<router-view></router-view>
  		</keep-alive>
  </div>
</template>

<script>
import vHeader from 'components/v-header/v-header'
import tabs from 'components/tabs/tabs'
export default {
  components:{
  	vHeader,
  	tabs
  }
}
</script>

<style>
@import './common/css/reset.css';
@import './common/css/icon.css';
#app{
	color:#ffffff;
}
</style>
