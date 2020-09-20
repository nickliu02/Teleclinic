import Vue from "vue";
import Router from "vue-router";
import Home from "../components/Home.vue";
import Calendar from "../Pages/Calendar.vue";
import Queue from "../Pages/Queue.vue";
import Personal_Info from "../Pages/Personal Info.vue";
import Login from "../Pages/Login.vue";
import Register from "../Pages/Register.vue";
import DoctorQueue from "../Pages/DoctorQueue.vue";

Vue.use(Router);

let router = new Router({
    routes: [
      {
        path: "/", name:"Home", component: Home, meta:{
          auth:true
        }
      },

      {
        path: "/appointments", name:"Appointments", component: Calendar, meta:{
          auth:true
        }
      },

      {
        path: "/queue", name:"Queue", component: Queue, meta:{
          auth:true
        }
      },

      {
        path: "/personal_info", name:"Personal Info", component: Personal_Info, meta:{
          auth:true
        }
      },

      {
        path: "/login", name:"Login", component: Login, meta:{
          guest:true
        }
      },

      {
        path: "/register", name:"Register", component: Register, meta:{
          guest:true
        }
      },

      {
        path: "/doctor_queue", name:"DoctorQueue", component: DoctorQueue, meta:{
          doctor:true, auth:true
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
      next({name: 'Queue'})
    }
  }
  else if(to.matched.some(record => record.meta.isDoctor)) {
    if(localStorage.getItem('jwt') == null){
      next()
    }
    else{
      next({name: 'Appointments'})
    }
  }
  else{
    next()
  }
})
export default router;
