import axios from 'axios';
import router from '../../router';
import { sliceIntoChunks } from '../../utils';
import API_CONFIG from '../../globals/config';

const areas = {
  namespaced: true,
  state: {
    areaMeals: [],
    areaList: [],
  },
  mutations: {
    setAreaMeals(state, payload) {
      state.areaMeals = payload;
    },
    setAreaList(state, payload) {
      state.areaList = payload;
    },
  },
  actions: {
    async fetchAreaList({ commit }) {
      const { data } = await axios.get(API_CONFIG.areaList);
      commit('setAreaList', data.meals);
    },

    async fetchAreaMeals({ commit }, { area, pageOpt }) {
      router.push({ params: { page: pageOpt || 1, type: area.toLowerCase() } });
      const { data } = await axios.get(API_CONFIG.filterByArea(area));
      const payload = sliceIntoChunks(data.meals, 9);
      commit('setAreaMeals', payload);
    },
  },
};

export default areas;
