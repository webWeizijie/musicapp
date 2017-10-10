<template>
	<div>
		<lista></lista><br /><br />
		<listb></listb>
	</div>
</template>

<script>
import lista from "./lisa"
import listb from "./lisb"
export default {
  name: 'HelloWorld',
  data () { 
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components:{
  	lista,
  	listb
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
