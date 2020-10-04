<template>
  <div class="login">
    <h1 class="title">Iniciar sesión</h1>
    <form action class="form" @submit.prevent="login">
      <label class="form-label" for="#email">Usuario:</label>
      <input
        v-model="email"
        class="form-input"
        type="email"
        id="email"
        required
        placeholder="Correo"
      />
      <label class="form-label" for="#password">Contraseña:</label>
      <input
        v-model="password"
        class="form-input"
        type="password"
        id="password"
        required
        placeholder="Contraseña"
      />
      <p v-if="error" class="error">
        Has introducido mal el email o la contraseña.
      </p>
      <input class="form-submit" type="submit" value="Login" />
    </form>
  </div>
</template>

<script>
export default {
  data: () => ({
    email: "",
    password: "",
    error: false
  }),
  methods: {
    login() {
      
        console.log(this.email);
        console.log(this.password);
      


      
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  padding: 2rem;
}
.title {
  text-align: center;
}
.form {
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 30%;
  min-width: 350px;
  max-width: 100%;
  background: rgba(63, 109, 161, 0.9);
  border-radius: 5px;
  padding: 40px;
  box-shadow: 0 4px 10px 4px rgba(60, 57, 75, 0.3);
}
.form-label {
  margin-top: 2rem;
  color: rgb(12, 4, 82);
  margin-bottom: 0.5rem;
  font-weight: bold;
  &:first-of-type {
    margin-top: 0rem;
  }
}
.form-input {
  padding: 10px 15px;
  background: none;
  background-image: none;
  background-color:#fafafa;
  border: 1px solid rgb(83, 121, 192);
  color: rgb(43, 43, 49);
  &:focus {
    outline: 0;
    border-color: #c0bcf5;
  }
}
.form-submit {
  background: #2e4775;
  border: none;
  color: white;
  margin-top: 3rem;
  padding: 1rem 0;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #052f5f;
  }

  
}


</style>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
