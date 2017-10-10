<template>
	<div>
		<div>
			我是lisa
		</div>
		<ul>
			<li v-for="item in personList">
				{{item.name}}
				{{item.age}}
			</li>
		</ul>
		<button @click="addAge(number)">增加</button>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
	import {mapActions} from 'vuex'
	export default{
		data(){
			return {
				number:5,
			}
		},
		computed:{
			...mapGetters({
				personList:'computedList'
			})
		},
		methods:{
			...mapActions({
				addAge:'allAdd'
			})
		}
	}
</script>

<style>
	li{
		list-style: none;
		margin-top: 20px;
	}
</style>