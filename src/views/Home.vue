<template>
  <div class="home">
    <div class="container mt-2">
      <div class="row justify-content-center">
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
          <div
            class="row d-flex g-3 flex-md-column flex-lg-row"
            v-if="!randomIsLoading"
          >
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
          <div v-if="randomIsLoading" class="mt-4">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>

        <div class="col-sm-12 col-xl-3 d-flex mt-4 flex-column">
          <div class="row">
            <h1 class="fs-3 text-start">Explore</h1>
          </div>
          <div
            class="row text-start mt-2 h-100 d-flex"
            id="explore-home-parent"
          >
            <div
              v-for="explore in exploreHome"
              :key="explore.name"
              :id="`ex-${explore.name}`"
              class="explore-home bg-white shadow p-2 radius-10 col-sm-12 col-md-6 col-xl-12"
            >
              <div class="row">
                <div class="col-md-7 col-xl-6 my-2 my-lg-0">
                  <img
                    :src="explore.img"
                    class="explore-home-img"
                    alt="Categories picture"
                  />
                </div>
                <div class="col-md-5 col-xl-6">
                  <router-link
                    :to="`/explore/${explore.path()}`"
                    class="fs-5 text-decoration-none text-dark"
                    >{{ explore.name }}</router-link
                  >
                  <p id="explore-information">{{ explore.information }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <section id="food-area-insight" class="bg-light shadow-sm mt-5 p-4">
      <div class="container p-0 p-md-3">
        <h1 class="fs-3 mb-4">Recipes Around the World</h1>
        <div
          class="row d-flex justify-content-center g-4"
          v-if="!worldIsLoading"
        >
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
        <div
          class="row d-flex justify-content-center g-4"
          v-if="worldIsLoading"
        >
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>

// @ is an alias to /src
import CardPreview from '@/components/CardPreview.vue';
import AreasImg from '@/assets/explore/areas.jpg';
import SearchImg from '@/assets/explore/search.jpg';

import {
  computed, ref,
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
    const categoriesIsLoading = computed(() => state.categories.categoriesIsLoading);
    const recipesAroundTheWorld = computed(() => state.recipesAroundTheWorld);
    const randomIsLoading = computed(() => state.randomIsLoading);
    const worldIsLoading = computed(() => state.worldIsLoading);

    const exploreHome = ref([
      {
        name: 'Categories',
        img: 'https://www.themealdb.com/images/category/beef.png',
        path: () => `${'Categories'.toLowerCase()}/all/1`,
        information: 'Search based on categories',
      },
      {
        name: 'Ingredients',
        img: 'https://www.themealdb.com/images/ingredients/Broccoli.png',
        path: () => `${'Ingredients'.toLowerCase()}/all/1`,
        information: 'There is around 573 Ingredients !',
      },
      {
        name: 'First Letter',
        img: 'https://www.themealdb.com/images/media/meals/qxytrx1511304021.jpg',
        path: () => `${'First Letter'.toLowerCase().split(' ').join('-')}/all/1`,
        information: 'Find it from A to Z',
      },
      {
        name: 'Areas',
        img: AreasImg,
        path: () => `${'Areas'.toLowerCase()}/all/1`,
        information: 'All around the world',
      },
      {
        name: 'Search',
        img: SearchImg,
        path: () => `${'Search'.toLowerCase()}/all/1`,
        information: 'Find based on your needs',
      },
    ]);

    if (randomMeals.value?.length === 0) {
      dispatch('updateRandomMeals');
    }

    if (recipesAroundTheWorld.value?.length === 0) {
      dispatch('fetchGetAroundTheWorld');
    }

    if (!categoriesNameList.value) {
      dispatch('categories/fetchCategoriesList');
    }

    function updateRandomMeals() {
      dispatch('updateRandomMeals');
    }

    return {
      randomMeals,
      updateRandomMeals,
      categoriesNameList,
      recipesAroundTheWorld,
      randomIsLoading,
      worldIsLoading,
      categoriesIsLoading,
      exploreHome,
    };
  },
};
</script>

<style>
/* w-100 radius-10 h-100 object-fit */

#explore-information {
  font-size: 0.85em;
}

#explore-home-parent > div {
  margin-bottom: 10px;
  border-left: 4px solid #ffd369;
}

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

.explore-home-img {
  width: 100%;
  border-radius: 10px;
  height: 140px;
  object-fit: cover;
  object-position: center;
}

@media (min-width: 992px) {
  .explore-home-img {
    height: 100px;
  }
}

/* @media (min-width: 1200px) {
  #explore-home-parent > div > img {
    width: 100%;
    max-width: 100%;
    height: 100%;
    max-height: 100%;
  }
} */
</style>
