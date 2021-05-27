<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination my-4">
      <li class="page-item">
        <router-link
          class="page-link"
          :to="`/explore/${subExplore}/${type}/${
            +page !== 1 ? +page - 1 : +page
          }`"
          >Previous
        </router-link>
      </li>
      <li class="page-item" v-for="number in chunkedData.length" :key="number">
        <router-link
          v-if="chunkedData.length"
          class="page-link"
          :to="`/explore/${subExplore}/${type}/${number}`"
          >{{ number }}</router-link
        >
        <router-link
          v-else
          :to="`/explore/${subExplore}/${type}/1`"
          class="page-link"
          >-</router-link
        >
      </li>
      <li class="page-item" v-if="!chunkedData.length">
        <router-link :to="`/explore/${subExplore}/${type}/1`" class="page-link"
          >-</router-link
        >
      </li>

      <li class="page-item">
        <router-link
          class="page-link"
          :to="`/explore/${subExplore}/${type}/${
            +page < chunkedData.length ? +page + 1 : +page
          }`"
          >Next</router-link
        >
      </li>
    </ul>
  </nav>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

export default {
  props: {
    chunkedData: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const route = useRoute();
    const type = computed(() => route.params.type);
    const page = computed(() => route.params.page);

    const subExplore = computed(() => {
      const [, explore, sub, typeExplore, pageExplore] = route.path.split('/');
      return sub;
    });

    return {
      type,
      page,
      subExplore,
    };
  },
};
</script>

<style>
</style>
