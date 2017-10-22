import {playMode} from 'common/js/config.js'
const state = {
	singer:{},
	playing:false,   //播放状态
	fullScreen:false, //播放歌曲展开闭合
	playlist:[],	//播放歌曲列表数据
	sequenceList:[],//播放列表
	mode:playMode.sequence,//播放模式
	currentIndex:-1,//当前第几个在播放
	minPlayerHeight:0,
	disc:{},
	ranking:{}
}

export default state
