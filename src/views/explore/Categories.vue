<template>
  <explore-type-template
    type="Category"
    :typeList="categoriesNameList"
    :resultMeals="categoryMeals"
    @fetchResult="fetchResult"
    @searchSomeList="searchSomeList"
    :options="{ list: true }"
  >
  </explore-type-template>
</template>

<script>
import ExploreTypeTemplate from '@/components/ExploreTypeTemplate.vue';

import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

export default {
  components: {
    ExploreTypeTemplate,
  },
  setup() {
    const route = useRoute();
    // const router = useRouter();
    const { state, dispatch } = useStore();

    const categoryMeals = computed(() => state.categories.categoryMeals);
    const categoriesNameList = computed(() => state.categories.categoriesNameList);

    /* Initial Fetch when first time coming to category page (if available) */
    if (categoriesNameList.value.length === 0) {
      dispatch('categories/fetchCategoriesList');
    }

    function fetchResult(ctg) {
      dispatch('categories/fetchCategoryMeals', { ctg });
    }

    if (route.params.type === 'all') {
      dispatch('fetchDefaultRecipes');
    } else {
      dispatch('categories/fetchCategoryMeals', {
        ctg: route.params.type,
        pageOpt: route.params.page,
      });
    }

    function searchSomeList(v) {
      console.log(v);
    }

    return {
      categoriesNameList,
      fetchResult,
      categoryMeals,
      searchSomeList,
    };
  },

};
</script>

<style>
</style>
