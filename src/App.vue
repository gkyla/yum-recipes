<template>
  <the-navbar></the-navbar>
  <router-view />
  <Footer />
</template>

<script>
import TheNavbar from '@/components/TheNavbar.vue';
import Footer from '@/components/Footer.vue';

export default {
  components: {
    TheNavbar,
    Footer,
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;500&display=swap");
// @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&family=Mulish:wght@400;500;600&display=swap");
// @import url("https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;500&display=swap");

/* Font
  Montserrat as paragraph ,
  Mulish for heading

  font-family: 'Montserrat', sans-serif;
  font-family: 'Mulish', sans-serif;
  font-family: "Fira Sans", sans-serif;

*/

#app {
  // font-family: "Mulish", sans-serif;
  width: 100%;
  min-height: 100vh;
  font-family: "Fira Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex !important;
  flex-direction: column !important;
}

body,
html {
  min-height: 100vh !important;
}

body {
  background-color: #fbf8f8 !important;
}

*::-webkit-scrollbar {
  width: 11px;
}
*::-webkit-scrollbar-track {
  background: rgb(214, 214, 214);
}
*::-webkit-scrollbar-thumb {
  background-color: gray;
}

#navbarNav {
  a {
    border-radius: 5px;
    color: #2c3e50;
    margin-right: 10px;

    &.router-link-exact-active {
      background-color: #ffd369;
    }
  }
}

@media (min-width: 992px) {
  #navbarNav {
    a {
      margin-right: 0;
    }
  }
}
</style>
