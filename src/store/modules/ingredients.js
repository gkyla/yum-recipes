import axios from 'axios';
import router from '../../router';
import { sliceIntoChunks } from '../../utils';
import API_CONFIG from '../../globals/config';

const categories = {
  namespaced: true,
  state: {
    ingredientsMeals: null,
    ingredientsList: null,
    ingredientsIsLoading: {
      meals: true,
      list: true,
    },
  },
  mutations: {
    setIngredientsMeals(state, payload) {
      state.ingredientsMeals = payload;
    },
    setIngredientsList(state, payload) {
      state.ingredientsList = payload;
    },
    setIngredientsStatus(state, { type, loading }) {
      switch (type) {
        case 'meals':
          state.ingredientsIsLoading.meals = loading;
          break;
        case 'list':
          state.ingredientsIsLoading.list = loading;
          break;
        default:
      }
    },
  },
  actions: {
    async fetchIngredientList({ commit }) {
      commit('setIngredientsStatus', { type: 'list', loading: true });
      const { data } = await axios.get(API_CONFIG.ingredientsList);
      commit('setIngredientsList', data.meals);
      commit('setIngredientsStatus', { type: 'list', loading: false });
    },

    async fetchIngredientsMeals({ commit }, { ingredient, pageOpt }) {
      commit('setIngredientsStatus', { type: 'meals', loading: true });

      router.push({ params: { page: pageOpt || 1, type: ingredient.toLowerCase() } });
      const { data } = await axios.get(API_CONFIG.filterByMainIngredient(ingredient));
      const payload = sliceIntoChunks(data.meals, 9);

      commit('setIngredientsMeals', payload);
      commit('setIngredientsStatus', { type: 'meals', loading: false });
    },
  },
};

export default categories;
