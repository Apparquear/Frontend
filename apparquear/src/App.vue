<template>
<Registrar></Registrar>
</template>

<script>

import Registrar from './components/Registrar.vue'

export default {
  name: 'App',
  components: {
    Registrar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
