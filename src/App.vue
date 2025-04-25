<template>
  <NavBar/>
  <router-view />
</template>

<script>
import NavBar from './components/NavBar.vue'
import HelloWorld from './components/HelloWorld.vue'


export default {
  name: 'App',
  components: {
    NavBar,
    HelloWorld
  },
}
  

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
}
</style>
