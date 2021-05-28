<template>
  <div class="fondo">
    <header>
      <div id="iconosalir">
        <b-button>
          <b-icon icon="grid3x3-gap-fill"></b-icon>
        </b-button>
      </div>
      <div id="encabezado">
        <div class="h1 mb-0 text-success">
          <b-button id="sistem"> 
            <b-icon icon="list"></b-icon>
          </b-button> 
          Sistema
        </div>
      </div>
    </header>
    <div class="inicio">
      <form action class="form">
        <label class="form-label" for="#email">Email:</label>
        <input
          v-model="usuario.email"
          class="form-input"
          type="email"
          id="email"
          required
          placeholder="Email"
        />
        <label class="form-label" for="#password">Password:</label>
        <input
          v-model="usuario.password"
          class="form-input"
          type="password"
          id="password"
          required
          placeholder="Password"
        />
        <!-- boton -->
        <div @click="inicioSesion" class="form-submit" value="Login">login</div>
      </form>
    </div>
     <footer>
        <div class="Piepagina">
          <h6>ADSI Centro Agroturistico ©2021</h6>
        </div>
      </footer>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "login",
  data: () => ({
    usuario: {
      email: null,
      password: null,
    },
  }),
  props: {},
  methods: {
    inicioSesion() {
      const me = this;
      axios
        .post(`usuario/login`, {
          email: me.usuario.email,
          password: me.usuario.password,
        })
        .then(function(response) {
          me.$store.dispatch("setToken", response.data);
          me.$router.push("/menu");
        })

        .catch(function({response}) {
          console.log(response);
        });
    },
  },
};
</script>

<style>

.fondo {
  background:#188669;
  width: 100%;
}

.inicio {
  padding: 0.01rem;
}
#iconosalir {
  float: right;
}
#encabezado {
  float: left;
  
}
#sistem{
  color: rgb(8, 8, 8);
}
#sistem:hover{
  color: rgb(231, 226, 226);
}

header {
  background: rgba(1, 20, 34, 0.9);
  box-shadow: 0 0.1px 7px 2px rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 90px;
  padding: 20px;
}
.form {
  margin-left: 470px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-width: 35px;
  max-width: 470px;
  background: rgba(9, 17, 24, 0.9);
  border-radius: 2px;
  padding: 28px;
  box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.3);
  margin-top: 6%;
  margin-bottom: 6.5%;
}
.form-label {
  margin-top: 2rem;
  color: rgb(250, 243, 243);
  margin-bottom: 0.5rem;
  margin-top: 0rem;
}
.form-label:hover {
  color: black;
}

.form-input {
  padding: 10px 15px;
  background: none;
  background-image: none;
  border: 1px solid white;
  color: white;
  outline: 0;
  border-color: #1ab188;
  margin-bottom: 18px;
}

.form-submit {
  background: #1ab188;
  border: 5px;
  color: white;
  margin-top: 1rem;
  padding: 8px 0;
  background: #0b9185;
  text-anchor: initial;
  font-size: 20px;
  width: 100%;
}
.form-submit:hover {
  color: black;
}
.Piepagina {
  background: rgb(2, 3, 24);
  box-shadow: 0 0.1px 7px 1px rgba(0, 0, 0, 0.3);
  height: 54px;
}
h6 {
  padding:17px;
  font-family: Georgia, "Times New Roman", Times, serif;
  color: #17d6a3;
}
</style>
