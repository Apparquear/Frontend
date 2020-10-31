<template>
  <div class="login">
    <b-container>
      <h1 class="title"><b>Inicia sesión en Apparquear</b></h1>
      <b-form class="form" @submit="checkForm" id="form">
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
        <!-- Submit button -->
        <b-button block class="button-primary mt-4" size="lg" type="submit"
          >Iniciar sesión</b-button
        >
      </b-form>
      ¿Aún no tienes una cuenta?
      <router-link :to="'register'">Regístrate aquí</router-link>
    </b-container>
  </div>
</template>

<script>
import auth from "../logic/auth";
export default {
  data: () => ({
    email: "",
    password: ""
  }),
  methods: {
    checkForm: function() {
      let regexEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
      // Validaciones
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
      return this.login();
    },
    login() {
      auth
        .login(this.email, this.password)
        .then(response => {
          if (response && response.data) {
            if (!response.data.valid) {
              this.makeToast(
                "warning",
                "Ingreso fallido",
                "Credenciales incorrectas"
              );
            } else {
              this.makeToast(
                "success",
                "Ingreso correcto",
                "Inicio de sesión exitoso, redirigiendo..."
              );
              this.saveToken(response);
              setTimeout(
                function() {
                  this.$router.push({ path: "/home" });
                }.bind(this),
                1000
              );
            }
          }
        })
        .catch(error => {
          this.makeToast(
            "danger",
            "Ingreso fallido",
            error.response.data.message
          );
        });
    },
    saveToken(response) {
      sessionStorage.setItem("ap_user_id", response.data.user_ID);
      sessionStorage.setItem("ap_token", response.data.token);
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
.login {
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
