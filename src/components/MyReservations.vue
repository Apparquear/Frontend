<template>
  <div>
    <div v-if="!authenticated">
      <Loading> </Loading>
    </div>
    <div v-if="authenticated" class="backgroundImg">
      <NavBar> </NavBar>
      <h2 class="mt-4">
        <strong>Mis reservas</strong>
      </h2>
      <div class="m-0 p-0" style="height: 84vh; overflow-y: scroll">
        <kalendar :configuration="calendar_settings" :events.sync="events">
          <!-- CREATED CARD SLOT -->
          <div
            slot="created-card"
            slot-scope="{ event_information }"
            class="h-100"
            align-v="center"
          >
            <h4 class="appointment-title">
              <strong>{{ event_information.data.title }}</strong>
            </h4>
            <h5>
              {{ event_information.start_time | formatToHours }} to
              {{ event_information.end_time | formatToHours }}
            </h5>
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

let _events = new Array();

let today = new Date();
function getCurrentDay() {
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);
  today.setDate(today.getUTCDate());
  return today.toISOString();
}
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
      events: _events,
      calendar_settings: {
        view_type: "week",
        cell_height: 10,
        scrollToNow: true,
        start_day: getCurrentDay(),
        military_time: false,
        read_only: true,
        day_starts_at: 0,
        day_ends_at: 24,
        parking_opening_time: DateTime.fromISO(
          sessionStorage.getItem("ap_parking_opening")
        ).TIME_SIMPLE,
        parking_closing_time: DateTime.fromISO(
          sessionStorage.getItem("ap_parking_closing")
        ).TIME_SIMPLE,
        overlap: false,
        hide_days: [],
        past_event_creation: false
      },
      new_appointment: {},
      parking_name: sessionStorage.getItem("ap_parking_name")
    };
  },
  components: {
    NavBar,
    Footer,
    flatPickr,
    Loading,
    Kalendar
  },
  beforeCreate: function() {
    _events = new Array();
    auth
      .reservationsByUser(sessionStorage.getItem("ap_user_id"))
      .then(response => {
        if (response && response.status == 200) {
          for (let eventResponse in response.data) {
            let event = {
              data: {
                title: response.data[eventResponse].parking.parking_name
              },
              from: response.data[eventResponse].reservation_time.replace(
                "+00:00",
                "-05:00"
              ),
              to: response.data[eventResponse].final_time.replace(
                "+00:00",
                "-05:00"
              )
            };
            _events.push(event);
          }
          console.log(_events);
        }
      })
      .catch(error => {
        console.log(error);
      });
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
    reserva: function() {
      let ap_user_id, ap_token, ap_parking_id, ap_vehicle_type;

      if (
        sessionStorage.getItem("ap_user_id") &&
        sessionStorage.getItem("ap_token") &&
        sessionStorage.getItem("ap_parking_id") &&
        sessionStorage.getItem("ap_vehicle_type")
      ) {
        ap_user_id = sessionStorage.getItem("ap_user_id");
        ap_token = sessionStorage.getItem("ap_token");
        ap_parking_id = sessionStorage.getItem("ap_parking_id");
        ap_vehicle_type = sessionStorage.getItem("ap_vehicle_type");

        console.log(this.reservation_time);
        console.log(this.final_time);
        auth
          .reserva(
            this.reservation_time,
            this.final_time,
            ap_vehicle_type,
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
              _events = new Array();
              auth
                .reservationsByUser(sessionStorage.getItem("ap_user_id"))
                .then(response => {
                  if (response && response.status == 200) {
                    for (let eventResponse in response.data) {
                      let event = {
                        from: response.data[
                          eventResponse
                        ].reservation_time.replace("+00:00", "-05:00"),
                        to: response.data[eventResponse].final_time.replace(
                          "+00:00",
                          "-05:00"
                        )
                      };
                      _events.push(event);
                    }
                    console.log(_events);
                  }
                })
                .catch(error => {
                  console.log(error);
                });
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
    closePopups() {
      this.$kalendar.closePopups();
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
.card-button {
  background-color: #504e47;
  border-color: #504e47;
  color: white;
}
.backgroundImg {
  background-image: url("../assets/Home_BG.png");
}
.kalendar-wrapper.gstyle .created-event,
.kalendar-wrapper.gstyle .creating-event {
  background-color: #ffc107 !important;
  color: #504e47 !important;
  border-color: #504e47;
  border-style: dotted;
  border-width: 2px;
  font: 14px/1.5 "Poppins", sans-serif;
}
.popup-wrapper {
  font: 14px/1.5 "Poppins", sans-serif;
}
</style>
