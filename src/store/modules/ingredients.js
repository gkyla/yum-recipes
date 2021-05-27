import axios from 'axios';
import router from '../../router';
import { sliceIntoChunks } from '../../utils';
import API_CONFIG from '../../globals/config';

const categories = {
  namespaced: true,
  state: {
    ingredientsMeals: [],
    ingredientsList: [],
  },
  mutations: {
    setIngredientsMeals(state, payload) {
      state.ingredientsMeals = payload;
    },
    setIngredientsList(state, payload) {
      state.ingredientsList = payload;
    },
  },
  actions: {
    async fetchIngredientList({ commit }) {
      const { data } = await axios.get(API_CONFIG.ingredientsList);
      const payload = data.meals.filter((meal, index) => index <= 30);
      commit('setIngredientsList', payload);
    },

    async fetchIngredientsMeals({ commit }, { ingredient, pageOpt }) {
      router.push({ params: { page: pageOpt || 1, type: ingredient.toLowerCase() } });
      const { data } = await axios.get(API_CONFIG.filterByMainIngredient(ingredient));
      const payload = sliceIntoChunks(data.meals, 9);
      commit('setIngredientsMeals', payload);
    },
  },
};

export default categories;
