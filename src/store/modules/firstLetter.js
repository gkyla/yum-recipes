import axios from 'axios';
import router from '../../router';
import { sliceIntoChunks, createAlphabet, createFormattedMealObject } from '../../utils';
import API_CONFIG from '../../globals/config';

const firstLetter = {
  namespaced: true,
  state: {
    firstLetterMeals: [],
    firstLetterList: [],
  },
  mutations: {
    setFirstLetterMeals(state, payload) {
      state.firstLetterMeals = payload;
      console.log(state.ingredientsMeals, 'payload dari mutations', payload);
    },
    setFirstLetterList(state, payload) {
      state.firstLetterList = payload;
    },
  },
  actions: {
    async fetchFirstLetterList({ commit }) {
      const payload = createAlphabet();
      commit('setFirstLetterList', payload);
    },

    async fetchFirstLetterMeals({ commit }, { letter, pageOpt }) {
      router.push({ params: { page: pageOpt || 1, type: letter.toLowerCase() } });
      const { data } = await axios.get(API_CONFIG.listMealsByFirstLetter(letter));
      const formatted = data.meals.map((meal) => createFormattedMealObject(meal));
      const payload = sliceIntoChunks(formatted, 9);
      commit('setFirstLetterMeals', payload);
    },
  },
};

export default firstLetter;
