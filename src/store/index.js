import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: [],
  },
  getters: {},
  mutations: {
    setData(state, res) {
      state.data = res;
    },
  },
  actions: {
    async load({ commit }) {
      try {
        const res = await axios.get(
          "http://restapi.adequateshop.com/api/Tourist?page=1"
        );
        commit("setData", res);
        let finalData = res.data.data;
        localStorage.setItem("items", JSON.stringify(finalData));
        return finalData;
      } catch (error) {
        commit("setData", null);
      }
    },
  },
  modules: {},
});
