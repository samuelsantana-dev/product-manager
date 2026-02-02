
import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/modules/Dashboard/pages/Dashboard.vue'
import Gallery from '@/modules/gallery/pages/Gallery.vue'
import ImportView from '@/modules/Files/pages/ImportView.vue'
export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Dashboard },
    { path: '/gallery', component: Gallery },
    { path: '/import', component: ImportView}
  ],
})
