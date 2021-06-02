<template>
  <div class="row g-3 mb-4">
    <h1 class="fs-3 mb-2 text-start">Explore By</h1>

    <div
      class="col-sm-12 col-md-6 col-lg-4"
      v-for="link in exploreLinks"
      :key="link.name"
    >
      <router-link
        :to="`/explore/${link.path()}`"
        class="button-explore-list shadow"
        :style="{ backgroundImage: `url(${link.img})`, ...link.styles }"
      >
        <h1
          class="fs-5 text-start shadow text-secondary m-2 bg-warning rounded-pill py-1 px-3"
        >
          {{ link.name }}
        </h1>
      </router-link>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

// credit https://unsplash.com/photos/hrlvr2ZlUNk
import AreasImg from '@/assets/explore/areas.jpg';

// https://unsplash.com/photos/lcZ9NxhOSlo
import SearchImg from '@/assets/explore/search.jpg';

export default {
  setup() {
    const exploreLinks = ref([
      {
        name: 'Categories',
        path: () => `${'Categories'.toLowerCase()}/all/1`,
        img: 'https://www.themealdb.com/images/category/beef.png',
      },
      {
        name: 'Ingredients',
        path: () => `${'Ingredients'.toLowerCase()}/all/1`,
        img: 'https://www.themealdb.com/images/ingredients/Broccoli.png',
      },
      {
        name: 'First Letter',
        path: () => `${'First Letter'.toLowerCase().split(' ').join('-')}/all/1`,
        img: 'https://www.themealdb.com/images/media/meals/qxytrx1511304021.jpg',
        styles: {
          backgroundSize: 'cover',
        },
      },
      {
        name: 'Areas',
        path: () => `${'Areas'.toLowerCase()}/all/1`,
        img: AreasImg,
        styles: {
          backgroundSize: 'cover',
        },
      },
      {
        name: 'Search',
        path: () => `${'Search'.toLowerCase()}/all/1`,
        img: SearchImg,
        styles: {
          backgroundSize: 'cover',
        },
      },
    ]);

    return {
      exploreLinks,
    };
  },
};
</script>

<style>
.button-explore-list {
  text-decoration: none;
  width: 100%;
  min-height: 200px;
  display: flex;
  align-items: flex-start;
  color: white;
  border-radius: 10px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
