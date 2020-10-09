<template>
  
  <div class="register">
    <h1 class="title">Registro</h1>
    <form action class="form" @submit.prevent="register">
      <label class="form-label" for="#name">Nombre:</label>
      <input
        v-model="user_name"
        class="form-input"
        type="user_name"
        id="user_name"
        required
        placeholder="Nombre Completo"
      >
      <label class="form-label" for="#age">Edad:</label>
      <input
        v-model="user_age"
        class="form-input"
        type="user_age"
        id="user_age"
        required
        placeholder="Edad"
      >
      <label class="form-label" for="#email">Correo:</label>
      <input
        v-model="user_email"
        class="form-input"
        type="email"
        id="user_email"
        required
        placeholder="Email"
      >
      <label class="form-label" for="#password">Contraseña:</label>
      <input
        v-model="user_password"
        class="form-input"
        type="password"
        id="user_password"
        placeholder="Contraseña"
      >
      <label class="form-label" for="#password-repeat">Repite la contraseña:</label>
      <input
        v-model="passwordRepeat"
        class="form-input"
        type="password"
        id="password-repeat"
        placeholder="Contraseña"
      >
      <input class="form-submit" type="submit" value="Registrarse">
    </form>
  </div>
</template>

<script>
import auth from "@/logic/auth";
export default {
  name: 'Register',
  data: () => ({
    user_name: "",
    user_email: "",
    user_age: "",
    user_password: "",
    passwordRepeat: ""
  }),
  methods: {
  register() {
    auth.register(this.user_name,this.user_password,this.user_email,this.user_age).then(response => {
      console.log(response);
    })
  }
}
};
</script>

<style lang="scss" scoped>
.register {
  padding: 2rem;
}
.title {
  text-align: center;
  color: #4a051c;
}
.form {
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 20%;
  min-width: 350px;
  max-width: 100%;
  background: #004e64;
  border-radius: 5px;
  padding: 40px;
  box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.3);
}
.form-label {
  margin-top: 2rem;
  color: #dce1de;
  margin-bottom: 0.5rem;
  &:first-of-type {
    margin-top: 0rem;
  }
}
.form-input {
  padding: 10px 15px;
  background: none;
  background-image: none;
  border: 1px solid white;
  color: #dce1de;
  &:focus {
    outline: 0;
    border-color: #1ab188;
  }
}
.form-submit {
  background: #dce1de;
  border: none;
  color: #4a051c;
  margin-top: 3rem;
  padding: 1rem 0;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #1a936f;
  }
}
.error {
  margin: 1rem 0 0;
  color: #ff4a96;
}
</style>