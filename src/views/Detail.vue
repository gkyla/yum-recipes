<template>
  <div class="container my-4" v-if="!isLoading">
    <div class="row d-flex g-3">
      <div class="col-sm-12 col-lg-4 p-3 bg-white shadow-sm">
        <img
          :src="meal.strMealThumb"
          class="img-fluid detail-banner rounded-10 shadow-sm"
          :alt="meal.strMeal"
        />
        <div id="meal-information" class="text-start">
          <h1 class="fs-3 my-2">{{ meal.strMeal }}</h1>
          <div class="heading-divider"></div>

          <p class="p-2 rounded-1 bg-secondary text-white me-2">
            Area : {{ meal.strArea }}
          </p>
          <p class="p-2 rounded-1 bg-secondary text-white me-2">
            Category : {{ meal.strCategory }}
          </p>
          <div class="my-4">
            <span
              class="p-2 rounded-1 bg-secondary text-white me-2"
              v-for="tag in meal.strTags"
              :key="tag"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
      <div class="col-sm-12 col-lg-8 bg-white text-start p-4 shadow-sm">
        <div id="ingredients-measure" class="mb-2">
          <h2 class="d-inline-block">Ingredients & Measure</h2>
          <div class="heading-divider"></div>
          <div class="d-flex flex-column">
            <p
              class="list-group-item border-1"
              v-for="(ingredient, index) in meal.strIngredient"
              :key="ingredient"
            >
              <input type="checkbox" class="p-2 me-2" />
              {{ ingredient }} : {{ meal.strMeasure[index] }}
            </p>
          </div>
        </div>
        <div id="instructions" class="mb-2">
          <h2>Instruction</h2>
          <div class="heading-divider"></div>

          <p>{{ meal.strInstructions }}</p>
        </div>
        <div id="video">
          <h2>How to</h2>
          <div class="heading-divider"></div>

          <iframe
            v-if="meal.strYoutube"
            :src="meal.strYoutube?.replace('watch?v=', 'embed/')"
            class="w-100"
            height="400"
          ></iframe>
          <h3 class="fs-4" v-else>Error : Video not found</h3>
        </div>
      </div>
    </div>
  </div>
  <div v-if="isLoading" class="mt-4">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import API_CONFIG from '../globals/config';

export default {
  setup() {
    const route = useRoute();
    const meal = ref({});
    const isLoading = ref(true);

    async function getDetail() {
      isLoading.value = true;
      const { data } = await axios.get(API_CONFIG.detail(route.params.id));
      const [dataMeals] = data.meals;

      const res = {};
      // eslint-disable-next-line
      for (const key in dataMeals) {
        if (dataMeals[key] !== null) {
          if (dataMeals[key]?.trim() !== '') {
            if (key.includes('strIngredient')) {
              const slicedIngredientName = key.slice(0, 13); /* strIngredient (without the number) */

              if (!res[slicedIngredientName]) {
                res[slicedIngredientName] = [dataMeals[key]];
              } else {
                res[slicedIngredientName].push(dataMeals[key]);
              }
            } else if (key.includes('strMeasure')) {
              const slicedMeasureName = key.slice(0, 10); /* strMeasure (without the number) */

              if (!res[slicedMeasureName]) {
                res[slicedMeasureName] = [dataMeals[key]];
              } else {
                res[slicedMeasureName].push(dataMeals[key]);
              }
            } else if (key === 'strTags') {
              /* Change tags to array */

              res[key] = dataMeals[key]?.split(',');
            } else {
              res[key] = dataMeals[key];
            }
          }
        }
      }

      meal.value = res;
      isLoading.value = false;
    }

    getDetail();

    return { meal, isLoading };
  },
};
</script>

<style>
.rounded-10 {
  border-radius: 10px !important;
}

.heading-divider {
  width: 40px;
  height: 5px;
  background-color: #ffd369;
  margin-bottom: 15px;
}

.detail-banner {
  width: 100%;
  object-fit: contain;
  object-position: center;
  max-height: 500px;
}
</style>
