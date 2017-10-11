import Vue from 'vue'
import Router from 'vue-router'
import ranking from '@/components/ranking/ranking'
import singer from '@/components/singer/singer'
import recommend from '@/components/recommend/recommend'
import search from '@/components/search/search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/recommend'
    },
    {
    	path:'/recommend',
    	component:recommend,
    },
    {
    	path:'/singer',
    	component:singer,
    },
    {
    	path:'/ranking',
    	component:ranking,
    },
    {
    	path:'/search',
    	component:search,
    }
  ]
})
