<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
    <div class="container">
      <router-link
        class="navbar-brand d-flex align-items-center"
        :to="{ name: 'Home' }"
      >
        <img src="../assets/logo-2.png" width="50" alt="Yumrecipes" />
        <span class="ms-2 pe-2">Yumrecipes</span>
      </router-link>
      <button
        class="navbar-toggler border-0"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <div
          class="explore navbar-nav text-start p-2 p-lg-0 rounded-2 my-3 my-lg-0 border-bottom-2"
        >
          <router-link
            :to="{ path: '/explore/list' }"
            class="mb-2 nav-link mb-lg-0 fs-4 d-flex flex-column justify-content-center bg-transparent border-0"
          >
            <div class="d-flex align-items-center">
              <i class="bi bi-list fs-1 me-2"></i>
              <span>Explore Recipes</span>
            </div>
            <p class="d-lg-none fs-6">Find your recipe from around the world</p>
          </router-link>
        </div>
        <search-bar
          :searchInput="searchInput"
          id="input-navbar"
          class="my-lg-0 my-4"
          @onInput="getValueInput"
          :inputStyle="{ 'shadow-sm': true, 'border-1': true, 'ms-lg-4': true }"
        ></search-bar>
        <div class="border"></div>

        <ul class="navbar-nav mt-3 mt-lg-0 d-flex flex-grow-1">
          <li class="nav-item ms-lg-auto ms-0">
            <router-link
              class="nav-link active rounded-pill"
              aria-current="page"
              :to="{ name: 'Home' }"
              >Home</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link rounded-pill"
              title="On Development"
              :to="{ name: 'Favorite' }"
              >Favorite</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import SearchBar from '@/components/SearchBar.vue';
import { ref } from 'vue';

export default {
  components: {
    SearchBar,
  },
  setup() {
    const searchInput = ref('');

    function getValueInput(val) {
      searchInput.value = val;
    }

    return { searchInput, getValueInput };
  },
};
</script>

<style lang="scss">
#input-navbar {
  width: 100% !important;
  // max-width: 100% !important;
  display: flex !important;
  align-items: center !important;
}

@media (min-width: 992px) {
  .explore {
    font-size: 1em !important;

    a {
      font-size: 1em !important;
    }

    i {
      font-size: 1.4em !important;
    }
  }

  #input-navbar {
    // max-width: 400px !important;
  }
}
</style>
