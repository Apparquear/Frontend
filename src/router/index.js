import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home";
import Register from "@/components/Register";
import Contact from "@/components/Contact";
import Login from "@/components/Login";
import ParkingRegister from "@/components/ParkingRegister";

Vue.use(Router);

export default new Router({
  routes: [
    { path: "/", redirect: "home" },
    { path: "/home", name: "home", component: Home },
    { path: "/login", name: "login", component: Login },
    { path: "/register", name: "register", component: Register },
    { path: "/contact", name: "contact", component: Contact },
    {
      path: "/parking_register",
      name: "parking_register",
      component: ParkingRegister
    },
    { path: "/:catchAll(.*)", redirect: "home" }
  ]
});
