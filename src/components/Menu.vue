<template>
  <div class="contenido" >
    <header id="encabezadoM">
      <div v-if="
          this.$store.state.rol == 'Admin' ||
            this.$store.state.rol == 'vendedor' ||
            this.$store.state.rol == 'almacenista'
        ">
      <div id="iconsalir" class="h2 text-success" >
        <b-button @click="salir()" pill variant="outline-secondary" >
          <b-icon 
            variant="primary"
            icon="box-arrow-in-right"
          ></b-icon>
          salir
        </b-button>
        
      </div>
      <div>
        <b-dropdown id="menu" variant="outline-secondary">
          <template #button-content>
            <b-icon icon="list" variant="primary"></b-icon> Sistema
          </template>
          <nav>
            <b-button
              pill
              variant="outline-secondary"
              router-link
              to="/Minicio"
            >
              <b-icon class="ml-2" icon="house-door-fill"></b-icon> Inicio
            </b-button>

            <ul>
              <li v-if="this.$store.state.rol == 'Admin'">
                <b-dropdown-item>
                  <b-icon class="ml-2" icon="house-door-fill"></b-icon>
                  Almacen
                </b-dropdown-item>
                <ul id="lol">
                  <li id="submenu">
                    <b-dropdown-item-button>
                      <router-link to="/categoria" tag="button">
                        Categoria</router-link
                      >
                    </b-dropdown-item-button>
                  </li>
                  <li id="submenu">
                    <b-dropdown-item-button>
                      <router-link to="/articulo" tag="button">
                        Articulos</router-link
                      >
                    </b-dropdown-item-button>
                  </li>
                </ul>
              </li>
              <b-dropdown-divider></b-dropdown-divider>
              <li>
                <b-dropdown-item>
                  <b-icon class="ml-2" icon="house-door-fill"></b-icon>
                  Compras
                </b-dropdown-item>
                <ul>
                  <li id="submenu">
                    <b-dropdown-item-button>
                      <router-link to="/ingreso" tag="button"> Ingresos</router-link>
                    </b-dropdown-item-button>
                  </li>
                  <li id="submenu">
                    <b-dropdown-item-button>
                      <router-link to="/proveedor" tag="button"> Provedores</router-link>
                    </b-dropdown-item-button>
                  </li>
                </ul>
              </li>
              <b-dropdown-divider></b-dropdown-divider>
              <li>
                <b-dropdown-item>
                  <b-icon class="ml-2" icon="house-door-fill"></b-icon>
                  Ventas
                </b-dropdown-item>
                <ul>
                  <li id="submenu">
                    <b-dropdown-item-button>
                      <router-link to="/venta" tag="button">Ventas</router-link>
                    </b-dropdown-item-button>
                  </li>
                  <li id="submenu">
                    <b-dropdown-item-button>
                      <router-link to="/cliente" tag="button"> Clientes</router-link>
                    </b-dropdown-item-button>
                  </li>
                </ul>
              </li>
              <b-dropdown-divider></b-dropdown-divider>
              <li>
                <b-dropdown-item>
                  <b-icon class="ml-2" icon="house-door-fill"></b-icon>
                  Accesos
                </b-dropdown-item>
                <ul>
                  <li id="submenu">
                    <b-dropdown-item-button>
                      <router-link to="/usuario" tag="button">Usuarios</router-link>
                    </b-dropdown-item-button>
                  </li>
                </ul>
              </li>
              <b-dropdown-divider> </b-dropdown-divider>
              <li>
                <b-dropdown-item>
                  <b-icon class="ml-2" icon="house-door-fill"></b-icon>
                  Consulta
                </b-dropdown-item>
                <ul>
                  <li id="submenu">
                    <b-dropdown-item-button>
                      <router-link to="/prueba" tag="button"
                        >Consulta Compras</router-link
                      >
                    </b-dropdown-item-button>
                  </li>
                  <li id="submenu">
                    <b-dropdown-item-button>
                      <router-link to="" tag="button">
                        Consulta Ventas</router-link
                      >
                    </b-dropdown-item-button>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </b-dropdown>
      </div>
      </div>
    </header>
  </div>
</template>
<script>
export default {
  name: "Menu",
  data() {
    return {};
  },
  methods: {
    salir(){
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setRol","");
      this.push("/login"); 
    },
  },
  props: {},
};
</script>
<style>
#iconsalir {
  float: right;
}
#Menu {
  float: left;
}
header#encabezadoM {
  background-color: rgb(3, 23, 39);
}
#menu {
  float: left;
}
li {
  list-style: none;
  text-decoration: none;
}
ul li {
  color: rgb(9, 173, 173);
}
.grafica {
  margin-left: 150px;
  margin-top: 18px;
  margin-bottom: 13px;
}
h1:hover {
  color: rgb(11, 11, 105);
  font-family: serif;
}
.grafica:hover {
  color: brown;
  margin-left: 148px;
}
</style>
