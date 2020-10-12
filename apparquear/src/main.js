import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import Home from "./components/Home.vue";
import Register from "./components/Register.vue";
import Contact from "./components/Contact.vue";
import Errors from "./components/Errors.vue";

const routerHistory = createWebHistory();

const router = createRouter({
  history: routerHistory,
  routes: [
    { path: "/", redirect: "/home" },
    { path: "/home", name: "home", component: Home },
    { path: "/register", name: "register", component: Register },
    { path: "/contact", name: "contact", component: Contact },
    { path: "/:catchAll(.*)", component: Errors },
  ],
});

const app = createApp(App);
app.use(router);
app.mount("#app");
