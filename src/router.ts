import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Main.vue'
import MovieList from './views/MovieList.vue'
import BoardList from './views/BoardList.vue'
import Reserve from './views/Reserve.vue'
import ReserveList from './views/ReserveList.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/movie',
      component: MovieList
    },
    {
      path: '/board/:id',
      component: BoardList
    },
    {
      path: '/reserve',
      component: Reserve
    },
    {
      path: '/reserve/:title',
      component: Reserve
    },
    {
      path: '/ticket',
      component: ReserveList
    }
  ]
})
