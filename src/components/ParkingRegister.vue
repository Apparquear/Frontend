<template>

  <div class="parkingregister">
    <NavBar> </NavBar>
    <b-container>
      
        <h1 class="title"><b>Registrar Parqueadero</b></h1>

        <b-form class="form" @submit="checkForm" id="form">

          <!-- Nombre -->
          <b-form-group class="light-text" label="Nombre" label-for="name">
            <b-input
              type="text"
              maxlength="100"
              id="name"
              placeholder="Ingresa el nombre del parqueadero"
              v-model="name"
            ></b-input
          ></b-form-group>

          <!-- Ubicacion -->
          <b-form-group class="light-text" label="Ubicacion" label-for="ubication">
            <b-input
              type="text"
              maxlength="100"
              id="ubication"
              placeholder="Ingresa la ubicacion"
              v-model="ubication"
            ></b-input
          ></b-form-group>

          <!-- Horario -->
          <b-form-group class="light-text" label="Horario" label-for="schedule_open">
            <b-input
              type="time"
              id="schedule_open"
              v-model="schedule_open"
              width
            ></b-input
          ></b-form-group>

          <b-form-group class="light-text" label-for="schedule_close">
            <b-input
              type="time"
              id="schedule_close"
              v-model="schedule_close"
            ></b-input
          ></b-form-group>

          <!-- Costo -->
          <b-form-group class="light-text" label="Costo" label-for="cost_v">
            <b-input
              type="number"
              id="cost_v"
              placeholder="Vehiculo"
              v-model="cost_v"
            ></b-input
          ></b-form-group>
          
          <b-form-group class="light-text" label-for="cost_m">
            <b-input
              type="number"
              id="cost_m"
              placeholder="Motocicleta"
              v-model="cost_m"
            ></b-input
          ></b-form-group>

          <b-form-group class="light-text" label-for="cost_b">
            <b-input
              type="number"
              id="cost_b"
              placeholder="Bicicleta"
              v-model="cost_b"
            ></b-input
          ></b-form-group>

          <!-- Cupos -->
          <b-form-group class="light-text" label="Cupos" label-for="slot_v">
            <b-input
              type="number"
              id="slot_v"
              placeholder="Vehiculo"
              v-model="slot_v"
            ></b-input
          ></b-form-group>
          
          <b-form-group class="light-text" label-for="slot_m">
            <b-input
              type="number"
              id="slot_m"
              placeholder="Motocicleta"
              v-model="slot_m"
            ></b-input
          ></b-form-group>

          <b-form-group class="light-text" label-for="slot_b">
            <b-input
              type="number"
              id="slot_b"
              placeholder="Bicicleta"
              v-model="slot_b"
            ></b-input
          ></b-form-group>

          <b-button block class="button-primary mt-4" syze="sm" type="submit">Registrar</b-button>

        </b-form>
      
      <Footer> </Footer>
    </b-container>
  </div>

</template>

<script>

import NavBar from "./NavBar.vue";
import Footer from "./Footer.vue";
import auth from "../logic/auth";

