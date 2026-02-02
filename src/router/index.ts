
import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Gallery from '../views/Gallery.vue'
import ImportView from '../views/ImportView.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Dashboard },
    { path: '/gallery', component: Gallery },
    { path: '/import', component: ImportView}
  ],
})
