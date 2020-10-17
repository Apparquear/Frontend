<template>
  <div>
    <b-navbar toggleable="lg" type="dark" class="navbar">
      <b-navbar-brand :to="'home'">Apparquear</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-button
            size="md"
            class="my-2 my-sm-0"
            type="button"
            :to="'map'"
            >Encuentra parqueadero</b-button
          >
          
          <b-button
            size="md"
            class="my-2 my-sm-0"
            type="button"
            :to="'parking_register'"
            >Registrar parqueadero</b-button
          >
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              User
            </template>
            <b-dropdown-item :to="'#'">Profile</b-dropdown-item>
            <b-dropdown-item :to="'login'">Salir</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "NavBar"
};
</script>

<style scoped>
.link {
  color: #004e64;
}
.navbar {
  background-color: #004e64;
  color: #f6f7eb;
}
</style>
