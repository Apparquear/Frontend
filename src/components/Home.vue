<template>
  <div>
    <div v-if="!authenticated">
      <Loading> </Loading>
    </div>
    <div v-if="authenticated">
      <NavBar> </NavBar>
      <b-jumbotron class="max-height backgroundImg m-0">
        <b-container class="text-left ml-1">
          <br />
          <h1 class="heading"><strong>¿Parqueadero?</strong></h1>
          <h3>Lo encontramos por tí.</h3>
        </b-container>

        <div class="buttons">
          <b-button
            href="#"
            class="button-primary rounded-pill"
            size="md"
            :to="'parkingmap'"
            >Encontrar parqueadero</b-button
          >
          <br />
          <b-button
            href="#"
            class="button-secondary rounded-pill"
            size="md"
            :to="'parking_register'"
            >Registrar parqueadero</b-button
          >
          <br />
          <b-button
            href="#"
            type="button"
            class="third-btn"
            size="md"
            v-on:click="isOwner()"
            >Mis parqueaderos</b-button
          >
        </div>
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
    isOwner(){
      let user_id;
      user_id= sessionStorage.getItem("ap_user_id");
      auth
        .isOwner(user_id)
        .then(response =>{
          console.log(response);
          if(response.data) this.$router.push({path:"/MyParkings"})
          else {this.makeToast(
                "warning",
                "No tienes parqueaderos",
                ""
              );}       
        } )
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
.buttons {
  margin-top: 20%;
  text-align: right;
}
.heading {
  color: #111110;
}
.button-primary {
  margin: 10px;
  background-color: #000000;
  border: none;
  color: #f6f7eb;
}
.button-secondary {
  margin: 10px;
  background-color: #fff199;
  border: none;
  color: #111110;
}
.third-btn {
  margin: 10px;
  background-color: rgba(0, 0, 0, 0);
  border: none;
  color: #111110;
}
.max-height {
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
}
.backgroundImg {
  background-image: url("../assets/Home_BG.png");
  height: 91vh;
}
</style>
