import Vue from "vue";
import Router from "vue-router";
import Home from "../components/Home.vue";
Vue.use(Router);

let router = new Router({
    routes: [
      {
        path: "/", name:"Home", component: Home
      },

    ],
    mode: "history",
  });

export default router;