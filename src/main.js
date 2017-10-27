// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index.js'
import htmlCssAuto from './common/js/htmlAuto.js'
import fastClick from 'fastclick'
import vueLazyLoad from 'vue-lazyload'

import VConsole from 'vconsole'
//var vConsole = new VConsole();
//console.log('test')

Vue.use(vueLazyLoad,{
	loading:require('common/image/default.png'),
	attempt: 1
})
fastClick.attach(document.body);  

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
