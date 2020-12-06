<template>
  <div>
    <div v-if="!authenticated">
      <Loading> </Loading>
    </div>
    <div v-if="authenticated">
      <NavBar> </NavBar>
      <div class="m-0 p-0" style="height: 86vh; overflow-y: scroll">
        <!-- <b-col cols="3" class="m-0 p-0">
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
        </b-col> -->
        <kalendar :configuration="calendar_settings" :events.sync="events">
          <!-- CREATED CARD SLOT -->
          <div
            slot="created-card"
            slot-scope="{ event_information }"
            class="h-100"
            align-v="center"
          >
            <h4><u>Reserva</u></h4>
            <br />
            <h5>
              {{ event_information.start_time | formatToHours }} <br />
              to <br />
              {{ event_information.end_time | formatToHours }}
            </h5>
          </div>
          <!-- CREATING CARD SLOT -->
          <div slot="creating-card" slot-scope="{ event_information }">
            <h4 style="text-align: center;">
              Nueva reserva
            </h4>
            <br />
            <span>
              {{ event_information.start_time | formatToHours }} <br />
              to <br />
              {{ event_information.end_time | formatToHours }}
            </span>
          </div>
          <!-- POPUP CARD SLOT -->
          <div
            slot="popup-form"
            slot-scope="{ popup_information }"
            style="display: flex; flex-direction: column;"
          >
            <h4 style="margin-bottom: 10px">
              Nueva reserva
            </h4>
            <b-row class="m-0" style="inline-size: max-content">
              <b-button class="m-1" variant="info" @click="closePopups()">
                Cancelar
              </b-button>
              <b-button
                class="m-1"
                variant="info"
                @click="addAppointment(popup_information)"
              >
                Guardar
              </b-button>
            </b-row>
          </div>
        </kalendar>
        <!-- <kalendar :configuration="calendar_settings" :events.sync="events" /> -->
      </div>

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

import { Kalendar } from "kalendar-vue";
import { DateTime } from "luxon";
import Vue from "vue";
const _existing_events = [
  {
    from: "2020-12-04T04:00:00.300Z",
    to: "2020-12-04T04:10:00.300Z",
    data: {
      title: "Right now",
      description: "Lorem ipsum"
    }
  },
  {
    from: "2020-12-11T10:22:00-07:00",
    to: "2020-12-31T11:55:00-07:00",
    data: {
      title: "Truth",
      description: "Look."
    }
  },
  {
    from: "2020-12-11T10:22:00-07:00",
    to: "2020-12-31T11:20:00-07:00",
    data: {
      title: "Side",
      description: "Look.2"
    }
  },
  {
    from: "2020-12-11T10:22:00Z",
    to: "2020-12-31T11:20:00Z",
    data: {
      title: "Europe",
      description: "Final Countdown"
    }
  }
];
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
        dateFormat: "Y-d-mTH:i:S"
      },

      options: ["carros", "ciclas", "motos"],

      events: _existing_events,
      calendar_settings: {
        view_type: "week",
        cell_height: 10,
        scrollToNow: true,
        // current_day: new Date().toISOString(),
        start_day: new Date().toISOString(),
        military_time: false,
        read_only: false,
        day_starts_at: 0,
        day_ends_at: 24,
        overlap: false,
        hide_days: [],
        past_event_creation: false
      },
      new_appointment: {}
    };
  },
  components: {
    NavBar,
    Footer,
    flatPickr,
    Loading,
    Kalendar
  },
  created: function() {
    Vue.filter("formatToHours", (value, how) => {
      let dt = DateTime.fromISO(value);
      return dt.toLocaleString(DateTime.TIME_24_SIMPLE);
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
  },

  methods: {
    checkForm: function() {
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

    reserva: function() {
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

          .then(response => {
            if (response && response.status == 200) {
              this.makeToast(
                "success",
                "Reserva completa",
                "Has completado la reserva exitosamente"
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
    addAppointment(popup_info) {
      let payload = {
        data: {
          title: this.new_appointment.title,
          description: this.new_appointment.description
        },
        from: popup_info.start_time,
        to: popup_info.end_time
      };
      this.$kalendar.addNewEvent(payload);
      this.$kalendar.closePopups();
      this.clearFormData();
    },
    closePopups() {
      this.$kalendar.closePopups();
    },
    clearFormData() {
      this.new_appointment = {
        description: null,
        title: null
      };
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

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
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
.created-event {
  align-self: center;
  width: 100% !important;
}
</style>
