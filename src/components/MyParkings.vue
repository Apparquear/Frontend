<template>
  <div>
    <div v-if="!authenticated">
      <Loading> </Loading>
    </div>
    <div v-if="authenticated" class="backgroundImg">
      <NavBar> </NavBar>
      <b-row class="p-0 m-0" style="height: 91vh; overflow-y: scroll"
        ><b-col
          cols="4"
          class="p-0"
          v-for="(parking, index) in response"
          v-bind:key="parking + index"
        >
          <b-card
            border-variant="warning"
            :header="parking.parking_name"
            align="center"
            class="m-2"
          >
            <b-card-text
              ><b
                ><b-icon-clock style="width: 15px; height: 15px"></b-icon-clock>
                :
              </b>
              {{ parking.opening_time }}&emsp;
              <b
                ><b-icon-clock-fill
                  style="width: 15px; height: 15px"
                ></b-icon-clock-fill>
                : </b
              >{{ parking.closing_time }}
              <br />
              <br />
              <b-form inline class="justify-content-center my-1">
                <label class="mr-sm-2" for="inline-form-custom-select-pref"
                  ><b-icon-cash style="width: 15px; height: 15px"></b-icon-cash
                  >Costo bici por minuto: ${{ parking.bike_cost_minute }}</label
                >
                <b-form-input
                  type="number"
                  v-model="bike_cost_minute"
                  placeholder="Nueva tarifa"
                ></b-form-input
                ><br
              /></b-form>
              <b-form inline class="justify-content-center my-1">
                <label class="mr-sm-2" for="inline-form-custom-select-pref"
                  ><b-icon-cash style="width: 15px; height: 15px"></b-icon-cash
                  >Costo moto por minuto: ${{
                    parking.motorcycle_cost_minute
                  }}</label
                >
                <b-form-input
                  type="number"
                  v-model="motorcycle_cost_minute"
                  placeholder="Nueva tarifa"
                ></b-form-input
                ><br
              /></b-form>
              <b-form inline class="justify-content-center my-1">
                <label class="mr-sm-2" for="inline-form-custom-select-pref"
                  ><b-icon-cash style="width: 15px; height: 15px"></b-icon-cash
                  >Costo carro por minuto: ${{ parking.car_cost_minute }}</label
                >
                <b-form-input
                  type="number"
                  v-model="car_cost_minute"
                  placeholder="Nueva tarifa"
                ></b-form-input
                ><br
              /></b-form>
              <br />
              <b
                ><b-icon-star-half
                  style="width: 15px; height: 15px"
                ></b-icon-star-half>
                Calificacion: </b
              >{{ parking.score }}
              <br />
              <span
                ><b>Espacios disponibles para bicicleta a esta hora: </b
                >{{ parking.bike_spaces_available }}</span
              >
              <br />
              <span
                ><b>Espacios disponibles para moto a esta hora: </b
                >{{ parking.motorcycle_spaces_available }}</span
              >
              <br />
              <span
                ><b>Espacios disponibles para carro a esta hora: </b
                >{{ parking.car_spaces_available }}
              </span>
              <br />
              <span
                ><b>Espacios disponibles a esta hora: </b
                >{{ parking.total_spaces_available }}
              </span></b-card-text
            >
            <b-button
              :ref="'test'"
              variant="warning"
              class="rounded-pill"
              :pressed="change_price_check"
              v-on:click="changePrice(parking, index)"
              >Cambiar tarifas</b-button
            >
          </b-card>
        </b-col></b-row
      >
      <Footer> </Footer>
    </div>
  </div>
</template>

<script>
import auth from "../logic/auth";
import NavBar from "./NavBar.vue";
import Footer from "./Footer.vue";
import Loading from "./Loading.vue";
export default {
  name: "MyParkings",
  components: {
    NavBar,
    Footer,
    Loading
  },
  data() {
    return {
      response: null,
      authenticated: false
    };
  },
  methods: {
    myParkings() {
      ap_user_id = sessionStorage.getItem("ap_user_id");
      auth.myParkings(ap_user_id).then(response => {
        this.response = response.data;
        console.log(response);
      });
    },
    makeToast(variant = null, tittle, text) {
      this.$bvToast.toast(text, {
        toaster: "b-toaster-bottom-right",
        title: tittle,
        variant: variant,
        solid: true,
        appendToast: true
      });
    },
    changePrice: function(parking, index) {
      parking.bike_cost_minute = this.bike_cost_minute;
      parking.car_cost_minute = this.car_cost_minute;
      parking.motorcycle_cost_minute = this.motorcycle_cost_minute;
      let parking2 = parking;

      auth
        .changePrice(parking2)
        .then(response => {
          this.response = response.data;
          let $vm = this;
          let ap_user_id = sessionStorage.getItem("ap_user_id");
          auth.myParkings(ap_user_id).then(response => {
            $vm.response = response.data;
            console.log(response);
          });
          this.makeToast(
            "success",
            "Cambio completado",
            "Has cambiado las tarifas de tu parqueadero exitosamente."
          );
          this.bike_cost_minute = null;
          this.car_cost_minute = null;
          this.motorcycle_cost_minute = null;
        })
        .catch(error => {
          this.makeToast(
            "danger",
            "Actualización de tarifas fallida",
            error.response.data.message
          );
        });
    }
  },

  beforeCreate() {
    let $vm = this;
    let ap_user_id = sessionStorage.getItem("ap_user_id");
    auth.myParkings(ap_user_id).then(response => {
      $vm.response = response.data;
      console.log(response);
    });
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

<style>
.backgroundImg {
  background-image: url("../assets/Home_BG.png");
}
.card-header {
  font-weight: bold;
  background-color: #504e47 !important;
  color: white;
}
</style>
