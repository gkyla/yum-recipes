<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-12">
        <div
          id="explore-home"
          class="w-100 radius-10 my-4 d-flex align-items-center justify-content-center"
        >
          <div class="position-relative p-3">
            <h1 class="fs-3 text-start mb-3">Thinking about something ?</h1>
            <search-bar
              :searchInput="searchInput"
              @onInput="getValueInput"
              :inputStyle="{ shadow: true, 'border-0': true }"
              :inputParentStyle="{ 'mb-3': true }"
            >
              <button type="submit" class="btn btn-warning rounded-pill">
                Search
              </button>
            </search-bar>
          </div>
        </div>
      </div>
    </div>

    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import SearchBar from '@/components/SearchBar.vue';

import { computed, ref } from 'vue';
import { useStore } from 'vuex';

export default {
  components: {
    SearchBar,

  },
  setup() {
    const { state } = useStore();

    const meal = computed(() => state.randomMeals[0]?.strMeal);
    const searchInput = ref('');

    function getValueInput(val) {
      searchInput.value = val;
    }

    return {
      meal,
      // searchRecipe,
      searchInput,
      getValueInput,
    };
  },

};
</script>

<style lang="scss">
#explore-home {
  z-index: 0;
  color: white;
  position: relative;
  border-radius: 10px;
  min-height: 300px;
  padding: 10px;
  background-image: url(../../assets/explore.jpg);
  background-size: cover;
  background-position: center;
}

#explore-home > * {
  z-index: 99;
}

#explore-home::before {
  border-radius: 10px;
  position: absolute;
  content: "";
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
