// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VueGeolocation from 'vue-browser-geolocation'
import { LMap, LTileLayer, LMarker, LPopup, LTooltip, LIcon, LControl } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';


Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);
Vue.component('l-popup', LPopup);
Vue.component('l-tooltip', LTooltip);
Vue.component('l-icon', LIcon);
Vue.component('l-control', LControl);

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
// User geolocation
Vue.use(VueGeolocation)
/* eslint-disable no-new */
 
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

