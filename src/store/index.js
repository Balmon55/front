import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MDU0YzdkZTA4NTA0MTA0ZDAxZDMyZjYiLCJpYXQiOjE2MjE0NzQwMTIsImV4cCI6MTYyMTQ4ODQxMn0.Xg0G_a4be9oS5lmJ5piG31nWnuF1zvcWGPFGTEvlVVA",
    usuario: null,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setUsurio(state, usuario) {
      state.usuario = usuario;
    },
  },
  actions: {
    setToken(context, data) {
      context.commit("setToken", data.token);
      context.commit("setUsuario", data.usuario);
    },
  },
  modules: {},
  getters: {
    header(state) {
      return { headers: { token: state.token } };
    },
  },

});
