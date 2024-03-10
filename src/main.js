import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import Register from "./components/views/Register.vue";
import Home from "./components/views/Home.vue";
import "./style.css";
import Login from "./components/views/Login.vue";
import CityView from "./components/views/CityView.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/register",
      name: "Register",
      component: Register,
    },
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/weather/:state/:city",
      name: "CityView",
      component: CityView,
    },
  ],
});

const app = createApp(App);

app.use(router);

app.mount("#app");
