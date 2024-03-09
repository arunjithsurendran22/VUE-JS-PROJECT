import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import Register from "./components/views/Register.vue";
import Home from "./components/views/Home.vue";
import "./style.css";
import Login from "./components/views/Login.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/register", component: Register },
    { path: "/home", component: Home },
    { path: "/", component: Login },
  ],
});

const app = createApp(App);

app.use(router);

app.mount("#app");
