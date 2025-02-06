<template>
  <div>
    <ListaProductos :searchQuery="searchQuery" />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useProductStore } from '@/stores/datosStore';  
import ListaProductos from '@/components/ListaProductos.vue';

const route = useRoute();
const productStore = useProductStore();

// Aseguramos que searchQuery sea siempre un string
const searchQuery = (Array.isArray(route.query.search) ? route.query.search[0] : route.query.search) || '';

// Llamamos a la función de buscar productos cuando cambia la búsqueda
if (searchQuery) {
  productStore.buscarProductos(searchQuery);
}
</script>
