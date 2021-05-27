/* https://www.themealdb.com/api.php */
const API_CONFIG = {
  random: 'https://www.themealdb.com/api/json/v1/1/random.php',
  categories: 'https://www.themealdb.com/api/json/v1/1/categories.php',
  showAll: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',

  searchByName: (name) => `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`,
  detail: (id) => `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
  listMealsByFirstLetter: (letter) => `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`,

  /* filterByCategory only get the list not the details */
  /*
    a : Area,
    c : Categories,
    i : Ingredients
  */
  categoryList: 'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
  areaList: 'https://www.themealdb.com/api/json/v1/1/list.php?a=list',
  ingredientsList: 'https://www.themealdb.com/api/json/v1/1/list.php?i=list',

  /* based on www.themealdb.com/api/json/v1/1/list.php?i=list */
  filterByMainIngredient: (ingredient) => `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`,
  filterByArea: (area) => `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`,
  filterByCategory: (category) => `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`,

};

export default API_CONFIG;
