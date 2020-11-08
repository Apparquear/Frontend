<template>
<div>  
  <div v-if="!authenticated">
    <Loading> </Loading>
  </div>
  <div v-if="authenticated">
    <NavBar> </NavBar>    
    <div style="height: 400px; width: 100%;">        
      <div class="info" style="height: 15%">
        <span>Center: {{ center }}</span>
        <span>Zoom: {{ zoom }}</span>
        <span>Bounds: {{ bounds }}</span>
      </div>
      <l-map      
        :zoom="zoom"
        :center=[coordinates.lat,coordinates.lng]
        @update:zoom="zoomUpdated"
        @update:center="centerUpdated"
        @update:bounds="boundsUpdated"
      >
        <l-tile-layer :url="url"></l-tile-layer>
        <l-marker v-for="parking in response" v-bind:key="parking" :latLng="[parking[0],parking[1]]">
            <l-popup>
              <b>{{parking}}</b>
              {{parking}}
            </l-popup>
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
  LControl
} from "vue2-leaflet";

export default {
  name: 'Parkingmap',
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
  data () {
    return {
      response: null,
      authenticated: false,
      url: 'https://tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=b9be2ea7c0ba49eaa9c1192380d59f24',
      zoom: 15,
      center: [4.635062, -74.080676],
      bounds: null,
      markerLocation: [4.635062, -74.080676]
    };
  },
  methods: {
    zoomUpdated (zoom) {
      this.zoom = zoom;
    },
    centerUpdated (center) {
      this.center = center;
    },
    boundsUpdated (bounds) {
      this.bounds = bounds;
      this.nearByParking(bounds);
      console.log(bounds);
    },
    nearByParking: function(bounds) {      
      let southWest, northEast;
      southWest = bounds._southWest
        .toString()
        .replace("LatLng(", "")
        .replace(")", "")
        .split(",");
      northEast = bounds._northEast
        .toString()
        .replace("LatLng(", "")
        .replace(")", "")
        .split(",");
        
      let bounds2 = [southWest, northEast];
        console.log(bounds2);      
      // let response = [[4.638878, -74.068304],[4.638876, -74.068309],[4.638873, -74.068308],[4.638871, -74.068307],[4.638876, -74.068308]]
        auth
          .nearByParking(
            bounds2
          )
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            this.makeToast(
              "danger",              
              error.response
            );
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
  created() {
    // Tomar las coordenadas de los usuarios desde el request del browser
    this.$getLocation({})
      .then(coordinates => {
        this.coordinates = coordinates;        
        let bounds = {
          _southWest: latLng(coordinates.lat - 0.02, coordinates.lng - 0.02),
          _northEast: latLng(coordinates.lat + 0.02, coordinates.lng + 0.02) 
        }        
        this.nearByParking(bounds);
      })
      .catch(error => alert(error));
    },
}
</script>
