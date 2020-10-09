<template>
  <div >
    <div class="container">
      <!---HEADER--->
        <div class="header clearfix">
            <nav>
              <ul class="nav nav-pills pull-right">
                <li role="presentation" >
                  <router-link to="/home" active-class="menuActivo" title="Home">Home</router-link>
                </li>
                <li role="presentation" >
                  <router-link to="/register" active-class="menuActivo" title="Registro">Registro</router-link>
                </li>
                <li role="presentation" >
                  <router-link to="/contact" active-class="menuActivo" title="Contacto">Contacto</router-link>
                </li>
              </ul>
            </nav>
            <h3 class="text-muted"><img src="./assets/images/logo.svg" alt="Apparquear" style="width:70px"></h3>
        </div>
      <!---/HEADER--->

      <!---Contenido--->
        <router-view></router-view>
      <!---/Contenido--->

      <!---footer--->
        <footer class="footer">
          <p>&copy; Desarrollado por ApparquearTeam.</p>
        </footer>
      <!---footer--->
      </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
    
  }
}
</script>

<style>
@import './assets/css/bootstrap.css';
@import './assets/css/jumbotron-narrow.css';
@import './assets/css/estilos.css';

</style>





