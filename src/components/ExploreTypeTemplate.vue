<template>
  <div class="row g-4" id="explore-template">
    <div
      class="col-sm-12"
      :class="{ 'col-lg-3': options.list }"
      v-if="options.list"
    >
      <div class="d-flex align-items-center mb-2">
        <button
          class="btn btn-warning text-start w-100 border-0 d-flex rounded-10 align-items-center p-2"
          id="collapseListButton"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseList"
          aria-expanded="false"
          @click.stop="toggleList = !toggleList"
          aria-controls="collapseExample"
        >
          <i
            class="bi ms-2"
            :class="{
              'bi-arrow-down': toggleList,
              'bi-arrow-right': !toggleList,
            }"
          >
          </i>
          <h1 class="text-start fs-4 m-0 ms-2 d-inline-block">{{ type }}</h1>
          <button
            class="btn btn-secondary ms-auto rounded-pill ms-auto"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseSearch"
            aria-expanded="false"
            aria-controls="collapseExample"
            @click.stop="doNothing"
          >
            <i class="bi bi-search"></i>
          </button>
        </button>
      </div>
      <div class="collapse mb-2" id="collapseSearch">
        <input
          type="text"
          class="form-control rounded-10 border shadow-sm my-2"
          id="search-list"
          :placeholder="`Search ${type}`"
          v-model="localSearch.list"
          @input="searchSomeList(type)"
          aria-describedby="Search recipe"
        />
      </div>

      <div class="collapse" :class="{ show: toggleList }" id="collapseList">
        <ul
          class="list-group radius-3 shadow mt-3"
          v-if="type !== 'First Letter'"
        >
          <li
            class="list-group-item text-start"
            v-for="meal in localData.list"
            :key="meal[`str${type}`]"
          >
            <button
              @click="$emit('fetchResult', meal[`str${type}`])"
              class="btn btn-secondary text-white rounded-10 my-1"
            >
              {{ meal[`str${type}`] }}
            </button>
          </li>
          <li
            class="list-group-item p-4 fs-4"
            v-if="localData.list?.length === 0"
          >
            Not Found
          </li>
        </ul>
        <ul
          class="list-group radius-10 shadow mt-3"
          v-if="type === 'First Letter'"
        >
          <li
            class="list-group-item text-start"
            v-for="meal in localData.list"
            :key="meal"
          >
            <button
              @click="$emit('fetchResult', meal)"
              class="btn btn-warning rounded-pill my-1"
            >
              {{ meal }}
            </button>
          </li>
          <li
            class="list-group-item p-4 fs-4"
            v-if="localData.list.length === 0"
          >
            Not Found
          </li>
        </ul>
        <!-- Loading state -->
        <div class="list-group-item p-4 fs-4" v-if="loadingState.list">
          <div
            class="spinner-border"
            style="width: 3rem; height: 3rem"
            role="status"
          >
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </div>

    <div class="col-sm-12" :class="{ 'col-lg-9': options.list }">
      <div class="d-flex align-items-center">
        <h1
          class="rounded-10 mb-2 text-start ps-4 fs-4 w-100 d-flex bg-warning align-items-center p-2"
        >
          Result
          <span class="bg-secondary text-white fs-5 rounded-pill p-1 ms-2">
            {{ totalResult }}
          </span>
          <button
            class="btn btn-secondary rounded-pill ms-auto"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseMeals"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            <i class="bi bi-search"></i>
          </button>
        </h1>
      </div>
      <div class="collapse" id="collapseMeals">
        <input
          type="text"
          class="form-control rounded-10 border shadow-sm mb-2"
          id="search-meals"
          :placeholder="`Search on result`"
          v-model="localSearch.meals"
          @input="searchSomeMeals()"
          aria-describedby="Search Meals"
        />
      </div>

      <div
        class="row g-3 pt-2"
        v-if="resultMealsReadyAndNotTypeAll && !loadingState.meals"
      >
        <div
          class="col-sm-12 col-md-6 col-lg-4"
          :class="{ 'col-xl-3': !options.list }"
          v-for="meal in localData.meals[paramsPage - 1]"
          :key="meal.strMeal"
        >
          <card-preview :meal="meal"></card-preview>
        </div>
      </div>
      <div
        class="row g-3 pt-2"
        v-if="paramsTypeIsAll && localData.defaultRecipes"
      >
        <div
          class="col-sm-12 col-md-6 col-lg-4"
          :class="{ 'col-xl-3': !options.list }"
          v-for="meal in localData.defaultRecipes[paramsPage - 1]"
          :key="meal.strMeal"
        >
          <card-preview :meal="meal"></card-preview>
        </div>
      </div>

      <!-- Handle Loading State -->
      <div class="row g-3 pt-2 justify-content-center">
        <div
          class="spinner-border mt-4"
          style="width: 3rem; height: 3rem"
          role="status"
          v-if="loadingState.meals && $route.params.type !== 'all'"
        >
          <span class="visually-hidden">Loading...</span>
        </div>
        <div
          class="spinner-border mt-4"
          style="width: 3rem; height: 3rem"
          role="status"
          v-if="defaultIsLoading && !localData.meals && paramsTypeIsAll"
        >
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-12">
          <Pagination
            v-if="resultMealsReadyAndNotTypeAll"
            :chunkedData="resultMeals"
          />
          <Pagination
            v-if="!resultMealsReadyAndNotTypeAll && defaultRecipes"
            :chunkedData="defaultRecipes"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import CardPreview from '@/components/CardPreview.vue';
