export default class singer {
	constructor({name,picUrl}){
		this.id = picUrl
		this.name = name,
		this.picUrl = `//y.gtimg.cn/music/photo_new/T001R150x150M000${picUrl}.jpg?max_age=2592000`
	}
}