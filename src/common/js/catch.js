import storage from 'good-storage'

const SEARCH_KEY = '__search__';
const SEARCH_LENGTH = 15;

const PLAY_HISTORY_KEY = '__playHistory__'
const PLAY_HISTORY_LENGTH = 20

const FAVORITE_SONG_KEY = '__favoriteSong__'
const FAVORITE_SONG_LENGTH = 20

function insertArray(arr,val,compare,maxLen){
	const index = arr.findIndex(compare);
	if(index === 0){
		return
	}
	if(index > 0){
		arr.splice(index,1)
	}
	arr.unshift(val);
	if(maxLen && arr.length > maxLen){
		arr.pop()
	}
}

export function saveSearch(query){
	let searches = storage.get(SEARCH_KEY,[])
	insertArray(searches,query,(item)=>{
		return item === query
	},SEARCH_LENGTH)
	
	storage.set(SEARCH_KEY,searches);
	
	return searches
}

function deleteFromArray(arr,compare){
	const index = arr.findIndex(compare)
	if(index > -1){
		arr.splice(index,1)
	}
}

export function loadSearch(){
	return storage.get(SEARCH_KEY,[])
}

export function deleteSearch(query){
	let searches = storage.get(SEARCH_KEY,[])
	
	deleteFromArray(searches,(item)=>{
		return item == query
	})
	
	storage.set(SEARCH_KEY,searches);
	return searches
}

export function clearSearch(){
	storage.remove(SEARCH_KEY);
	return []
}

export function setPlayerHistory(song){
	let playHistory = storage.get(PLAY_HISTORY_KEY,[])
	insertArray(playHistory,song,(item)=>{
		return item.id == song.id
	},PLAY_HISTORY_LENGTH)
	
	storage.set(PLAY_HISTORY_KEY,playHistory);
	return playHistory
}

export function loadPlayerHistory(){
	return storage.get(PLAY_HISTORY_KEY,[])
}

export function setFavoriteList(song){
	let favoriteSong = storage.get(FAVORITE_SONG_KEY,[]);
	let index = favoriteSong.findIndex((item)=>{
		return item.id === song.id
	})
	if(index > -1){
		favoriteSong.splice(index,1)
	}else{
		favoriteSong.unshift(song);
	}
	
	
	storage.set(FAVORITE_SONG_KEY,favoriteSong);
	return favoriteSong
}

export function loadFavoriteList(){
	return storage.get(FAVORITE_SONG_KEY,[]);
}
