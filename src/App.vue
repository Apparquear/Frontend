<template>
  <md-app style="min-height: 100vh;" id="app">
    <router-view/>
  </md-app>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap');

#app {
  font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #1b1b1b;
  background-color: rgba(0,0,0,0);
  height: 100%;
}
</style>

