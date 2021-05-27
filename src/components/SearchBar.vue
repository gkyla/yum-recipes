<template>
  <form @submit.prevent="searchRecipe" class="position-relative flex-grow-1">
    <div
      :id="id"
      class="position-relative w-100 h-100 d-flex align-items-center"
      :class="{ ...inputParentStyle }"
    >
      <input
        type="text"
        class="form-control rounded-10 w-100 p-2"
        :class="{ ...inputStyle }"
        v-model="input"
        @input="$emit('onInput', input)"
        placeholder="Spaghetti Bolognese"
        aria-placeholder="'Spaghetti Bolognese'"
        aria-describedby="Search recipe"
      />
      <button
        type="submit"
        class="bg-secondary position-absolute end-0 top-0 rounded-2 text-white rounded-10 border-0 h-100"
      >
        <i class="bi bi-search p-1 d-inline-block"></i>
      </button>
    </div>

    <slot></slot>
  </form>
</template>

<script>
import { toRefs, ref } from 'vue';
import { useStore } from 'vuex';

export default {
  props: {
    searchInput: {
      type: String,
      required: true,
    },
    id: String,
    inputParentStyle: Object,
    inputStyle: Object,
  },
  setup(props) {
    const { dispatch, commit } = useStore();
    const { searchInput } = toRefs(props);

    const input = ref('');

    function searchRecipe() {
      if (searchInput.value.trim() !== '') {
        commit('search/setSearchName', searchInput.value);
        dispatch('search/fetchSearchMeals', { name: searchInput.value });
      }
      // router.push({ name: 'ExploreSearch', params: { type: searchInput.value, page: 1 } });
    }

    return { searchRecipe, input };
  },

};
</script>

<style>
</style>
