<template>
  <div class="contenido">
    <header id="encabezadoM">
      <div id="iconsalir" class="h2 text-success">
        <b-button pill variant="outline-secondary" router-link to="/login">
          <b-icon variant="primary" icon="box-arrow-in-right"></b-icon>
        </b-button>
        salir
      </div>
      <div>
      <b-dropdown id="menu" variant="outline-secondary">
          <template #button-content>
            <b-icon icon="list" variant="primary"></b-icon> Sistema
          </template>
          <nav>
          <b-dropdown-item-button>
            <b-icon class="ml-2" icon="house-door-fill"></b-icon> Inicio
          </b-dropdown-item-button>
          
            <ul>
              <li>
                <b-dropdown-item>
                  <b-icon class="ml-2" icon="house-door-fill"></b-icon>
                 Almacen  
                </b-dropdown-item>
                <ul id="lol">
                  <li id="submenu">
                <b-dropdown-item-button>
                 <router-link to="" tag="button"> Categoria</router-link>
                </b-dropdown-item-button>
                  </li>
                  <li id="submenu">
                <b-dropdown-item-button>
                 <router-link to="" tag="button"> Articulos</router-link>
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
                  <li  id="submenu">
                  <b-dropdown-item-button>
                 <router-link to="" tag="button"> Ingresos</router-link>
                </b-dropdown-item-button>
                  </li>
                  <li id="submenu">
                  <b-dropdown-item-button>
                 <router-link to="" tag="button"> Provedores</router-link>
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
                 <router-link to="" tag="button">Ventas</router-link>
                </b-dropdown-item-button>
                  </li>
                  <li id="submenu">
                  <b-dropdown-item-button>
                 <router-link to="" tag="button"> Clientes</router-link>
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
                 <router-link to="" tag="button">Usuarios</router-link>
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
                 <router-link to="" tag="button">Consulta Compras</router-link>
                </b-dropdown-item-button>
                  </li>
                  <li id="submenu">
                  <b-dropdown-item-button>
                 <router-link to="" tag="button"> Consulta Ventas</router-link>
                </b-dropdown-item-button>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </b-dropdown>
      </div>
    </header>
  </div>
</template>
<script>
export default {
  name: "Menu",
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
  background-color: rgb(222, 239, 253);
}
#menu {
  float: left; 
}
li{
  list-style:none;
  text-decoration:none;
}
ul li{
  color: rgb(41, 126, 126);
}




</style>
