import Vue from "vue";
import VueRouter from 'vue-router'

import Register from "./components/Register.vue";
import Login from "./Components/Login.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Register",
    component: Register
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  }
];

const router = new VueRouter({
  
  routes
});

export default router;