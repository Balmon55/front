import Vue from "vue";
import VueRouter from "vue-router";
import Inicio from "../views/Inicio.vue";
import Menuu from "../views/Menuu.vue";
import Minicios from "../views/Minicios.vue"
import Categoria from "../pages/Categoria.vue";
import Articulo from "../pages/Articulo.vue";
import Ingresos from '../pages/Ingresos.vue';
import Cliente from '../pages/Cliente.vue';
import Proveedor from '../pages/Proveedor.vue';
import Usuario from '../pages/Usuario.vue'
import Ventas from '../pages/Ventas.vue';
import Prueba from '../pages/Prueba.vue'
import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Inicio",
    component: Inicio,
  },
  {
    path: "/prueba",
    name: "Prueba",
    component: Prueba,
  },
  {
    path: "/Minicio",
    name: "Minicios",
    component: Minicios,
  },
  {
    path: "/menu",
    name: "Menuu",
    component: Menuu,
  },
  {
    path: "/categoria",
    name: "Categoria",
    component: Categoria,
  },
  {
    path: "/articulo",
    name: "Articulo",
    component: Articulo,
  },
  {
    path: "/ingreso",
    name: "Ingresos",
    component: Ingresos,
  },
  {
    path: "/proveedor",
    name: "Proveedor",
    component: Proveedor,
  },
  {
    path: "/venta",
    name: "Ventas",
    component: Ventas,
  },
  {
    path: "/cliente",
    name: "Cliente",
    component: Cliente,
  },
  {
    path: "/usuario",
    name: "Usuario",
    component: Usuario,
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
