<template>
  <div>
    <div v-if="!authenticated">
      <Loading> </Loading>
    </div>
    <div v-if="authenticated">
      <NavBar> </NavBar>
      <b-jumbotron class="max-height">
        <b-card
          class="head-card"
          style="border : none!important; pading: 0; "
        >        
          <br/><h3 class="heading"><b>¿Buscas un <br/>parqueadero?</b></h3>

          <br class="my-4"/>

          <p><b>Nosotros lo encontramos por ti</b></p>
          <div class="buttons">
            <b-button href="#" class="button-primary"
            size="md"                        
            :to="'parkingmap'">Encontrar parqueadero</b-button>
         
            <b-button href="#" class="button-secondary"
            size="md"
            :to="'register'"
            >Registrar parqueadero</b-button>

            <b-button href="#" type="button" 
            class="btn btn-light"
            size="md"
            :to="'register'"
            >Mis parqueaderos</b-button>         
          </div>          
        </b-card>
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

.btn btn-light{
  margin: 10px;
}

.buttons{
  margin-top: 150px;
}

.heading{
  color:black
}

.button-primary {
  margin: 10px;
  background-color: #000000;
  border-color: #000000;
  color: #f6f7eb;
}
.button-secondary {
  margin: 10px;
  background-color: #adadad;
  border-color: #adadad;
  color: #111110;
}
.max-height {
  height: 100%;
}
</style>
