import Vue from "vue";
import Router from "vue-router";
import Home from "../components/Home.vue";
import Calendar from "../Pages/Calendar.vue";
Vue.use(Router);

let router = new Router({
    routes: [
      {
        path: "/", name:"Home", component: Home
      },
      {
        path: "/appointments", name:"Appointments", component:Calendar
      },

    ],
    mode: "history",
  });

export default router;
