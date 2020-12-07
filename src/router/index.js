import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home";
import Register from "@/components/Register";
import Contact from "@/components/Contact";
import Login from "@/components/Login";
import Parkingmap from "@/components/Parkingmap";
import ParkingRegister from "@/components/ParkingRegister";
import Reserva from "@/components/Reserva";
import MyParkings from "@/components/MyParkings"


Vue.use(Router);

export default new Router({
  
  routes: [
    { path: "/", redirect: "home" },
    { path: "/home", name: "home", component: Home },
    { path: "/login", name: "login", component: Login },
    { path: "/register", name: "register", component: Register },
    { path: "/contact", name: "contact", component: Contact },
    { path: "/parkingmap", name: "parkingmap", component: Parkingmap},
    {
      path: "/parking_register",
      name: "parking_register",
      component: ParkingRegister
    },
    { path: "/reserva", name: "reserva", component: Reserva },
    { path: "/MyParkings", name: "MyParkings", component: MyParkings },
    { path: "/:catchAll(.*)", redirect: "home" }
  ]
});
