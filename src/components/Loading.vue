<template>
  <b-container fluid class="body">
    <b-row align-v="center" class="h-100">
      <b-col>
        <div class="text-center justify-content-center">
          <h3>Cargando...</h3>
        </div>
        <div class="text-center justify-content-center">
          <b-spinner type="grow"></b-spinner>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: "Loading"
};
</script>

<style scoped>
.body {
  background-color: #dce1de;
  color: #004e64;
  height: 100vh;
}
</style>
