import Vue from 'vue'
import App from './App'

import VueRouter from 'vue-router'
Vue.use(VueRouter)
import Index from './pages/Index'
import Details from './pages/Details'
import NewsDetails from './pages/NewsDetails'
import newsList from './pages/newsList'
import List from './pages/List'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false
new Vue({
  el: '#app',
  render: h => h(App),
  router: new VueRouter({
    routes: [
      {        
        path: '/',
        component: Index
      },
      {
        path: '/Details',
        component: Details
      },
      {
        path: '/NewsDetails',
        component: NewsDetails
      },
      {
        path: '/newsList',
        component: newsList
      },
      {
        path: '/List',
        component: List
      }
    ]
  }),
  template: '<App/>'
}).$mount('#app')
