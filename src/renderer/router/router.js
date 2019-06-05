import Vue from 'vue'
import Router from 'vue-router'
import AddChart from '@/views/AddChart'
import Dashboard from '@/views/Dashboard'
import ChartDetails from '@/views/ChartDetails'
import NotFound from '@/views/NotFound'
Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: Dashboard }, // No props, no nothing
    { path: '/add', component: AddChart }, // No props, no nothing
    { path: '/chart/:id/:type', component: ChartDetails, name: 'chart' },
    { path: '/404', component: NotFound },
    { path: '*', redirect: '/404' }
  ]
})
