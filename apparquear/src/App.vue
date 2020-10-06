<template>
  <div class="inicio">

    
    <Login/>
    

  </div>
</template>

<script>
import Login from './components/Login.vue'
export default {
  name: 'App',
  components: {
   
    Login

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #fafafa;
  text-align: center;
  color: #2c3e50;
}
</style>