import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ProductosView from '../views/ProductosView.vue';
import DetallesView from '../views/DetallesView.vue';

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/items', name: 'productos', component: ProductosView },
  { path: '/items/:id', name: 'detalles', component: DetallesView }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
