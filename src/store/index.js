import { createStore } from 'vuex';
import axios from 'axios';
import API_CONFIG from '../globals/config';
import categories from './modules/categories';
import ingredients from './modules/ingredients';
import firstLetter from './modules/firstLetter';
import areas from './modules/areas';
import search from './modules/search';
import { createFormattedMealObject, sliceIntoChunks } from '../utils';

export default createStore({
  state: {
    randomMeals: [],
    recipesAroundTheWorld: [],
    aroundResolve: false,
    defaultRecipes: [],
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

  },
  actions: {
    async updateRandomMeals({ commit }) {
      function generateRandom() {
        return axios.get(API_CONFIG.random);
      }

      const mealRandoms = await Promise.all([generateRandom(), generateRandom(), generateRandom()]);
      const payload = mealRandoms.map((mealObj) => {
        const meal = mealObj.data.meals[0];

        return createFormattedMealObject(meal);
      });
      commit('updateRandomMeals', payload);
    },

    async fetchGetAroundTheWorld({ commit, state }) {
      state.aroundResolve = false;

      const { data: countryList } = await axios.get(API_CONFIG.areaList);
      const countryListLength = countryList.meals.length - 1;
      function generateRandomNumber(length) {
        return Math.round(Math.floor(Math.random() * length));
      }
      const numbers = [generateRandomNumber(countryListLength), generateRandomNumber(countryListLength), generateRandomNumber(countryListLength)];
      const requests = numbers.map((num) => axios.get(API_CONFIG.filterByArea(countryList.meals[num].strArea)));
      const data = await Promise.all(requests);

      const response = data.map((axiosRes, index) => {
        const { data: countryMeals } = axiosRes;
        return {
          contry: countryList.meals[numbers[index]].strArea,
          meal: countryMeals.meals[generateRandomNumber(countryMeals.meals.length - 1)],
        };
      });

      commit('updateRecipesAroundTheWorld', response);
    },

    async fetchDefaultRecipes({ commit }) {
      const { data } = await axios.get(API_CONFIG.showAll);
      const formatted = data.meals.map((meal) => createFormattedMealObject(meal));
      const payload = sliceIntoChunks(formatted, 9);

      commit('setDefaultRecipes', payload);
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
// const requests = numbers.map((num) => {
//   const { data: countryMeals } = await axios.get(API_CONFIG.filterByArea(countryList.meals[num].strArea));

//   console.log('terawait');
//   /* Create new object with the country name inside it  */
//   payload.push({
//     contry: countryList.meals[num].strArea,
//     meal: countryMeals.meals[generateRandomNumber(countryMeals.meals.length - 1)],
//   });

// });
