import {commonParams,options} from './config.js'

export const getRecommend = {
	 url : 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg',
	 params : Object.assign({}, commonParams, {
		platform: 'h5',
		uin: 0,
		needNewCode: 1
	}),
	jsonp:options.jsonp,
}
export const getDiscList = {
	 url : '/api/getDiscList',
	 params : Object.assign({}, commonParams, {
		platform: 'yqq',
		hostUin: 0,
		sin:0,
		ein:29,
		sortId:5,
		needNewCode:0,
		categoryId:10000000,
		rnd:Math.random(),
		format:'json',
	}),
	jsonp:options.jsonp,
}

export const getDiscData = {
	url : '/api/disc',
	 params : Object.assign({}, commonParams, {
	 	g_tk:67232076,
		type:1,
		json:1,
		utf8:1,
		onlysong:0,
		loginUin:0,
		hostUin:0,
		format:'jsonp',
		platform:'yqq',
		needNewCode:0
	}),
	jsonp:options.jsonp,
}
