import {commonParams,options} from './config.js'

export const getRanking = {
	url:'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg',
	params: Object.assign({}, commonParams, {
		platform:'h5',
		needNewCode:1,
	}),
	jsonp:options.jsonp
}

export const getRankingSong = {
	url:'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg',
	params: Object.assign({}, commonParams, {
		platform:'h5',
		needNewCode:1,
		tpl:3,
		page:'detail',
		type:'top',
		topid:4,
	}),
	jsonp:options.jsonp
}