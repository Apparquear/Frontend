<template>
  <div class="contact">
    <h1 class="title">Contacto</h1>

    <form form action class="form">
      <div class="form-group">
        <label for="exampleFormControlInput1">Correo</label>
        <input
          type="email"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="name@example.com"
        />
      </div>
      <div class="form-group">
        <label for="exampleFormControlTextarea1">¿Qué problema tienes?</label>
        <textarea
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
        ></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Enviar</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Contact",
};
</script>

<style scoped>
.contact {
  padding: 4rem;
}
.title {
  text-align: center;
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

.form-group {
  color: #dce1de;
}

.form-control {
  padding: 10px 15px;
  background: none;
  background-image: none;
  border: 1px solid #f6f7eb;
  color: #f6f7eb;
  &:focus {
    outline: 0;
    border-color: #1ab188;
  }
}
.btn-primary {
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
