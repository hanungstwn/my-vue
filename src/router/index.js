import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/HomeView.vue";
import FormView from "../views/FormView.vue";
import FormDialog from "../components/FormDialog.vue";
import CekData from "../components/CustomerDataCard.vue"
import LayoutMaster from "../LayoutMaster.vue";
import Login from "../views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";

Vue.use(VueRouter);

// Middleware untuk memeriksa login
const requireAuth = (to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("token"); // Ganti ini dengan cara memeriksa apakah pengguna telah login sesuai implementasi Anda
  if (isAuthenticated) {
    next();
  } else {
    next("/login");
  }
};

const routes = [
  {
    path: "/",
    name: "login",
    redirect: "/login",
  },
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // },
  // {
  //   path: "/dashboard",
  //   name: "dashboard",
  //   component: Dashboard,
  //   beforeEnter: requireAuth,
  // },
  // {
  //   path: "/orders/:id/details",
  //   name: "FormView",
  //   component: FormView,
  //   beforeEnter: requireAuth,
  // },
  {
    path: "/dashboard",
    name: "dashboard",
    component: LayoutMaster,
    beforeEnter: requireAuth,
    children: [
      {
        path: "/",
        name: "dashboard",
        component: Dashboard,
      },
      {
        path: "/orders/:id",
        name: "FormView",
        component: FormView,
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "RegisterView",
    component: RegisterView,
  },
  // {
  //   path: '/orders/:id/details',
  //   name: 'Form',
  //   component: FormDialog
  // },
  // {
  //   path: "/form-dialog/:userId",
  //   name: "form-dialog",
  //   component: FormDialog,
  //   props: true // Pass route params as props
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
