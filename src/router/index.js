import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import ProductManager  from '../views/ProductManager.vue'
import OrderManager from '../views/OrderManager.vue'

const routes = [
{ path: '/', name: 'Home', component: Home },
{path: '/produtos', name: 'ProductManager', component: ProductManager },
{path: '/pedidos', name: 'OrderManager', component: OrderManager },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router