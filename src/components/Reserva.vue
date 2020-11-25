<template>
  <div>
    <NavBar> </NavBar>
    <b-container class="disp">
      <h1 class="title"><b>Reservar bahia</b></h1>
      <b-form class="form" @submit="checkForm" id="form">
        <label class="title2">Fecha de Entrada</label>

        <flat-pickr
          v-model="date"
          :config="config"
          class="form-control"
          placeholder="Select date"
          name="date"
        >
        </flat-pickr>

        <label class="title2">Fecha de Salida</label>

        <flat-pickr
          v-model="date"
          :config="config"
          class="form-control"
          placeholder="Select date"
          name="date"
        >
        </flat-pickr>

        <label class="title2">Tipo de vehiculo</label>
        <select
          v-model="newRol"
          label="Seleccione el rol"
          class="browser-default custom-select"
        >
          <option value="carros">Carros</option>
          <option value="motos">Motos</option>
          <option value="cicla">Cicla</option>
        </select>
        <br />
        <b-button
          size="lg"
          block
          class="button-primary"
          v-on:click.prevent="get"
          >Reservar</b-button
        >
      </b-form>
    </b-container>
    <Footer> </Footer>
  </div>
</template>

<script>
import NavBar from "./NavBar.vue";
import Footer from "./Footer.vue";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
export default {
  name: "Reserva",
  data() {
    return {
      date: new Date(),
      // https://chmln.github.io/flatpickr/options/
      config: {
        altFormat: "F j, Y",
        altInput: true,
        enableTime: true,
        dateFormat: "Y-m-d H:i",
      },

      options: ["carros", "ciclas", "motos"],
    };
  },
  components: {
    NavBar,
    Footer,
    flatPickr,
  },
  methods: {
    get: function () {
      this.$router.push({ path: "/" });
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style >
.button-primary {
  background-color: #4a051c;
  border-color: #4a051c;
  color: #f6f7eb;
}
.light-text {
  color: #f6f7eb !important;
}
.disp {
  padding: 2rem;
}
.title {
  text-align: center;
  font-size: 2.5em;
  color: #4a051c;
}
.title2 {
  text-align: center;
  color: #f6f7eb;
}
.form {
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
  background: #004e64;
  border-radius: 10px;
  max-width: 540px;
  padding: 40px;
  box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.3);
}
</style>
