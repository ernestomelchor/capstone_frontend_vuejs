import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import GamesIndex from "../views/GamesIndex.vue";
import GamesNew from "../views/GamesNew.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/games",
    name: "games-index",
    component: GamesIndex,
  },
  {
    path: "/games/new",
    name: "games-new",
    component: GamesNew,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
