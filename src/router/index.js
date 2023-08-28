import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import OrderDetail from '../views/FormView.vue'
import FormView from '../views/FormView.vue'
import FormDialog  from '../components/FormDialog.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // },
  {
    path: '/orders/:id/details',
    name: 'OrderDetail',
    component: OrderDetail
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
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
