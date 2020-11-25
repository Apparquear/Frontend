<template>
  <div>
    <div v-if="!authenticated">
      <Loading> </Loading>
    </div>
    <div v-if="authenticated">
      <NavBar> </NavBar>
      <div style="height: 92vh; width: 100%">
        <l-map
          :zoom="zoom"
          :center="center"
          @update:zoom="zoomUpdated"
          @update:center="centerUpdated"
          @update:bounds="boundsUpdated"
        >
          <l-tile-layer :url="url"></l-tile-layer>
          <l-marker
            v-for="(parking, index) in response"
            v-bind:key="parking + index"
            :latLng="[parking.latitude, parking.longitude]"
          >
            <l-popup>
              <b
                ><FONT SIZE="3">{{ parking.parking.parking_name }}</FONT></b
              >
              <br />
              <b>Hora de apertura: </b>{{ parking.parking.opening_time }}
              <br />
              <b>Hora de cierre: </b>{{ parking.parking.closing_time }}
              <br />
              <b>Tarifa por minuto: </b>{{ parking.parking.car_cost_minute }}
              <br />
              <b>Espacios disponibles: </b
              >{{ parking.parking.total_spaces_available }}
              <br />
              <b>Puntaje parqueadero: </b>{{ parking.parking.score }}
              <br />
              <button v-on:click='$router.push({ path: "/reserva" })' >  RESERVAR </button>
              </l-popup>
            <l-icon>
              <img src="../assets/parking-marker.png" />
            </l-icon>
          </l-marker>
          <l-marker :latLng="[coordinates.lat, coordinates.lng]">
            <l-popup> Tu ubicación </l-popup>
            <l-icon>
              <img src="../assets/marker.png" />
            </l-icon>
          </l-marker>
        </l-map>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "./NavBar.vue";
import Footer from "./Footer.vue";
import Loading from "./Loading.vue";
import auth from "../logic/auth";
import { latLng } from "leaflet";
import {
  LMap,
  LTileLayer,
  LMarker,
  LPopup,
  LTooltip,
  LIcon,
  LControl,
} from "vue2-leaflet";

export default {
  name: "Parkingmap",
  components: {
    LMap,
    LTileLayer,
    LPopup,
    LTooltip,
    LIcon,
    LControl,
    NavBar,
    Footer,
    Loading,
  },
  data() {
    return {
      response: null,
      authenticated: false,
      url:
        "https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=b9be2ea7c0ba49eaa9c1192380d59f24",
      zoom: 15,
      center: null,
      bounds: null,
    };
  },
  methods: {
    
    zoomUpdated(zoom) {
      this.zoom = zoom;
    },
    centerUpdated(center) {
      this.center = center;
    },
    boundsUpdated(bounds) {
      this.bounds = bounds;
      this.nearByParking(bounds);
    },
    nearByParking: function (bounds) {
      auth
        .nearByParking(bounds)
        .then((response) => {
          this.response = response.data;
        })
        .catch((error) => {
          console.log(error);
          this.makeToast("danger", error);
        });
    },
    makeToast(variant = null, tittle, text) {
      this.$bvToast.toast(text, {
        toaster: "b-toaster-bottom-right",
        title: tittle,
        variant: variant,
        solid: true,
        appendToast: true,
      });
    },
  },
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
  beforeCreate() {
    let $vm = this;
    // Tomar las coordenadas de los usuarios desde el request del browser
    this.$getLocation({})
      .then((coordinates) => {
        $vm.center = coordinates;
        $vm.coordinates = coordinates;
        let bounds = {
          _southWest: latLng(coordinates.lat - 0.02, coordinates.lng - 0.02),
          _northEast: latLng(coordinates.lat + 0.02, coordinates.lng + 0.02),
        };
        this.nearByParking(bounds);
      })
      .catch((error) => alert(error));
  },
};
</script>
