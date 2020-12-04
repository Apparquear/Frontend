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
            class="my-1 mx-2 mx-sm-1 button-primary"
            type="button"
            :to="'parkingmap'"
            >Encuentra parqueadero</b-button
          >
          <b-button
            size="md"
            class="my-1 mx-2 mx-sm-1 button-primary"
            type="button"
            :to="'parking_register'"
            >Registrar parqueadero</b-button
          >
          <b-nav-item-dropdown right style="align-self: center">
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              User
            </template>
            <b-dropdown-item :to="'#'">Profile</b-dropdown-item>
            <b-dropdown-item @click="logOut">Salir</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import auth from "../logic/auth";

export default {
  name: "NavBar",
  methods: {
    makeToast(variant = null, tittle, text) {
      this.$bvToast.toast(text, {
        toaster: "b-toaster-bottom-right",
        title: tittle,
        variant: variant,
        solid: true,
        appendToast: true
      });
    },
    invalidateToken() {
      let token = sessionStorage.getItem("ap_token")
      auth
        .invalidate_token(token)
        .then(response => {
          if (response && response.status == 200) {
            console.log("token invalidado");
          }
        })
        .catch(error => {
          console.log(error);
        });
      sessionStorage.removeItem("ap_user_id");
      sessionStorage.removeItem("ap_token");
    },
    logOut() {
      this.invalidateToken();
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
.button-primary {
  background-color: #adadad;
  border-color: #adadad;
  color: #111110;
}
.link {
  color: #004e64;
}
.navbar {
  background-color: #6d6f75;
  color: #f6f7eb;
}
</style>
