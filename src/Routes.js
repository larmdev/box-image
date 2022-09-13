import Vue from 'vue';
import Router from 'vue-router';

import Layout from '@/components/Layout/Layout';

// Pages
import Dashboard from '@/pages/Dashboard/Dashboard';
import Error from "@/pages/Error/Error";
import Login from "@/pages/Login/Login";

Vue.use(Router);

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    redirect: 'login',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard,
      },
    ],
  },
  {
    path: '*',
    name: 'Error',
    component: Error
  }
]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('token');
  if (to.name !== 'Login' && !loggedIn) next({ name: 'Login' })
  if (to.name === 'Login' && loggedIn) next({ name: 'Dashboard' })
  else next()
})


export default router

