<template>
  <div>
    <div v-if="!authenticated">
      <Loading> </Loading>
    </div>
    <div v-if="authenticated">
      <NavBar> </NavBar>
      <b-jumbotron class="max-height">
        <template v-slot:header>Apparquear</template>

        <template v-slot:lead>
          Bienvenido a Apparquear
        </template>

        <hr class="my-4" />

        <p>
          ¿Buscas un parqueadero? Nosotros lo buscamos por ti.
        </p>

        <b-button href="#" class="button-primary">Botón primario</b-button>
        <b-button href="#" class="button-secondary">Botón secundario</b-button>
      </b-jumbotron>
      <Footer> </Footer>
    </div>
  </div>
</template>

<script>
import NavBar from "./NavBar.vue";
import Footer from "./Footer.vue";
import Loading from "./Loading.vue";
import auth from "../logic/auth";

export default {
  name: "Home",
  components: {
    NavBar,
    Footer,
    Loading
  },
  data: () => ({
    authenticated: false,
    user_id: null,
    token: null
  }),
  methods: {
    makeToast(variant = null, tittle, text) {
      this.$bvToast.toast(text, {
        toaster: "b-toaster-bottom-right",
        title: tittle,
        variant: variant,
        solid: true,
        appendToast: true
      });
    }
  },
  mounted: function() {
    let $vm = this;

    function invalidateToken() {
      sessionStorage.removeItem("ap_user_id");
      sessionStorage.removeItem("ap_token");
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
    }
    function toLogin() {
      if (sessionStorage.getItem("ap_token")) {
        invalidateToken();
      }
      $vm.$router.push("login");
    }
    function getToken() {
      if (
        sessionStorage.getItem("ap_token") &&
        sessionStorage.getItem("ap_user_id")
      ) {
        $vm.user_id = sessionStorage.getItem("ap_user_id");
        $vm.token = sessionStorage.getItem("ap_token");
        $vm.authenticated = true;
      } else {
        toLogin();
      }
    }
    function authenticate() {
      getToken();
    }
    setTimeout(function() {
      authenticate();
    }, 1000);
  }
};
</script>

<style scoped>
.button-primary {
  background-color: #4a051c;
  border-color: #4a051c;
  color: #f6f7eb;
}
.button-secondary {
  background-color: #1a936f;
  border-color: #1a936f;
  color: #f6f7eb;
}
.max-height {
  height: 100%;
}
</style>
