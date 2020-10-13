<template>
  <div>
    <NavBar> </NavBar>
    <b-jumbotron class="max-height">
      <template v-slot:header>Apparquear</template>

      <template v-slot:lead>
        Bienvenido a Apparquear
      </template>

      <hr class="my-4" />

      <p>
        ¿Buscas un parqueadero? Nosotros lo buscamos por ti.
      </p>

      <b-button href="#" class="button-primary">Botón primario</b-button>
      <b-button href="#" class="button-secondary">Botón secundario</b-button>
    </b-jumbotron>
    <Footer> </Footer>
  </div>
</template>

<script>
import NavBar from "./NavBar.vue";
import Footer from "./Footer.vue";
export default {
  name: "Home",
  components: {
    NavBar,
    Footer
  }
};
</script>

<style scoped>
.button-primary {
  background-color: #4a051c;
  color: #f6f7eb;
}
.button-secondary {
  background-color: #1a936f;
  color: #f6f7eb;
}
.max-height{
  height: 100%;
}
</style>
