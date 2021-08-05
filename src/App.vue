<template id="app">
  <v-app >
    <Menu/>
    <v-main>
      <router-view>
      </router-view>
    </v-main>
      <footer>
        <div class="Piepagina">
          <h6>ADSI Centro Agroturistico ©2021</h6>
        </div>
      </footer>
  </v-app>
</template>.
<script>
import Menu from './components/Menu.vue'
export default {
  data () {
   
  },
  components:{
    Menu,
  },
  
}
</script>

<style>

.sistema {
  color: rgb(61, 97, 182);
  text-decoration: none;
}
.login {
  bottom: unset;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav a:hover {
  color: bisque;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.Piepagina {
  background: rgb(2, 3, 24);
  box-shadow: 0 0.1px 7px 1px rgba(0, 0, 0, 0.3);
  height: 54px;
}
h6 {
  padding: 17px;
  font-family: Georgia, "Times New Roman", Times, serif;
  color: #17d6a3;
}
</style>
