import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:null,
    usuario: null,
    rol:"",
    persona: [],
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setUsuario(state, usuario) {
      state.usuario = usuario;
    },
    setRol(state, value) {
      state.rol = value;
    },
    setPersona(state, payload) {
      state.persona = payload;
    }
  },
  actions: {
    setToken(context, data) {
      context.commit("setToken", data.token);
      context.commit("setUsuario", data.usuario);
    },
    setRol(context, value) {
      context.commit("setRol", value);
    },
    getPersona({commit,state}) {
      let header = { headers: {"token": state.token}};
      axios
        .get("persona", header)
        .then(function (response) {
          commit("setPersona", response.data.persona)
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    newPersona({commit,state}, persona){
      let header = { headers: { "token": state.token } };
      axios
        .post("persona",            {
            tipoPersona: persona.tipoPersona,
            nombre: persona.nombre,
            documento: persona.documento,
            Iddocumento: persona.Iddocumento,
            direccion: persona.direccion,
            telefono: persona.telefono,
            email: persona.email,
          },header)
        .then(function (response) {
          const updatePersonas = state.persona
          updatePersonas.push(response.data.persona)
          commit("setPersona", updatePersonas)
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    updatePersona({commit,state}, {persona, index}){
      let header = { headers: { "token": state.token } };
      axios
        .put(`persona/${persona.id}`,{
            nombre: persona.nombre,
            documento: persona.documento,
            Iddocumento: persona.Iddocumento,
            direccion: persona.direccion,
            telefono: persona.telefono,
            email: persona.email,
          
          },header)
        .then(function (response) {
          const updatePersonas = state.persona
          const newPersona = {
            ...response.data.persona, 
            nombre: persona.nombre,
            documento: persona.documento,
            Iddocumento: persona.Iddocumento,
            direccion: persona.direccion,
            telefono: persona.telefono,
            email: persona.email,
          }
          updatePersonas.splice(index,1, newPersona)
          commit("setPersona", updatePersonas)
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  modules: {},

  getters: {
    header(state) {
      return { headers: { token:state.token }};
    },

     allCliente : (state) => {
      return state.persona.filter(persona => persona.tipoPersona === "Cliente")  
    },
    
    allProveedores : (state) => {
      return state.persona.filter(persona => persona.tipoPersona === "Proveedor")  
    }
    

  },
});
