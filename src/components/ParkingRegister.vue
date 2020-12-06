<template>
  <div class="backgroundImg">
    <div v-if="!authenticated">
      <Loading> </Loading>
    </div>
    <div v-if="authenticated">
      <NavBar> </NavBar>
      <b-container class="parkingRegister p-0">
        <h1 class="title mt-4"><b>Registrar Parqueadero</b></h1>

        <b-form class="form" @submit="checkForm" id="form">
          <!-- Nombre -->
          <b-form-group
            class="bold-text"
            label-class="font-weight-bold"
            label="Nombre"
            label-for="parking_name"
          >
            <b-input
              type="text"
              maxlength="100"
              id="parking_name"
              placeholder="Ingresa el nombre del parqueadero"
              v-model="parking_name"
            ></b-input
          ></b-form-group>

          <!-- Ubicacion -->
          <b-form-group
            class="light-text"
            label="Ubicacion"
            label-class="font-weight-bold"
            label-for="markerLocation"
          >
            <div style="height: 400px; width: 100%">
              <div style="height: 100px overflow: auto;">
                <p>
                  Arrastra el mapa hasta que tu parqueadero sea visible y
                  coincida con el marcador ubicado en el centro
                </p>
              </div>
              <l-map
                :zoom="zoom"
                :center="markerLocation"
                style="height: 80%"
                @update:center="centerUpdate"
                @update:zoom="zoomUpdate"
                class="map"
              >
                <l-tile-layer :url="url" :attribution="attribution" />
                <l-marker :latLng="markerLocation">
                  <l-popup>
                    Ubicación de tu parqueadero
                  </l-popup>
                  <l-icon>
                    <img src="../assets/parking-marker.png" />
                  </l-icon>
                </l-marker>
              </l-map>
            </div>
          </b-form-group>

          <!-- Horario -->
          <b-form-group
            class="light-text"
            label="Horario"
            label-class="font-weight-bold"
            label-for="schedule_open"
          >
            <b-input
              type="time"
              id="schedule_open"
              step="1"
              v-model="schedule_open"
            ></b-input
          ></b-form-group>

          <b-form-group
            class="light-text"
            label-class="font-weight-bold"
            label-for="schedule_close"
          >
            <b-input
              type="time"
              id="schedule_close"
              step="1"
              v-model="schedule_close"
            ></b-input
          ></b-form-group>

          <!-- Número de bahías según tipo de vehiculo -->
          <b-form-group
            class="light-text"
            label-class="font-weight-bold"
            label="Número de bahías según tipo de vehiculo"
            label-for="slot_v"
          >
            <b-input
              type="number"
              id="slot_v"
              placeholder="Automóvil"
              v-model="slot_v"
            ></b-input
          ></b-form-group>

          <b-form-group
            class="light-text"
            label-class="font-weight-bold"
            label-for="slot_m"
          >
            <b-input
              type="number"
              id="slot_m"
              placeholder="Motocicleta"
              v-model="slot_m"
            ></b-input
          ></b-form-group>

          <b-form-group
            class="light-text"
            label-class="font-weight-bold"
            label-for="slot_b"
          >
            <b-input
              type="number"
              id="slot_b"
              placeholder="Bicicleta"
              v-model="slot_b"
            ></b-input
          ></b-form-group>

          <!-- Costo por minuto según tipo de vehículo -->
          <b-form-group
            class="light-text"
            label-class="font-weight-bold"
            label="Costo por minuto según tipo de vehículo"
            label-for="cost_v"
          >
            <b-input
              type="number"
              id="cost_v"
              placeholder="Automóvil"
              v-model="cost_v"
            ></b-input
          ></b-form-group>

          <b-form-group
            class="light-text"
            label-class="font-weight-bold"
            label-for="cost_m"
          >
            <b-input
              type="number"
              id="cost_m"
              placeholder="Motocicleta"
              v-model="cost_m"
            ></b-input
          ></b-form-group>

          <b-form-group
            class="light-text"
            label-class="font-weight-bold"
            label-for="cost_b"
          >
            <b-input
              type="number"
              id="cost_b"
              placeholder="Bicicleta"
              v-model="cost_b"
            ></b-input
          ></b-form-group>

          <b-button block class="button-primary mt-4" syze="sm" type="submit"
            >Registrar</b-button
          >
        </b-form>

        <Footer> </Footer>
      </b-container>
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
  name: "Registrar parqueadero",
  components: {
    NavBar,
    Footer,
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LTooltip,
    LIcon,
    LControl,
    Loading
  },
  props: {
    msg: String
  },

  data() {
    return {
      authenticated: false,
      parking_name: "",
      schedule_open: "",
      schedule_close: "",
      cost_v: "",
      cost_m: "",
      cost_b: "",
      slot_v: "",
      slot_m: "",
      slot_b: "",
      url:
        "https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=b9be2ea7c0ba49eaa9c1192380d59f24",
      zoom: 15,
      markerLocation: [4.635062, -74.080676]
    };
  },
  beforeCreate() {
    let $vm = this;
    // Tomar las coordenadas de los usuarios desde el request del browser
    this.$getLocation({})
      .then(coordinates => {
        $vm.markerLocation = coordinates;
      })
      .catch(error => alert(error));
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
  methods: {
    zoomUpdate(zoom) {
      this.zoom = zoom;
    },
    centerUpdate(markerLocation) {
      this.markerLocation = markerLocation;
    },
    showLongText() {
      this.showParagraph = !this.showParagraph;
    },
    checkForm: function() {
      let regexName = /^[0-9a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[0-9a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[0-9a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g;
      // Validaciones
      if (!this.parking_name) {
        return this.makeToast(
          "danger",
          "Nombre inválido",
          "Por favor digita el nombre de tu parqueadero"
        );
      }
      if (this.zoom < 17) {
        return this.makeToast(
          "danger",
          "Ubicacion inválida",
          "Por favor haz zoom y ubica el marcador en el centro del mapa en una ubicación más exacta"
        );
      }
      if (!this.schedule_open) {
        return this.makeToast(
          "danger",
          "Horario de entrada inválido",
          "Por favor ingresa un horario válido"
        );
      }
      if (!this.schedule_close) {
        return this.makeToast(
          "danger",
          "Horario de cierre inválido",
          "Por favor ingresa un horario valido"
        );
      }
      if (!this.cost_v) {
        return this.makeToast(
          "danger",
          "Costo invalido",
          "Por favor ingresa un costo valido"
        );
      }
      if (!this.cost_m) {
        return this.makeToast(
          "danger",
          "Costo invalido",
          "Por favor ingresa un costo valido"
        );
      }
      if (!this.cost_b) {
        return this.makeToast(
          "danger",
          "Costo invalido",
          "Por favor ingresa un costo valido"
        );
      }
      if (!this.slot_v) {
        return this.makeToast(
          "danger",
          "Numero de cupos invalido",
          "Por favor ingresa un numero de cupos valido"
        );
      }
      if (!this.slot_m) {
        return this.makeToast(
          "danger",
          "Numero de cupos invalido",
          "Por favor ingresa un numero de cupos valido"
        );
      }
      if (!this.slot_b) {
        return this.makeToast(
          "danger",
          "Numero de cupos invalido",
          "Por favor ingresa un numero de cupos valido"
        );
      }

      if (this.parking_name.length < 8) {
        return this.makeToast(
          "warning",
          "Nombre inválido",
          "El nombre de tu parqueadero debe contener entre 8 y 100 caracteres"
        );
      }
      if (!regexName.test(this.parking_name)) {
        return this.makeToast(
          "warning",
          "Nombre inválido",
          "El nombre de tu parqueadero solo puede contener letras y espacios"
        );
      }
      if (this.schedule_open < 0 || this.schedule_open > 24) {
        return this.makeToast(
          "warning",
          "Hora inválida",
          "Debe ingresar una hora valida"
        );
      }
      if (this.schedule_close < 0 || this.schedule_close > 24) {
        return this.makeToast(
          "warning",
          "Hora inválida",
          "Debe ingresar una hora valida"
        );
      }
      if (this.cost_v < 0) {
        return this.makeToast(
          "warning",
          "Valor inválido",
          "Debe ingresar un valor valido"
        );
      }
      if (this.cost_m < 0) {
        return this.makeToast(
          "warning",
          "Valor inválido",
          "Debe ingresar un valor valido"
        );
      }
      if (this.cost_b < 0) {
        return this.makeToast(
          "warning",
          "Valor inválido",
          "Debe ingresar un valor valido"
        );
      }
      if (this.slot_v < 0) {
        return this.makeToast(
          "warning",
          "Numero de cupos inválido",
          "Debe ingresar un numero de cupos valido"
        );
      }
      if (this.slot_m < 0) {
        return this.makeToast(
          "warning",
          "Numero de cupos inválido",
          "Debe ingresar un numero de cupos valido"
        );
      }
      if (this.slot_b < 0) {
        return this.makeToast(
          "warning",
          "Numero de cupos inválido",
          "Debe ingresar un numero de cupos valido"
        );
      }
      return this.register();
    },

    register: function() {
      let ap_user_id, ap_token;
      this.markerLocation = this.markerLocation
        .toString()
        .replace("LatLng(", "")
        .replace(")", "")
        .split(",");
      if (
        sessionStorage.getItem("ap_user_id") &&
        sessionStorage.getItem("ap_token")
      ) {
        ap_user_id = sessionStorage.getItem("ap_user_id");
        ap_token = sessionStorage.getItem("ap_token");

        auth
          .parking_register(
            this.parking_name,
            this.markerLocation[0],
            this.markerLocation[1],
            this.schedule_open,
            this.schedule_close,
            this.slot_v,
            this.slot_m,
            this.slot_b,
            this.cost_v,
            this.cost_m,
            this.cost_b,
            ap_user_id,
            ap_token
          )
          .then(response => {
            if (response && response.status == 200) {
              this.makeToast(
                "success",
                "Registro completado",
                "Has completado el registro de tu parqueadero exitosamente"
              );
              setTimeout(
                function() {
                  this.$router.push({ path: "/home" });
                }.bind(this),
                1000
              );
            }
          })
          .catch(error => {
            this.makeToast(
              "danger",
              "Registro fallido",
              error.response.data.message
            );
          });
      } else {
        this.toLogin();
      }
    },
    invalidateToken() {
      sessionStorage.removeItem("ap_user_id");
      sessionStorage.removeItem("ap_token");
      auth
        .invalidate_token(this.token)
        .then(response => {
          if (response && response.status == 200) {
            console.log("token invalidado");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    toLogin() {
      if (sessionStorage.getItem("ap_token")) {
        this.invalidateToken();
      }
      this.$router.push("login");
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
  }
};
</script>

<style scoped>
.parkingRegister {
  padding: 2rem;
}
.button-primary {
  background-color: #141414;
  color: #f6f7eb;
}
.title {
  text-align: center;
  font-size: 2.5em;
  color: #141414;
}
.form {
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
  background: #f6f7eb;
  border-radius: 10px;
  max-width: 540px;
  padding: 40px;
  box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.3);
  text-align: justify;
}
.light-text {
  color: #141414 !important;
}
.backgroundImg {
  background-image: url("../assets/Home_BG.png");
  height: 150vh;
}
.map {
  border-color: #141414;
}
</style>
