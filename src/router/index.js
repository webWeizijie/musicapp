import Vue from 'vue'
import Router from 'vue-router'
import ranking from 'components/ranking/ranking'
import singer from 'components/singer/singer'
import recommend from 'components/recommend/recommend'
import search from 'components/search/search'
import singerDetail from 'components/singer-detail/singer-detail'
import disc from 'components/disc/disc'
import rankList from 'components/rank-list/rank-list'
import userCenter from 'components/user-center/user-center'
import startPage from 'base/start-page/start-page'
Vue.use(Router)

//const recommend = (resolve) =>{
//	 import('components/recommend/recommend').then((module)=>{
//	 		resolve(module)
//	 })
//}
//
//const singer = (resolve) =>{
//	 import('components/singer/singer').then((module)=>{
//	 		resolve(module)
//	 })
//}
//
//const ranking = (resolve) =>{
//	 import('components/ranking/ranking').then((module)=>{
//	 		resolve(module)
//	 })
//}
//
//const search = (resolve) =>{
//	 import('components/search/search').then((module)=>{
//	 		resolve(module)
//	 })
//}
//
//const singerDetail = (resolve) =>{
//	 import('components/singer-detail/singer-detail').then((module)=>{
//	 		resolve(module)
//	 })
//}
//
//const disc = (resolve) =>{
//	 import('components/disc/disc').then((module)=>{
//	 		resolve(module)
//	 })
//}
//
//const rankList = (resolve) =>{
//	 import('components/rank-list/rank-list').then((module)=>{
//	 		resolve(module)
//	 })
//}
//
//const userCenter = (resolve) =>{
//	 import('components/user-center/user-center').then((module)=>{
//	 		resolve(module)
//	 })
//}
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
    	children:[
    		{
    			path:':id',
    			component:singerDetail,
    		}
    	]
    },
    {
    	path:'/user',
    	component:userCenter,
    }
  ]
})
