<template>
  <div class="fondo">
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
        <div @click.enter="inicioSesion" class="form-submit" value="login">Login</div>
      </form>
    </div>
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
          me.$store.dispatch("setRol", response.data.usuario.rol);
          me.$router.push("/venta");
          console.log(response.data)
        })

        .catch(function({response}) {
          console.log(response.data.msg);
          alert(response.data.msg);
        });
        
    },
    
  },
};
</script>

<style>
 
.fondo{
  background: #0b9185;
  height: 600px;
}
.inicio {
  padding: 0.01rem;
}
#iconosalir {
  float: right;
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
  height: 89px;
  padding: 24px;
}
.form {
  margin-left: 540px;
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
  margin-top: 8%;
  margin-bottom: 6.7%;
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
</style>
