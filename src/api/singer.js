import {commonParams,options} from './config'

export const getSinger = {
	 url : 'https://c.y.qq.com/v8/fcg-bin/v8.fcg',
	 params : Object.assign({}, commonParams, {
		channel: 'singer',
		page:'list',
		pagesize:100,
		key:'all_all_all',
		pagenum:1,
		uin: 0,
		needNewCode: 1,
		platform:'yqq',
		needNewCode:0,
		loginUin:0,
		hostUin:0
	}),
	jsonp:options.jsonp,
}
