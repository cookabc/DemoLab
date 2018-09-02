import Vue from 'vue'
import Router from 'vue-router'
// import store from '@/store'

import Dashboard from '@/pages/Dashboard'
import CargoItem from '@/pages/CargoItem'
import CargoSuite from '@/pages/CargoSuite'
import ItemStorage from '@/pages/ItemStorage'
import SuiteStorage from '@/pages/SuiteStorage'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
    },
    {
      path: '/cargo-item',
      name: 'CargoItem',
      component: CargoItem,
    },
    {
      path: '/cargo-suite',
      name: 'CargoSuite',
      component: CargoSuite,
    },
    {
      path: '/item-storage',
      name: 'ItemStorage',
      component: ItemStorage,
    },
    {
      path: '/suite-storage',
      name: 'SuiteStorage',
      component: SuiteStorage,
    },
  ],
})

// router.beforeEach((to, from, next) => {
//   if (to.name === 'Main') {
//     next()
//   } else if (store.state.roles.includes(to.name)) {
//     next()
//   } else {
//     next('/')
//   }
// })

export default router
