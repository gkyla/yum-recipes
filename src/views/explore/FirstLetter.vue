<template>
  <explore-type-template
    type="First Letter"
    :typeList="firstLetterList"
    :resultMeals="firstLetterMeals"
    @fetchResult="fetchResult"
    :options="{list: true}"
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

    const firstLetterMeals = computed(() => state.firstLetter.firstLetterMeals);
    const firstLetterList = computed(() => state.firstLetter.firstLetterList);

    if (firstLetterList.value.length === 0) {
      dispatch('firstLetter/fetchFirstLetterList');
    }

    function fetchResult(letter) {
      dispatch('firstLetter/fetchFirstLetterMeals', { letter });
    }
    if (route.params.type !== 'all') {
      dispatch('firstLetter/fetchFirstLetterMeals',
        {
          letter: route.params.type,
          pageOpt: route.params.page,
        });
    }

    return {
      firstLetterMeals,
      firstLetterList,
      fetchResult,
    };
  },

};
</script>

<style>
</style>
