import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import GamesIndex from "../views/GamesIndex.vue";
import GamesNew from "../views/GamesNew.vue";
import FieldsNew from "../views/FieldsNew.vue";
import PlayerGamesIndex from "../views/PlayerGamesIndex.vue";
import GamesShow from "../views/GamesShow.vue";
import About from "../views/About.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";

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
    component: About,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () =>
    //   import(/* webpackChunkName: "about" */ "../views/About.vue"),
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
  {
    path: "/fields/new",
    name: "fields-new",
    component: FieldsNew,
  },
  {
    path: "/player_games",
    name: "player-games-index",
    component: PlayerGamesIndex,
  },
  {
    path: "/games/:id",
    name: "/games-show",
    component: GamesShow,
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/logout",
    name: "logout",
    component: Logout,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
