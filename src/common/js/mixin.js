import {mapGetters} from 'vuex'

export const playlistMixin = {
	computed:{
		...mapGetters({
			playlist:'playlist',
			minPlayerHeight:'minPlayerHeight'
		})
	},
	mounted(){
		this.handlePlaylist(this.playlist);
	},
	activated(){
		this.handlePlaylist(this.playlist);
	},
	watch:{
		playlist(newVal){
			this.handlePlaylist(newVal);
		},
		minPlayerHeight(){
			this.handlePlaylist(this.playlist);
		}
	},
	methods:{
		handlePlaylist(){
			throw new Error('components must implement handlePlaylist method');
		}
	}
	
}
