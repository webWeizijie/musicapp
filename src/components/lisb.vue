<template>
	<div>
		<div>
			我是lisb
		</div>
		<ul>
			<li v-for="item in personList">
				{{item.name}}
				{{item.age}}
			</li>
		</ul>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				
			}
		},
		computed:{
			personList(){
				return this.$store.getters.computedList
			}
		}
	}
</script>

<style>
	li{
		list-style: none;
		margin-top: 20px;
	}
</style>