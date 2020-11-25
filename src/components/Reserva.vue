<template>
  <div>
    <div v-if="!authenticated">
      <Loading> </Loading>
    </div>
    <div v-if="authenticated">
      <NavBar> </NavBar>
      <b-container class="disp">
        <h1 class="title"><b>Reservar bahia</b></h1>
        <b-form class="form" @submit="checkForm" id="form">
          <label class="title2">Fecha de Entrada</label>
          <flat-pickr
            v-model="reservation_time"
            :config="config"
            class="form-control"
            name="reservation_time"
          >
          </flat-pickr>

          <label class="title2">Fecha de Salida</label>

          <flat-pickr
            v-model="final_time"
            :config="config"
            class="form-control"
            name="final_time"
          >
          </flat-pickr>

          <label class="title2">Tipo de vehiculo</label>
          <select
            v-model="vehicle_type"
            label="Seleccione el rol"
            class="browser-default custom-select"
          >
            <option value="carros">Carros</option>
            <option value="motos">Motos</option>
            <option value="cicla">Cicla</option>
          </select>
          <br />
          <b-button size="lg" block class="button-primary" type="submit"
            >Reservar</b-button
          >
        </b-form>
      </b-container>
      <Footer> </Footer>
    </div>
  </div>
</template>

<script>
import NavBar from "./NavBar.vue";
import Footer from "./Footer.vue";
import Loading from "./Loading.vue";
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import auth from "../logic/auth";
export default {
  name: "Reserva",
  data() {
    return {
      authenticated: false,
      reservation_time: "",
      final_time: "",
      vehicle_type: "",
      config: {
        altFormat: "F j, Y",
        altInput: true,
        enableTime: true,
        dateFormat: "Y-d-mTH:i:S",
      },

      options: ["carros", "ciclas", "motos"],
    };
  },
  components: {
    NavBar,
    Footer,
    flatPickr,
    Loading,
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

  methods: {
    checkForm: function () {
      if (!this.reservation_time) {
        return this.makeToast(
          "danger",
          "Fecha inválida",
          "Por favor digita la fecha "
        );
      }
      if (!this.final_time) {
        return this.makeToast(
          "danger",
          "Fecha inválida",
          "Por favor digita la fecha "
        );
      }
      if (!this.vehicle_type) {
        return this.makeToast(
          "danger",
          "Tipo de vehiculo inválido",
          "Por favor vehiculo válido"
        );
      }

      return this.reserva();
    },

    reserva: function () {
      let ap_user_id, ap_token, ap_parking_id;

      if (
        sessionStorage.getItem("ap_user_id") &&
        sessionStorage.getItem("ap_token") &&
        sessionStorage.getItem("ap_parking_id")
      ) {
        ap_user_id = sessionStorage.getItem("ap_user_id");
        ap_token = sessionStorage.getItem("ap_token");
        ap_parking_id = sessionStorage.getItem("ap_parking_id");

        console.log(this.reservation_time);
        console.log(this.final_time);
        console.log(this.vehicle_type);
        auth

          .reserva(
            this.reservation_time,
            this.final_time,
            this.vehicle_type,
            ap_user_id,
            ap_token,
            ap_parking_id
          )

          .then((response) => {
            if (response && response.status == 200) {
              this.makeToast(
                "success",
                "Reserva completa",
                "Has completado la reserva exitosamente"
              );
              setTimeout(
                function () {
                  this.$router.push({ path: "/home" });
                }.bind(this),
                1000
              );
            }
          })
          .catch((error) => {
            this.makeToast(
              "danger",
              "Reserva fallida",
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
      sessionStorage.removeItem("ap_parking_id");
      auth
        .invalidate_token(this.token)
        .then((response) => {
          if (response && response.status == 200) {
            console.log("token invalidado");
          }
        })
        .catch((error) => {
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
        appendToast: true,
      });
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style >
.button-primary {
  background-color: #4a051c;
  border-color: #4a051c;
  color: #f6f7eb;
}
.light-text {
  color: #f6f7eb !important;
}
.disp {
  padding: 2rem;
}
.title {
  text-align: center;
  font-size: 2.5em;
  color: #4a051c;
}
.title2 {
  text-align: center;
  color: #f6f7eb;
}
.form {
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
  background: #004e64;
  border-radius: 10px;
  max-width: 540px;
  padding: 40px;
  box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.3);
}
</style>