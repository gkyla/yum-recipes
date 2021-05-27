<template>
  <explore-type-template
    type="Ingredient"
    :typeList="ingredientsList"
    :resultMeals="ingredientMeals"
    @fetchResult="fetchResult"
    @searchSomeList="searchSomeList"
    :options="{ list: true }"
  >
  </explore-type-template>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

import ExploreTypeTemplate from '@/components/ExploreTypeTemplate.vue';
import { useRoute } from 'vue-router';

export default {
  components: {
    ExploreTypeTemplate,
  },
  setup() {
    const { params } = useRoute();
    const { dispatch, state } = useStore();

    const ingredientMeals = computed(() => state.ingredients.ingredientsMeals);
    const ingredientsList = computed(() => state.ingredients.ingredientsList);

    if (ingredientsList.value.length === 0) {
      dispatch('ingredients/fetchIngredientList');
    }

    function fetchResult(ingredient) {
      dispatch('ingredients/fetchIngredientsMeals', { ingredient });
    }
    if (params.type !== 'all') {
      dispatch('ingredients/fetchIngredientsMeals', { ingredient: params.type, pageOpt: params.page });
    }

    function searchSomeList(v) {
      console.log(v);
    }

    return {
      ingredientMeals,
      ingredientsList,
      fetchResult,
      searchSomeList,
    };
  },

};
</script>

<style>
</style>
