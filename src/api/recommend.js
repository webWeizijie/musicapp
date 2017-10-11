import { commonParams,options } from './config.js'

export const getRecommend = {
	 url : 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg',
	 params : Object.assign({}, commonParams, {
		platform: 'h5',
		uin: 0,
		needNewCode: 1
	}),
	jsonp:options.jsonp,
}