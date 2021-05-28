import axios from 'axios';
import router from '../../router';
import { sliceIntoChunks } from '../../utils';
import API_CONFIG from '../../globals/config';

const areas = {
  namespaced: true,
  state: {
    areaMeals: null,
    areaList: null,
    areaIsLoading: {
      meals: true,
      list: true,
    },
  },
  mutations: {
    setAreaMeals(state, payload) {
      state.areaMeals = payload;
    },
    setAreaList(state, payload) {
      state.areaList = payload;
    },
    setAreaStatus(state, { type, loading }) {
      switch (type) {
        case 'meals':
          state.areaIsLoading.meals = loading;
          break;
        case 'list':
          state.areaIsLoading.list = loading;
          break;
        default:
      }
    },
  },
  actions: {
    async fetchAreaList({ commit }) {
      commit('setAreaStatus', { type: 'list', loading: true });

      const { data } = await axios.get(API_CONFIG.areaList);
      commit('setAreaList', data.meals);
      commit('setAreaStatus', { type: 'list', loading: false });
    },

    async fetchAreaMeals({ commit }, { area, pageOpt }) {
      commit('setAreaStatus', { type: 'meals', loading: true });

      router.push({ params: { page: pageOpt || 1, type: area.toLowerCase() } });
      const { data } = await axios.get(API_CONFIG.filterByArea(area));
      const payload = sliceIntoChunks(data.meals, 9);

      commit('setAreaMeals', payload);
      commit('setAreaStatus', { type: 'meals', loading: false });
    },
  },
};

export default areas;
