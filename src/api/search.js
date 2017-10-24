import {commonParams,options} from './config'

export const getSearchHot = {
	url:`https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg`,
	params:{
		...commonParams,
		platform:'h5',
		needNewCode:1,
	},
	jsonp:options.jsonp
}

export const searchSongs = {
	url:`https://szc.y.qq.com/soso/fcgi-bin/search_for_qq_cp`,
	params:{
		...commonParams,
		platform:'h5',
		needNewCode:1,
		zhidaqu:1,
		t:0,
		flag:1,
		ie:'utf-8',
		sem:1,
		aggr:0,
		remoteplace:'txt.mqq.all',
		uid:0
	},
	jsonp:options.jsonp
}
