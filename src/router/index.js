import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import ProductManager  from '../views/ProductManager.vue'

const routes = [
{ path: '/', name: 'Home', component: Home },
{path: '/produtos', name: 'ProductManager', component: ProductManager },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router