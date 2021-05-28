import axios from 'axios';
import router from '../../router';
import { sliceIntoChunks, createFormattedMealObject } from '../../utils';
import API_CONFIG from '../../globals/config';

const search = {
  namespaced: true,
  state: {
    searchMeals: null,
    searchName: '',
    isNotFound: false,
    searchIsLoading: {
      meals: true,
    },
  },
  mutations: {
    setSearchMeals(state, payload) {
      state.searchMeals = payload;
    },
    setSearchName(state, name) {
      state.searchName = name;
    },
    setIsNotFound(state, status) {
      state.isNotFound = status;
    },
    setSearchsStatus(state, loading) {
      state.searchIsLoading.meals = loading;
    },
  },
  actions: {
    async fetchSearchMeals({ commit }, { name, pageOpt }) {
      commit('setSearchsStatus', true);

      router.push({ name: 'ExploreSearch', params: { page: pageOpt || 1, type: name.toLowerCase() } });

      const { data } = await axios.get(API_CONFIG.searchByName(name));
      if (data.meals !== null) {
        commit('setIsNotFound', false);
        const formatted = data.meals.map((meal) => createFormattedMealObject(meal));
        const payload = sliceIntoChunks(formatted, 9);
        commit('setSearchMeals', payload);
      } else {
        commit('setIsNotFound', true);
      }

      commit('setSearchsStatus', false);
    },
  },
};

export default search;
