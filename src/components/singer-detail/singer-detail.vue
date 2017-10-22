<template>
	<transition name="translate">
		<music-list :pic="pic" :title="singer.name" :songs="songs"></music-list>
	</transition>
</template>

<script>
	import { mapGetters } from 'vuex'
	import { getMusic } from 'api/singer.js'
	import vueResource from 'vue-resource'
	import { Song, createSong } from 'common/js/song.js'
	import musicList from 'components/music-list/music-list'

	export default {
		props: {

		},
		data() {
			return {
				songs:[]
			}
		},
		mounted() {
			if(!this.singer.id) {
				this.singerListBack()
				return
			}
			this.$http.jsonp(getMusic.url, {
				params: {
					...getMusic.params,
					singermid: this.singer.id,
				},
				jsonp: getMusic.jsonp
			}).then((res) => {
				this.songs = this._normalSongs(res.body.data.list);
			})
		},
		methods: {
			singerListBack() {
				this.$router.push({
					path: `/singer`
				})
			},
			_normalSongs(list) {
				let ret = []
				list.forEach((item) => {
					let {musicData} = item;
					if(musicData.songid && musicData.albummid){
						ret.push(createSong(musicData))
					}
				})
				return ret
			}
		},
		computed: {
			pic(){
				return `http://y.gtimg.cn/music/photo_new/T001R300x300M000${this.singer.id}.jpg?max_age=2592000`
			},
			...mapGetters({
				singer: 'singer',
			}),
			
		},
		components:{
			musicList,
		},
		created() {

		}
	}
</script>

<style>
	.translate-enter-active,
	.translate-leave-active {
		transition: all 0.3s ease;
	}
	
	.translate-enter,
	.translate-leave-to {
		transform: translateX(100%);
		opacity: 0;
	}
</style>