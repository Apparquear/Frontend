<template>
  <div class="register">
    <b-container>
      <h1 class="title"><b>Regístrate en Apparquear</b></h1>
      <b-form class="form" @submit="checkForm" id="form">
        <!-- Nombre -->
        <b-form-group class="light-text" label="Nombre" label-for="name">
          <b-input
            type="text"
            maxlength="100"
            id="name"
            placeholder="Ingresa tu nombre"
            v-model="name"
          ></b-input
        ></b-form-group>
        <!-- Edad -->
        <b-form-group class="light-text" label="Edad" label-for="age">
          <b-input
            type="number"
            id="age"
            placeholder="Ingresa tu edad"
            v-model="age"
          ></b-input
        ></b-form-group>
        <!-- Correo -->
        <b-form-group class="light-text" label="Email" label-for="email">
          <b-input
            type="email"
            id="email"
            placeholder="Ingresa tu email"
            v-model="email"
          ></b-input
        ></b-form-group>
        <!-- Password -->
        <b-form-group
          class="light-text"
          label="Contraseña"
          label-for="password"
          description="Tu contraseña debe contener al menos 8 caracteres."
        >
          <b-input
            type="password"
            maxlength="100"
            id="password"
            aria-describedby="password-help-block"
            placeholder="Ingresa tu contraseña"
            v-model="password"
          ></b-input
        ></b-form-group>
        <!-- Confirm password -->
        <b-form-group
          class="light-text"
          label="Repite la contraseña"
          label-for="password_repeat"
        >
          <b-input
            type="password"
            maxlength="100"
            id="password_repeat"
            aria-describedby="password-help-block"
            placeholder="Ingresa tu contraseña"
            v-model="password_repeat"
          ></b-input
        ></b-form-group>
        <!-- Submit button -->
        <b-button block class="button-primary mt-4" size="lg" type="submit"
          >Registrarme</b-button
        >
      </b-form>
      ¿Ya tienes una cuenta? <router-link :to="'login'">Ingresa aquí</router-link>
    </b-container>
  </div>
</template>

<script>
import auth from "../logic/auth";
export default {
  name: "Register",
  data: () => ({
    name: "",
    email: "",
    age: "",
    password: "",
    password_repeat: ""
  }),
  methods: {
    checkForm: function() {
      let regexName = /^[A-Za-z\s]+$/g;
      let regexEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
      // Validaciones
      if (!this.name) {
        return this.makeToast(
          "danger",
          "Nombre inválido",
          "Por favor digita tu nombre"
        );
      }
      if (!this.age) {
        return this.makeToast(
          "danger",
          "Edad inválida",
          "Por favor digita tu edad"
        );
      }
      if (!this.email) {
        return this.makeToast(
          "danger",
          "Email inválido",
          "Por favor digita tu email"
        );
      }
      if (!this.password) {
        return this.makeToast(
          "danger",
          "Contraseña inválida",
          "Por favor digita tu contraseña"
        );
      }
      if (!this.password_repeat) {
        return this.makeToast(
          "danger",
          "Contraseña inválida",
          "Por favor vuelve a digitar tu contraseña"
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
      if (this.age < 12 || this.age > 100) {
        return this.makeToast(
          "warning",
          "Edad inválida",
          "Tu edad debe estar entre los 12 y 100 años"
        );
      }
      if (!regexEmail.test(this.email)) {
        return this.makeToast(
          "warning",
          "Email inválido",
          "Por favor verifica tu email"
        );
      }
      if (this.password.length < 8 || this.password.length > 100) {
        return this.makeToast(
          "warning",
          "Contraseña inválida",
          "Tu contraseña debe contener entre 8 y 100 caracteres"
        );
      }
      if (this.password_repeat != this.password) {
        return this.makeToast(
          "warning",
          "Contraseña inválida",
          "Tus contraseñas no coinciden"
        );
      }
      return this.register();
    },
    register: function() {
      auth
        .register(
          this.name,
          this.password,
          this.email,
          this.age
        )
        .then(response => {
          if(response && response.status == 200){
            this.makeToast("success", "Registro completado", "Has completado tu registro exitosamente");
            setTimeout(function(){
              this.$router.push({ path: '/login' });
            },1000);
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
    }
  }
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
.register {
  padding: 2rem;
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
</style>
