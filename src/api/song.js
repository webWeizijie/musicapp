import {commonParams,options} from './config'

export const getLyric = {
	 url:'/api/lyric',
	 params : Object.assign({}, commonParams, {
		pcachetime:+new Date(),
		loginUin:0,
		hostUin:0,
		platform:'yqq',
		needNewCode:0,
		format: 'json'
	}),
	//jsonp:options.jsonp,
}