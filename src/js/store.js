// store.js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [], // Your users data
    exportSuccess: false, // Flag to indicate if export was successful
  },
  mutations: {
    SET_USERS(state, users) {
      state.users = users;
    },
    SET_EXPORT_SUCCESS(state, value) {
      state.exportSuccess = value;
    },
  },
  actions: {
    setUsers({ commit }, users) {
      commit('SET_USERS', users);
    },
    setExportSuccess({ commit }, value) {
      commit('SET_EXPORT_SUCCESS', value);
    },
  },
  getters: {
    users: state => state.users,
    exportSuccess: state => state.exportSuccess,
  },
});
