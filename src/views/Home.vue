<template>
  <div class="home">
    <div class="container mt-2">
      <div class="row justify-content-center" v-if="randomMeals">
        <div class="col-sm-12 col-xl-9">
          <div class="row d-flex my-3">
            <div class="col-sm-12 col-md-9">
              <h1 class="fs-3 text-start">
                Random recipes today only for you !
              </h1>
            </div>
            <div class="col-sm-12 col-md-3 d-flex">
              <button
                @click="updateRandomMeals"
                class="ms-md-auto btn btn-warning rounded-pill"
              >
                <i class="bi bi-arrow-clockwise"></i> Regenerate
              </button>
            </div>
          </div>
          <div class="row d-flex g-3 flex-md-column flex-lg-row">
            <div class="col-sm-12 col-lg-8 d-flex justify-content-center">
              <card-preview
                :meal="randomMeals[0]"
                :options="{ instructions: true }"
              ></card-preview>
            </div>
            <div class="col-sm-12 col-lg-4 d-flex flex-column rounded-3">
              <div class="row g-3 d-flex">
                <div class="col-sm-12 col-md-6 col-lg-12">
                  <card-preview :meal="randomMeals[1]"></card-preview>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-12">
                  <card-preview :meal="randomMeals[2]"></card-preview>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-12 col-xl-3 d-flex flex-column">
          <h1 class="fs-3 my-3 text-start">Categories</h1>

          <ul class="list-group radius-10 shadow mt-2">
            <li
              class="list-group-item text-start"
              v-for="category in categoriesNameList"
              :key="category.strCategory"
            >
              {{ category.strCategory }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <section id="food-area-insight" class="bg-light shadow-sm mt-5 p-4">
      <div class="container p-0 p-md-3">
        <h1 class="fs-3 mb-4">Recipes Around the World</h1>
        <div class="row d-flex justify-content-center g-4" :key="aroundResolve">
          <div
            v-for="meal in recipesAroundTheWorld"
            class="col-sm-12 col-md-4"
            :key="meal"
          >
            <div class="d-flex flex-column">
              <div
                class="rounded-pill bg-secondary mx-auto py-2 px-4 text-white my-2"
              >
                {{ meal.contry }}
              </div>
              <card-preview :meal="meal.meal"></card-preview>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

// @ is an alias to /src
import CardPreview from '@/components/CardPreview.vue';

import {
  computed, onMounted, watch,
} from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'Home',
  components: {
    CardPreview,
  },

  setup() {
    const { state, dispatch } = useStore();
    const randomMeals = computed(() => state.randomMeals);
    const categoriesNameList = computed(() => state.categories.categoriesNameList);
    const recipesAroundTheWorld = computed(() => state.recipesAroundTheWorld);
    const aroundResolve = computed(() => state.aroundResolve);

    /* Bug
      if the browser was hard refreshed, recipe around the world not updating / render
      solution 1 (last solution) : add load button , to reload the data / render
      stil finding ..
    */

    onMounted(() => {
      if (randomMeals.value?.length === 0) {
        dispatch('updateRandomMeals');
      }

      if (recipesAroundTheWorld.value?.length === 0) {
        dispatch('fetchGetAroundTheWorld');
      }

      if (categoriesNameList.value?.length === 0) {
        dispatch('categories/fetchCategoriesList');
      }
    });

    watch(recipesAroundTheWorld, (val, oldVal) => {
      console.log(val, oldVal);
    });

    function updateRandomMeals() {
      dispatch('updateRandomMeals');
    }

    return {
      randomMeals,
      updateRandomMeals,
      categoriesNameList,
      recipesAroundTheWorld,
      aroundResolve,
    };
  },
};
</script>

<style>
.card {
  height: 100% !important;
  overflow: hidden;
}

.object-fit {
  object-fit: cover;
}

#food-area-insight {
  min-height: 400px;
}
</style>
