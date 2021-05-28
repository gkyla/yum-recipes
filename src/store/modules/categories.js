import axios from 'axios';
import router from '../../router';
import { sliceIntoChunks } from '../../utils';
import API_CONFIG from '../../globals/config';

const categories = {
  namespaced: true,
  state: {
    categoryMeals: null,
    categoriesNameList: null,
    categoriesIsLoading: {
      meals: true,
      list: true,
    },
  },
  mutations: {
    setCategoryMeals(state, payload) {
      state.categoryMeals = payload;
    },
    setCategoriesList(state, ctg) {
      state.categoriesNameList = ctg;
    },
    setCategoriesStatus(state, { type, loading }) {
      switch (type) {
        case 'meals':
          state.categoriesIsLoading.meals = loading;
          break;
        case 'list':
          state.categoriesIsLoading.list = loading;
          break;
        default:
      }
    },
  },
  actions: {
    async fetchCategoriesList({ commit }) {
      commit('setCategoriesStatus', { type: 'list', loading: true });

      /* c stand for Categories */
      const { data } = await axios.get(API_CONFIG.categoryList);
      commit('setCategoriesList', data.meals);

      commit('setCategoriesStatus', { type: 'list', loading: false });
    },

    async fetchCategoryMeals({ commit }, { ctg, pageOpt }) {
      commit('setCategoriesStatus', { type: 'meals', loading: true });

      router.push({ params: { page: pageOpt || 1, type: ctg.toLowerCase() } });
      const { data } = await axios.get(API_CONFIG.filterByCategory(ctg));
      const payload = sliceIntoChunks(data.meals, 9);

      commit('setCategoryMeals', payload);
      commit('setCategoriesStatus', { type: 'meals', loading: false });
    },
  },
};

export default categories;
