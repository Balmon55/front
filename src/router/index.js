import Vue from "vue";
import VueRouter from "vue-router";
import Inicio from "../views/Inicio.vue";
import Menuu from "../views/Menuu.vue";
import store from '../store'

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Inicio",
    component: Inicio,
  },
  {
    path: "/menu",
    name: "Menuu",
    component: Menuu,
  },

  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to, from, next) => {
  if (!store.state.token && to.path != "/login") {
    next({ name: "Inicio" });
  } else {
    next();
  }
});

export default router;
