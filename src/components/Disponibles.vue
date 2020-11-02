<template>
  <div>
    <NavBar> </NavBar>
    <b-container class="disp">
      <h1 class="title"><b>Disponibilidad de Bahías</b></h1>

      <b-form class="form" @submit="checkForm" id="form">
        <label class="title2">Id del parqueadero</label>
        <b-form-input v-model="number"></b-form-input>

        <label class="title2">Fecha</label>
        <b-form-datepicker
          id="example-datepicker"
          v-model="date"
          class="mb-2"
        ></b-form-datepicker>

        <label class="title2">Hora</label>
        <b-form-timepicker v-model="time" locale="en"></b-form-timepicker>

        <!-- Submit button -->
        <b-button
          size="lg"
          block
          class="button-primary mt-4"
          type="Submit"
          :to="'bahias'"
          >Consultar</b-button
        >
      </b-form>
    </b-container>
    <Footer> </Footer>
  </div>
</template>

<script>
import NavBar from "./NavBar.vue";
import Footer from "./Footer.vue";
export default {
  data() {
    return {
      types: ["number", "date", "time"],
    };
  },
  components: {
    NavBar,
    Footer,
  },
};
</script>

<style scoped>
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
