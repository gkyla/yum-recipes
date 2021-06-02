import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/favorite',
    name: 'Favorite',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Favorite.vue'),
  },
  {
    path: '/explore',
    name: 'Explore',
    component: () => import('../views/explore/Explore.vue'),
    children: [
      {
        path: 'list',
        component: () => import('../views/explore/ExploreAll.vue'),
      },
      {
        name: 'Categories',
        path: 'categories/:type/:page',
        component: () => import('../views/explore/Categories.vue'),
      },
      {
        path: 'ingredients/:type/:page',
        component: () => import('../views/explore/Ingredients.vue'),
      },
      {
        path: 'areas/:type/:page',
        component: () => import('../views/explore/Areas.vue'),
      },
      {
        name: 'ExploreSearch',
        path: 'search/:type/:page',
        component: () => import('../views/explore/Search.vue'),
      },
      {
        path: 'first-letter/:type/:page',
        component: () => import('../views/explore/FirstLetter.vue'),
      },
    ],
  },
  {
    path: '/details/:id',
    name: 'Detail',
    component: () => import(/* webpackChunkName: "details" */ '../views/Detail.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
