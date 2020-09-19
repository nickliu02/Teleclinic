import Vue from "vue";
import Router from "vue-router";
import Home from "../components/Home.vue";
import Calendar from "../Pages/Calendar.vue";
import Queue from "../Pages/Queue.vue";
import Personal_Info from "../Pages/Personal Info.vue";
import Login from "../Pages/Login.vue";
import Register from "../Pages/Register.vue";

Vue.use(Router);

let router = new Router({
    routes: [
      {
        path: "/", name:"Home", component: Home, meta:{
          auth:false
        }
      },

      {
        path: "/appointments", name:"Appointments", component: Calendar, meta:{
          auth:false
        }
      },

      {
        path: "/queue", name:"Queue", component: Queue, meta:{
          auth:false
        }
      },

      {
        path: "/personal_info", name:"Personal Info", component: Personal_Info, meta:{
          auth:false
        }
      },

      {
        path: "/login", name:"Login", component: Login, meta:{
          auth:true
        }
      },

      {
        path: "/register", name:"Register", component: Register, meta:{
          auth:true
        }
      },


    ],
    mode: "history",
  });

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.auth)){
    if (localStorage.getItem('jwt') == null){
      console.log(to.fullPath)
      localStorage.setItem('nextUrl',to.fullPath)
      next({
        path: '/login',
      })
    }
    else{
      next()
    }
  }
  else if(to.matched.some(record => record.meta.guest)){
    if(localStorage.getItem('jwt') == null){
      next()
    }
    else{
      next({name: 'Play'})
    }
  }
  else{
    next()
  }
})
export default router;
