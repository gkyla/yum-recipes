<template>
  <explore-type-template
    v-if="isNotFound === false"
    type="Search"
    :resultMeals="searchMeals"
    @fetchResult="fetchResult"
    :options="{list: false}"
  ></explore-type-template>
  <div v-if="isNotFound === true">
    <h2>Not Found brader</h2>
  </div>
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
    const { state, dispatch } = useStore();
    const route = useRoute();

    const searchName = computed(() => state.search.searchName);
    const searchMeals = computed(() => state.search.searchMeals);
    const isNotFound = computed(() => state.search.isNotFound);

    function fetchResult(search) {
      console.log(search);
    }

    if (searchName.value) {
      dispatch('search/fetchSearchMeals', {
        name: searchName.value,
        pageOpt: route.params.page,
      });
    } else {
      dispatch('search/fetchSearchMeals', {
        name: route.params.type,
        pageOpt: route.params.page,
      });
    }

    return { searchMeals, fetchResult, isNotFound };
  },
};
</script>

<style>
</style>
