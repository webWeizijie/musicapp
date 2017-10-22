import Vue from 'vue'
import Router from 'vue-router'
import ranking from 'components/ranking/ranking'
import singer from 'components/singer/singer'
import recommend from 'components/recommend/recommend'
import search from 'components/search/search'
import singerDetail from 'components/singer-detail/singer-detail'
import disc from 'components/disc/disc'
import rankList from 'components/rank-list/rank-list'
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
    	children:[
    		{
    			path:':id',
    			name:'discroute',
    			component:disc
    		}
    	]
    },
    {
    	path:'/singer',
    	component:singer,
    	children:[
    		{
    			path:':id',
    			component:singerDetail,
    		}
    	]
    },
    {
    	path:'/ranking',
    	component:ranking,
    	children:[
	    	{
	    		path:':id',
	    		component:rankList
	    	}
    	]
    },
    {
    	path:'/search',
    	component:search,
    }
  ]
})
