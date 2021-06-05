export function sliceIntoChunks(arr, size) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    const chunks = arr.slice(i, i + size);
    result.push(chunks);
  }

  return result;
}

export function createFormattedMealObject(meal) {
  return {
    idMeal: meal.idMeal,
    strMealThumb: meal.strMealThumb,
    strMeal: meal.strMeal,
    strTags: meal.strTags ? meal.strTags.split(',') : meal.strTags,
    strCategory: meal.strCategory,
    strArea: meal.strArea,
    strInstructions: meal.strInstructions,
  };
}

export function createAlphabet() {
  /* Based on char code alphabet 65-90 */
  const charA = 65;
  const charZ = 90;

  const result = [];

  for (let i = charA; i <= charZ; i += 1) {
    result.push(String.fromCharCode(i));
  }
  return result;
}

export function generateRandomNumber(length) {
  return Math.round(Math.floor(Math.random() * length));
}

export const a = null;
