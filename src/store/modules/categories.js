import axios from 'axios';
import router from '../../router';
import { sliceIntoChunks } from '../../utils';
import API_CONFIG from '../../globals/config';

const categories = {
  namespaced: true,
  state: {
    categoryMeals: [],
    categoriesNameList: [],
  },
  mutations: {
    setCategoryMeals(state, payload) {
      state.categoryMeals = payload;
    },
    setCategoriesList(state, ctg) {
      state.categoriesNameList = ctg;
    },
  },
  actions: {
    async fetchCategoriesList({ commit }) {
      /* c stand for Categories */
      const { data } = await axios.get(API_CONFIG.categoryList);
      commit('setCategoriesList', data.meals);
    },

    async fetchCategoryMeals({ commit }, { ctg, pageOpt }) {
      router.push({ params: { page: pageOpt || 1, type: ctg.toLowerCase() } });

      const { data } = await axios.get(API_CONFIG.filterByCategory(ctg));
      console.log({ data, ctg });
      const payload = sliceIntoChunks(data.meals, 9);

      commit('setCategoryMeals', payload);
    },
  },
};

export default categories;
