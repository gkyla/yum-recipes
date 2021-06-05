import { createStore } from 'vuex';
import axios from 'axios';
import API_CONFIG from '../globals/config';
import categories from './modules/categories';
import ingredients from './modules/ingredients';
import firstLetter from './modules/firstLetter';
import areas from './modules/areas';
import search from './modules/search';
import { createFormattedMealObject, sliceIntoChunks, generateRandomNumber } from '../utils';

function generateRandom() {
  return axios.get(API_CONFIG.random);
}

export default createStore({
  state: {
    randomMeals: [],
    recipesAroundTheWorld: [],
    aroundResolve: false,
    defaultRecipes: null /* Expected [] when data arrived */,
    randomIsLoading: true,
    worldIsLoading: true,
    defaultIsLoading: true,
  },
  mutations: {
    updateRandomMeals(state, payload) {
      state.randomMeals = payload;
    },
    updateRecipesAroundTheWorld(state, payload) {
      state.recipesAroundTheWorld = payload;
      state.aroundResolve = true;
    },
    setDefaultRecipes(state, payload) {
      state.defaultRecipes = payload;
    },
    setLoadingStatus(state, { type, loading }) {
      switch (type) {
        case 'random':
          state.randomIsLoading = loading;
          break;
        case 'world':
          state.worldIsLoading = loading;
          break;
        case 'default':
          state.defaultIsLoading = loading;
          break;
        default:
          /* Quit */
      }
    },
  },
  actions: {
    async updateRandomMeals({ commit }) {
      commit('setLoadingStatus', { type: 'random', loading: true });

      const mealRandoms = await Promise.all([generateRandom(), generateRandom(), generateRandom()]);
      const payload = mealRandoms.map((mealObj) => {
        const meal = mealObj.data.meals[0];

        return createFormattedMealObject(meal);
      });
      commit('updateRandomMeals', payload);
      commit('setLoadingStatus', { type: 'random', loading: false });
    },

    async fetchGetAroundTheWorld({ commit, state }) {
      commit('setLoadingStatus', { type: 'world', loading: true });
      state.aroundResolve = false;

      const { data: countryList } = await axios.get(API_CONFIG.areaList);
      const countryListLength = countryList.meals.length - 1;

      const numbers = [generateRandomNumber(countryListLength), generateRandomNumber(countryListLength), generateRandomNumber(countryListLength)];
      const requests = numbers.map((num) => axios.get(API_CONFIG.filterByArea(countryList.meals[num].strArea)));
      const response = await Promise.all(requests);

      const data = response.map((axiosRes, index) => {
        const { data: countryMeals } = axiosRes;
        return {
          contry: countryList.meals[numbers[index]].strArea,
          meal: countryMeals.meals[generateRandomNumber(countryMeals.meals.length - 1)],
        };
      });

      commit('updateRecipesAroundTheWorld', data);
      commit('setLoadingStatus', { type: 'world', loading: false });
    },

    async fetchDefaultRecipes({ commit }) {
      commit('setLoadingStatus', { type: 'default', loading: true });
      commit('setDefaultRecipes', null);

      const { data } = await axios.get(API_CONFIG.showAll);
      const formatted = data.meals.map((meal) => createFormattedMealObject(meal));
      const payload = sliceIntoChunks(formatted, 9);

      commit('setDefaultRecipes', payload);
      commit('setLoadingStatus', { type: 'default', loading: false });
    },
  },
  modules: {
    categories,
    ingredients,
    firstLetter,
    areas,
    search,
  },
});
