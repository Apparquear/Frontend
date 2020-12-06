<template>
  <b-container fluid class="body backgroundImg">
    <b-row align-v="center" class="h-100">
      <b-col>
        <div class="text-center justify-content-center">
          <h3>Cargando...</h3>
        </div>
        <div class="text-center justify-content-center">
          <b-spinner></b-spinner>
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
  color: #141414;
  height: 100vh!important;
}
.backgroundImg {
  background-image: url("../assets/Home_BG.png");
}
</style>