export default {
  name: "Registrar",
  components: {
    NavBar,
    Footer
  },
  props: {
    msg: String
  },

  data: () => ({
    name: "",
    ubication: "",
    schedule_open: "",
    schedule_close: "",
    cost_v: "",
    cost_m: "",
    cost_b: "",
    slot_v: "",
    slot_m: "",
    slot_b: ""
  }),

  methods: {
    checkForm: function() {

      let regexName = /^[A-Za-z\s]+$/g;
      
      // Validaciones
      if (!this.name) {
        return this.makeToast(
          "danger",
          "Nombre inválido",
          "Por favor digita tu nombre"
        );
      }
      if (!this.ubication) {
        return this.makeToast(
          "danger",
          "Ubicacion inválida",
          "Por favor ingresa una ubicacion"
        );
      }
      if (!this.schedule_open) {
        return this.makeToast(
          "danger",
          "Horario de entrada inválido",
          "Por favor ingresa un horario valido"
        );
      }
      if (!this.schedule_close) {
        return this.makeToast(
          "danger",
          "Horario de cierre inválido",
          "Por favor ingresa un horario valido"
        );
      }
      if (!this.cost_v) {
        return this.makeToast(
          "danger",
          "Costo invalido",
          "Por favor ingresa un costo valido"
        );
      }
      if (!this.cost_m) {
        return this.makeToast(
          "danger",
          "Costo invalido",
          "Por favor ingresa un costo valido"
        );
      }
      if (!this.cost_b) {
        return this.makeToast(
          "danger",
          "Costo invalido",
          "Por favor ingresa un costo valido"
        );
      }
      if (!this.slot_v) {
        return this.makeToast(
          "danger",
          "Numero de cupos invalido",
          "Por favor ingresa un numero de cupos valido"
        );
      }
      if (!this.slot_m) {
        return this.makeToast(
          "danger",
          "Numero de cupos invalido",
          "Por favor ingresa un numero de cupos valido"
        );
      }
      if (!this.slot_b) {
        return this.makeToast(
          "danger",
          "Numero de cupos invalido",
          "Por favor ingresa un numero de cupos valido"
        );
      }


      if (this.name.length < 8) {
        return this.makeToast(
          "warning",
          "Nombre inválido",
          "Tu nombre debe contener entre 8 y 100 caracteres"
        );
      }
      if (!regexName.test(this.name)) {
        return this.makeToast(
          "warning",
          "Nombre inválido",
          "Tu nombre solo puede contener letras y espacios"
        );
      }
      if (this.schedule_open < 0 || this.schedule_open > 24) {
        return this.makeToast(
          "warning",
          "Hora inválida",
          "Debe ingresar una hora valida"
        );
      }
      if (this.schedule_close < 0 || this.schedule_close > 24) {
        return this.makeToast(
          "warning",
          "Hora inválida",
          "Debe ingresar una hora valida"
        );
      }
      if (this.cost_v < 0) {
        return this.makeToast(
          "warning",
          "Valor inválido",
          "Debe ingresar un valor valido"
        );
      }
      if (this.cost_m < 0) {
        return this.makeToast(
          "warning",
          "Valor inválido",
          "Debe ingresar un valor valido"
        );
      }
      if (this.cost_b < 0) {
        return this.makeToast(
          "warning",
          "Valor inválido",
          "Debe ingresar un valor valido"
        );
      }
      if (this.slot_v < 0) {
        return this.makeToast(
          "warning",
          "Numero de cupos inválido",
          "Debe ingresar un numero de cupos valido"
        );
      }
      if (this.slot_m < 0) {
        return this.makeToast(
          "warning",
          "Numero de cupos inválido",
          "Debe ingresar un numero de cupos valido"
        );
      }
      if (this.slot_b < 0) {
        return this.makeToast(
          "warning",
          "Numero de cupos inválido",
          "Debe ingresar un numero de cupos valido"
        );
      }
      return this.register();
    },

    register: function() {
      auth
        .register(
          this.name,
          this.ubication,
          this.schedule_open,
          this.schedule_close,
          this.cost_v,
          this.cost_m,
          this.cost_b,
          this.slot_v,
          this.slot_m,
          this.slot_b
        )
        .then(response => {
          if(response && response.status == 200){
            this.makeToast("sucess", "Registro completado", "Has completado tu registro exitosamente");
            setTimeout(function(){
              this.toLogin()
            }.bind(this),1000);
          }
        })
        .catch(error => {
          this.makeToast("danger", "Registro fallido", error.response.data.message);
        });
    },
    makeToast(variant = null, tittle, text) {
      this.$bvToast.toast(text, {
        toaster: "b-toaster-bottom-right",
        title: tittle,
        variant: variant,
        solid: true,
        appendToast: true
      });
    },
    toLogin(){
      this.$router.push({ path: '/login' });
    }
  }

};

</script>

<style scoped>

.button-primary {
  background-color: #4a051c;
  color: #f6f7eb;
}

.title {
  text-align: center;
  font-size: 2.5em;
  color: #4a051c;
}

.form {
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
  background: #004e64;
  border-radius: 10px;
  padding: 40px;
  box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.3);
}

.light-text {
  color: #f6f7eb !important;
}

</style>
