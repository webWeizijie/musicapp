import {mapGetters,mapActions,mapMutations} from 'vuex'
import {playMode} from 'common/js/config.js'

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


export const playerMixin = {
	computed:{
		iconMode() {
	      return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
	    },
		...mapGetters({
			mode:'mode',
			sequenceList:'sequenceList',
			currentSong:'currentSong'
		})
	},
	methods:{
		...mapMutations({
			setPlayMode:'SET_PLAY_MODE',
		}),
		...mapActions({
			deleteSong:'deleteSong'
		})
	}
}
