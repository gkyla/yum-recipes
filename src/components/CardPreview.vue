<template>
  <div
    v-if="meal"
    class="card position-relative shadow radius-10 overflow-hidden"
  >
    <img
      v-if="meal.strMealThumb"
      :src="meal.strMealThumb"
      class="card-img-top"
    />
    <img v-else src="@/assets/logo.png" class="card-img-top" />
    <div
      class="card-body text-start position-absolute start-0 bottom-0 p-2 p-md-3 bg-white end-0 shadow-sm rounded-card-body card-border"
    >
      <router-link
        :to="{ name: 'Detail', params: { id: meal.idMeal } }"
        class="text-decoration-none text-secondary fs-4 card-title d-block"
      >
        <p class="text-truncate m-0">{{ meal.strMeal }}</p>
      </router-link>
      <div v-if="meal.strTags" class="text-truncate">
        <p
          class="card-text text-truncate-2line d-none d-md-block"
          v-if="options && options.instructions"
        >
          {{ meal.strInstructions }}
        </p>
        <span
          v-for="tag in meal.strTags"
          :key="tag"
          class="p-1 bg-secondary tags-fontsize text-white me-2 rounded-2 my-2"
        >
          {{ tag }}
        </span>
      </div>
      <div v-if="!meal.strTags">
        <span
          class="p-1 bg-secondary tags-fontsize text-white me-2 rounded-2 my-4"
          >no tags</span
        >
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    meal: {
      /* validation deleted because
      on the first rendering props detect it as undefined rather than Object
      */
      /* Type : Object */
      required: true,
    },
    options: {
      type: Object,
    },
  },
  setup(props) {
    /* Buat tag agar cuman 3 bisa nya kalo di home, kalo di detail munculin semua */

    return {
    //   handleImage,
    };
  },
};
</script>

<style>
.radius-10 {
  border-radius: 10px !important;
}

.radius-5 {
  border-radius: 5px;
}

.rounded-card-body {
  border-radius: 7px 7px 0 0;
}

.tags-fontsize {
  font-size: 0.8em;
}

.card-border {
  /* border-bottom: 4px solid #4098a3; */
  border-bottom: 5px solid #ffd369;
}

.text-truncate-2line {
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
</style>
