<template>
  <div>
    <NavBar> </NavBar>
    <b-container class="disp">
      <h1 class="title"><b>Reservar bahia</b></h1>
      <b-form class="form" @submit="checkForm" id="form">
        <label class="title2">Fecha de Entrada</label>
        <!-- <b-form-datepicker
          id="example-datepicker"
          v-model="date"
          class="mb-2"
        ></b-form-datepicker> -->
        <datetime
          format="YYYY-MM-DD H:i:s"
          width="300px"
          v-model="datetimeIn"
        ></datetime>

        <label class="title2">Fecha de Salida</label>

        <datetime
          format="YYYY-MM-DD H:i:s"
          width="300px"
          v-model="datetimeOut"
        ></datetime>
        <!--<b-form-timepicker v-model="time" locale="en"></b-form-timepicker> -->

        <!-- Submit button -->
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
        <b-button
          size="lg"
          block class="button-primary"
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
import datetime from "vuejs-datetimepicker";
export default {
  data() {
    return {
      value: null,
      dateTimeIn: "",
      dateTimeOut: "",
      options: ["carros", "ciclas", "motos"],
      types: ["date", "time"],
    };
  },
  components: {
    NavBar,
    Footer,
    datetime,
  },
  methods: {
    get: function () {
      this.$router.push({ path: "/bahias" });
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style >
.button-primary {
  background-color: #4a051c;
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