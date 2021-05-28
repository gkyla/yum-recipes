<template>
  <explore-type-template
    type="Area"
    :typeList="areaList"
    :resultMeals="areaMeals"
    @fetchResult="fetchResult"
    @searchSomeList="searchSomeList"
    :options="{ list: true }"
    :loadingState="areaIsLoading"
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
    const route = useRoute();
    const { dispatch, state } = useStore();

    const areaMeals = computed(() => state.areas.areaMeals);
    const areaList = computed(() => state.areas.areaList);
    const areaIsLoading = computed(() => state.areas.areaIsLoading);

    if (!areaList.value) {
      dispatch('areas/fetchAreaList');
    }

    function fetchResult(area) {
      dispatch('areas/fetchAreaMeals', { area });
    }
    if (route.params.type !== 'all') {
      dispatch('areas/fetchAreaMeals', { area: route.params.type, pageOpt: route.params.page });
    }

    function searchSomeList(v) {
      console.log(v);
    }

    return {
      areaMeals,
      areaList,
      fetchResult,
      searchSomeList,
      areaIsLoading,
    };
  },

};
</script>

<style>
</style>