import Pagination from '@/components/Pagination.vue';
import { useRoute } from 'vue-router';
import {
  computed, reactive, toRefs, watch, ref,
} from 'vue';
import { useStore } from 'vuex';
import { sliceIntoChunks } from '../utils';

export default {
  components: {
    Pagination,
    CardPreview,
  },
  emits: ['fetchResult'],
  props: {
    type: {
      type: String,
      required: true,
    },
    typeList: {
      type: Array,
    },
    resultMeals: {
      required: true,
    },
    options: {
      type: Object,
    },
    loadingState: {
      type: Object,
    },
  },
  setup(props) {
    const route = useRoute();
    const { dispatch, state } = useStore();
    const { resultMeals } = toRefs(props);

    const paramsType = computed(() => route.params.type);
    const paramsPage = computed(() => route.params.page);
    const defaultRecipes = computed(() => state.defaultRecipes);
    const defaultIsLoading = computed(() => state.defaultIsLoading);

    const localData = reactive({
      list: props.typeList,
      meals: props.resultMeals,
      defaultRecipes: defaultRecipes.value,
    });

    const localSearch = reactive({
      list: '',
      meals: '',
    });

    const toggleList = ref(true);

    const paramsTypeIsAll = computed(() => route.params.type === 'all');
    const totalResult = computed(() => {
      if (resultMeals.value?.length > 0 && paramsType.value !== 'all') {
        return resultMeals.value.flat()?.length;
      }
      return '-';
    });
    const resultMealsReadyAndNotTypeAll = computed(() => localData.meals?.length > 0 && paramsType.value !== 'all');

    if (paramsType.value === 'all') {
      dispatch('fetchDefaultRecipes');
    }

    watch(computed(() => props.typeList), (val, oldVal) => {
      localData.list = val;
    });
    watch(resultMeals, (val, oldVal) => {
      localData.meals = val;
    });

    watch(defaultRecipes, (val, oldVal) => {
      localData.defaultRecipes = val;
    });

    function searchSomeList(type) {
      if (type !== 'First Letter') {
        localData.list = props.typeList
          .filter((list) => list[`str${type}`].toLowerCase().includes(localSearch.list.toLowerCase()));
      } else {
        const res = props.typeList.filter((list) => list.toLowerCase().includes(localSearch.list.toLowerCase()));
        localData.list = res;
      }
    }

    function searchSomeMeals() {
      if (paramsType.value !== 'all') {
        const flat = props.resultMeals.flat().filter((list) => list.strMeal.toLowerCase().includes(localSearch.meals.toLowerCase()));
        const chunked = sliceIntoChunks(flat, 9);
        localData.meals = chunked;
      } else {
        const flat = defaultRecipes.value.flat().filter((list) => list.strMeal.toLowerCase().includes(localSearch.meals.toLowerCase()));
        const chunked = sliceIntoChunks(flat, 9);
        localData.defaultRecipes = chunked;
      }
    }

    function doNothing() {
      /* prevent button to bubbles up */
    }

    return {
      paramsType,
      paramsPage,
      defaultRecipes,
      totalResult,
      paramsTypeIsAll,
      resultMealsReadyAndNotTypeAll,
      localSearch,
      searchSomeList,
      localData,
      searchSomeMeals,
      toggleList,
      doNothing,
      defaultIsLoading,
    };
  },
};
</script>

<style lang="scss">
.rounded-10 {
  border-radius: 10px;
}

.list-group {
  max-height: 790px;
  overflow-y: scroll;
  transition: 0.1s ease-in-out all;

  &::-webkit-scrollbar,
  &::-webkit-scrollbar-track,
  &::-webkit-scrollbar-thumb {
    display: none;
  }

  &:hover {
    &::-webkit-scrollbar,
    &::-webkit-scrollbar-track,
    &::-webkit-scrollbar-thumb {
      display: inline-block;
    }
  }
}

#explore-template {
  min-height: 1000px;
}
</style>
