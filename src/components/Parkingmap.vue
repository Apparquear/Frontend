<template>
  <div>
    <div v-if="!authenticated">
      <Loading> </Loading>
    </div>
    <div v-if="authenticated">
      <NavBar> </NavBar>
      <b-row style="width: 100vw" class="m-0">
        <b-col cols="3" class="p-0 backgroundImg">
          <b-col cols="12" class="p-0 m-1" style="height: auto">
            <b-form
              inline
              class="m-1"
              style="align-items: center; justify-content: center;"
            >
              <h4 class="m-0 w-100">
                <b-badge class="w-75 background-filter light-text"
                  >Filtrar:
                  <b-button-group>
                    <b-button
                      :ref="'test'"
                      variant="warning"
                      :pressed="bici_check"
                      v-on:click="setVehicle(1)"
                      >Bici</b-button
                    >
                    <b-button
                      variant="warning"
                      :pressed="moto_check"
                      v-on:click="setVehicle(2)"
                      >Moto</b-button
                    >
                    <b-button
                      variant="warning"
                      :pressed="carro_check"
                      v-on:click="setVehicle(3)"
                      >Carro</b-button
                    >
                  </b-button-group></b-badge
                >
              </h4>
            </b-form>
            <b-form
              inline
              class="m-1"
              style="align-items: center; justify-content: center;"
            >
              <h4 class="m-0 w-100">
                <b-badge class="w-75 background-filter"
                  >Ordenar por:
                  <b-form-select
                    id="inline-form-custom-select-pref"
                    class="mb-2 mr-sm-2 mb-sm-0"
                    v-model="sort_option_selected"
                    :options="sort_options"
                    :value="null"
                  ></b-form-select
                ></b-badge>
              </h4>
            </b-form>
          </b-col>
          <b-col cols="12" class="p-0" style="height: 86%; overflow-y: scroll">
            <b-card
              v-for="(parking, index) in filtered"
              v-bind:key="parking + index"
              border-variant="warning"
              :header="parking.parking.parking_name"
              header-bg-variant="transparent"
              align="center"
              class="m-2"
            >
              <b-card-text
                ><b
                  ><b-icon-clock
                    style="width: 15px; height: 15px"
                  ></b-icon-clock>
                  :
                </b>
                {{ parking.parking.opening_time }}&emsp;
                <b
                  ><b-icon-clock-fill
                    style="width: 15px; height: 15px"
                  ></b-icon-clock-fill>
                  : </b
                >{{ parking.parking.closing_time }}
                <br />
                <span v-if="vehycle_type == 1"
                  ><b
                    ><b-icon-cash
                      style="width: 15px; height: 15px"
                    ></b-icon-cash>
                    Costo bici por minuto: $</b
                  >{{ parking.parking.bike_cost_minute }}</span
                >
                <span v-if="vehycle_type == 2"
                  ><b
                    ><b-icon-cash
                      style="width: 15px; height: 15px"
                    ></b-icon-cash>
                    Costo moto por minuto: $</b
                  >{{ parking.parking.motorcycle_cost_minute }}</span
                >
                <span v-if="vehycle_type == 3"
                  ><b
                    ><b-icon-cash
                      style="width: 15px; height: 15px"
                    ></b-icon-cash>
                    Costo carro por minuto: $</b
                  >{{ parking.parking.car_cost_minute }}</span
                >
                <br />
                <b
                  ><b-icon-star-half
                    style="width: 15px; height: 15px"
                  ></b-icon-star-half>
                  Calificacion: </b
                >{{ parking.parking.score }}
                <br />
                <span v-if="vehycle_type == 1"
                  ><b>Espacios disponibles a esta hora: </b
                  >{{ parking.parking.bike_spaces_available }}</span
                >
                <span v-if="vehycle_type == 2"
                  ><b>Espacios disponibles a esta hora: </b
                  >{{ parking.parking.motorcycle_spaces_available }}</span
                >
                <span v-if="vehycle_type == 3"
                  ><b>Espacios disponibles a esta hora: </b
                  >{{ parking.parking.car_spaces_available }}</span
                >
                <span v-if="vehycle_type == 0"
                  ><b>Espacios disponibles a esta hora: </b
                  >{{ parking.parking.total_spaces_available }}</span
                ></b-card-text
              >
            </b-card>
          </b-col>
        </b-col>
        <b-col cols="9" class="p-0">
          <div style="height: 93vh; width: 100%">
            <l-map
              :zoom="zoom"
              :center="center"
              @update:zoom="zoomUpdated"
              @update:center="centerUpdated"
              @update:bounds="boundsUpdated"
            >
              <l-tile-layer :url="url"></l-tile-layer>
              <l-marker
                v-for="(parking, index) in filtered"
                v-bind:key="parking + index"
                :latLng="[parking.latitude, parking.longitude]"
                style="max-width: 20rem"
              >
                <l-popup>
                  <b-card
                    :title="parking.parking.parking_name"
                    style="border: none !important; pading: 0"
                  >
                    <b
                      ><b-icon-clock
                        style="width: 15px; height: 15px"
                      ></b-icon-clock>
                      :
                    </b>
                    {{ parking.parking.opening_time }}&emsp;
                    <b
                      ><b-icon-clock-fill
                        style="width: 15px; height: 15px"
                      ></b-icon-clock-fill>
                      : </b
                    >{{ parking.parking.closing_time }}
                    <br />
                    <b-icon-star-half
                      style="width: 15px; height: 15px"
                    ></b-icon-star-half>
                    Calificacion: {{ parking.parking.score }}
                    <br />
                    <span v-if="vehycle_type == 1"
                      >Espacios disponibles a esta hora:
                      {{ parking.parking.bike_spaces_available }}</span
                    >
                    <span v-if="vehycle_type == 2"
                      >Espacios disponibles a esta hora:
                      {{ parking.parking.motorcycle_spaces_available }}</span
                    >
                    <span v-if="vehycle_type == 3"
                      >Espacios disponibles a esta hora:
                      {{ parking.parking.car_spaces_available }}</span
                    >
                    <span v-if="vehycle_type == 0"
                      >Espacios disponibles a esta hora:
                      {{ parking.parking.total_spaces_available }}</span
                    >
                    <br /><span v-if="vehycle_type == 1"
                      ><b-icon-cash
                        style="width: 15px; height: 15px"
                      ></b-icon-cash>
                      Costo bici por minuto: ${{
                        parking.parking.bike_cost_minute
                      }}</span
                    >
                    <span v-if="vehycle_type == 2"
                      ><b-icon-cash
                        style="width: 15px; height: 15px"
                      ></b-icon-cash>
                      Costo moto por minuto: ${{
                        parking.parking.motorcycle_cost_minute
                      }}</span
                    >
                    <span v-if="vehycle_type == 3"
                      ><b-icon-cash
                        style="width: 15px; height: 15px"
                      ></b-icon-cash>
                      Costo carro por minuto: ${{
                        parking.parking.car_cost_minute
                      }}</span
                    >
                    <br>
                    <br>
                    <b-row class="m-0 p-0 buttons">
                      <b-button
                        syze="sm"
                        type="button"
                        target="_blank"
                        class="parking-routing-button m-1 rounded-pill"
                        v-on:click="reservation(parking.parking.parkingID)"
                      >
                        Reservar
                      </b-button>
                      <b-button
                        syze="sm"
                        type="button"
                        target="_blank"
                        class="parking-routing-button m-1 rounded-pill"
                        :href="
                          'https://www.google.com/maps?f=d&saddr=' +
                            coordinates.lat +
                            ',' +
                            coordinates.lng +
                            '&daddr=' +
                            parking.latitude +
                            ',' +
                            parking.longitude +
                            '&dirflg=d&travelmode=driving'
                        "
                        >Ruta
                      </b-button>
                    </b-row>
                  </b-card>
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
        </b-col>
      </b-row>
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
  LControl
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
    Loading
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
      type_vehicle_buttons: [
        { caption: "Bicicleta", state: true },
        { caption: "Moto", state: false },
        { caption: "Carro", state: true }
      ],
      bici_check: false,
      moto_check: false,
      carro_check: false,
      vehycle_type: 0,
      sort_options: [
        { text: "Sin ordenar", value: null },
        "Precio $ - $$",
        "Precio $$ - $"
      ],
      sort_option_selected: null,
      own_location: "../assets/marker.png"
    };
  },
  methods: {
    reservation(ap_parking_id) {
      sessionStorage.setItem("ap_parking_id", ap_parking_id);
      this.$router.push({ path: "/reserva" });
    },
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
    setVehicle(type) {
      this.vehycle_type = type;
      switch (this.vehycle_type) {
        case 1:
          this.bici_check = true;
          this.moto_check = false;
          this.carro_check = false;
          break;
        case 2:
          this.bici_check = false;
          this.moto_check = true;
          this.carro_check = false;
          break;
        case 3:
          this.bici_check = false;
          this.moto_check = false;
          this.carro_check = true;
          break;
        default:
          this.bici_check = false;
          this.moto_check = false;
          this.carro_check = false;
      }
    },
    nearByParking: function(bounds) {
      auth
        .nearByParking(bounds)
        .then(response => {
          this.response = response.data;
          console.log(response);
        })
        .catch(error => {
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
  },
  beforeCreate() {
    let $vm = this;
    // Tomar las coordenadas de los usuarios desde el request del browser
    this.$getLocation({})
      .then(coordinates => {
        $vm.center = coordinates;
        $vm.coordinates = coordinates;
        let bounds = {
          _southWest: latLng(coordinates.lat - 0.02, coordinates.lng - 0.02),
          _northEast: latLng(coordinates.lat + 0.02, coordinates.lng + 0.02)
        };
        this.nearByParking(bounds);
      })
      .catch(error => alert(error));
  },
  beforeUpdate() {
    let $vm = this;
    switch ($vm.vehycle_type) {
      case 1: //bici
        $vm.filtered = $vm.response.filter(
          parking => parking.parking.bike_spaces > 0
        );
        switch ($vm.sort_option_selected) {
          case "Precio $ - $$":
            $vm.filtered = $vm.filtered.sort(function(a, b) {
              return a.parking.bike_cost_minute - b.parking.bike_cost_minute;
            });
            break;
          case "Precio $$ - $":
            $vm.filtered = $vm.filtered.sort(function(a, b) {
              return b.parking.bike_cost_minute - a.parking.bike_cost_minute;
            });
            break;
        }
        break;
      case 2: //moto
        $vm.filtered = $vm.response.filter(
          parking => parking.parking.motorcycle_spaces > 0
        );
        switch ($vm.sort_option_selected) {
          case "Precio $ - $$":
            $vm.filtered = $vm.filtered.sort(function(a, b) {
              return (
                a.parking.motorcycle_cost_minute -
                b.parking.motorcycle_cost_minute
              );
            });
            break;
          case "Precio $$ - $":
            $vm.filtered = $vm.filtered.sort(function(a, b) {
              return (
                b.parking.motorcycle_cost_minute -
                a.parking.motorcycle_cost_minute
              );
            });
            break;
        }
        break;
      case 3: //carro
        $vm.filtered = $vm.response.filter(
          parking => parking.parking.car_spaces > 0
        );
        switch ($vm.sort_option_selected) {
          case "Precio $ - $$":
            $vm.filtered = $vm.filtered.sort(function(a, b) {
              return a.parking.car_cost_minute - b.parking.car_cost_minute;
            });
            break;
          case "Precio $$ - $":
            $vm.filtered = $vm.filtered.sort(function(a, b) {
              return b.parking.car_cost_minute - a.parking.car_cost_minute;
            });
            break;
        }
        break;
      default:
        $vm.filtered = $vm.response;
    }
  }
};
</script>

<style scoped>
.parking-routing-button {
  background-color: #ffc107;
  border-color: #ffc107;
  color: black;
}
.b-card {
  background-color: #f6f7eb;
}
.backgroundImg {
  background-image: url("../assets/Home_BG.png");
  height: 93vh;
}
.card-header {
  font-weight: bold;
  background-color: #504e47 !important;
  color: white;
}
.background-filter {
  background-color: #504e47 !important;
}
.badge {
  font-weight: lighter;
  padding: 1vh;
}
.leaflet-container {
  font: 14px/1.5 "Poppins", sans-serif;
}
.card-body {
  text-align: center;
}
.card-title{
  font-weight: bold;
}
.buttons {
  justify-content: center;
}
</style>
