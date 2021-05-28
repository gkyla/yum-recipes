import axios from 'axios';
import router from '../../router';
import { sliceIntoChunks, createAlphabet, createFormattedMealObject } from '../../utils';
import API_CONFIG from '../../globals/config';

const firstLetter = {
  namespaced: true,
  state: {
    firstLetterMeals: null,
    firstLetterList: null,
    firstLetterIsLoading: {
      meals: true,
      list: true,
    },
  },
  mutations: {
    setFirstLetterMeals(state, payload) {
      state.firstLetterMeals = payload;
      console.log(state.ingredientsMeals, 'payload dari mutations', payload);
    },
    setFirstLetterList(state, payload) {
      state.firstLetterList = payload;
    },
    setFirstLetterStatus(state, { type, loading }) {
      switch (type) {
        case 'meals':
          state.firstLetterIsLoading.meals = loading;
          break;
        case 'list':
          state.firstLetterIsLoading.list = loading;
          break;
        default:
      }
    },
  },
  actions: {
    async fetchFirstLetterList({ commit }) {
      commit('setFirstLetterStatus', { type: 'list', loading: true });
      const payload = createAlphabet();
      commit('setFirstLetterList', payload);
      commit('setFirstLetterStatus', { type: 'list', loading: false });
    },

    async fetchFirstLetterMeals({ commit }, { letter, pageOpt }) {
      commit('setFirstLetterStatus', { type: 'meals', loading: true });

      router.push({ params: { page: pageOpt || 1, type: letter.toLowerCase() } });
      const { data } = await axios.get(API_CONFIG.listMealsByFirstLetter(letter));
      const formatted = data.meals.map((meal) => createFormattedMealObject(meal));
      const payload = sliceIntoChunks(formatted, 9);

      commit('setFirstLetterMeals', payload);
      commit('setFirstLetterStatus', { type: 'meals', loading: false });
    },
  },
};

export default firstLetter;
