import storage from 'good-storage'

const SEARCH_KEY = '__search__';
const SEARCH_LENGTH = 15;

const PLAY_HISTORY_KEY = '__playHistory__'
const PLAY_HISTORY_LENGTH = 15

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

export function getPlayerHistory(){
	return storage.get(PLAY_HISTORY_KEY,[])
}
