<template>
  <div>
    <div v-if="!authenticated">
      <Loading> </Loading>
    </div>
    <div v-if="authenticated">
      <NavBar> </NavBar>
      <b-col cols="12" class="p-0" style="height: 86%; overflow-y: scroll">
        <b-card
          v-for="(parking, index) in response"
          v-bind:key="parking + index"
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
            <span
              ><b
                ><b-icon-cash style="width: 15px; height: 15px"></b-icon-cash>
                Costo bici por minuto: $</b
              >{{ parking.bike_cost_minute }}
              <input
                v-model="bike_cost_minute"
                placeholder="nueva tarifa por minuto" /><br
            /></span>
            <br />
            <span
              ><b
                ><b-icon-cash style="width: 15px; height: 15px"></b-icon-cash>
                Costo moto por minuto: $</b
              >{{ parking.motorcycle_cost_minute
              }}<input
                v-model="motorcycle_cost_minute"
                placeholder="nueva tarifa por minuto" /><br
            /></span>
            <br />
            <span
              ><b
                ><b-icon-cash style="width: 15px; height: 15px"></b-icon-cash>
                Costo carro por minuto: $</b
              >{{ parking.car_cost_minute
              }}<input
                v-model="car_cost_minute"
                placeholder="nueva tarifa por minuto"
              /><br />
            </span>
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
            :pressed="change_price_check"
            v-on:click="changePrice(parking,index)"
            >Cambiar tarifas</b-button
          >
        </b-card>
      </b-col>
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
    Loading,
  },
  data() {
    return {
      response: null,
      authenticated: false,
    };
  },
  methods: {
    myParkings() {
      ap_user_id = sessionStorage.getItem("ap_user_id");
      auth.myParkings(ap_user_id).then((response) => {
        this.response = response.data;
        console.log(response);
      });
    },

    changePrice: function(parking,index) {
      parking.bike_cost_minute=this.bike_cost_minute;
      parking.car_cost_minute=this.car_cost_minute;
      parking.motorcycle_cost_minute=this.motorcycle_cost_minute;
      console.log(index);
      let parking2 = parking;
     //console.log(this.bike_cost_minute[index]);
    auth.changePrice(parking2).then((response) => {
      this.response = response.data;
     console.log(response);
    let $vm = this;
    let ap_user_id = sessionStorage.getItem("ap_user_id");
    auth.myParkings(ap_user_id).then((response) => {
      $vm.response = response.data;
      console.log(response);
    });

    });
  },
  },
  
  beforeCreate() {
    let $vm = this;
    let ap_user_id = sessionStorage.getItem("ap_user_id");
    auth.myParkings(ap_user_id).then((response) => {
      $vm.response = response.data;
      console.log(response);
    });
  },
//   updated() {
//     let $vm = this;
//     let ap_user_id = sessionStorage.getItem("ap_user_id");
//     auth.myParkings(ap_user_id).then((response) => {
//       $vm.response = response.data;
//       console.log(response);
//     });
//   },

  mounted: function () {
    let $vm = this;

    function invalidateToken() {
      sessionStorage.removeItem("ap_user_id");
      sessionStorage.removeItem("ap_token");
      auth
        .invalidate_token(token)
        .then((response) => {
          if (response && response.status == 200) {
            console.log("token invalidado");
          }
        })
        .catch((error) => {
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
    setTimeout(function () {
      authenticate();
    }, 1000);
  },
};
</script>