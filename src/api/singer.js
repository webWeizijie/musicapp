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

export const getMusic = {
	 url : 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg',
	 params : Object.assign({}, commonParams, {
		loginUin:0,
		hostUin:0,
		platform:'yqq',
		needNewCode:0,
		order:'listen',
		begin:0,
		num:30,
		songstatus:1,
	}),
	jsonp:options.jsonp,
}
