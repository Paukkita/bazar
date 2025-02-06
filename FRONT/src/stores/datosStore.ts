import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import API_BASE_URL from '@/config'; // Importamos la URL de la API

export const useProductStore = defineStore('product', () => {
  const arrayProductos = ref<any[]>([]);
  const resultados = ref<any[]>([]);
  const detallesProducto = ref<any | null>(null);
  const cargando = ref<boolean>(false);
  const error = ref<string | null>(null);
  const searchQuery = ref<string>('');

  // Función para buscar productos
  const buscarProductos = async (query: string) => {
    cargando.value = true;
    error.value = null;
    searchQuery.value = query;

    try {
      const response = await axios.get(`${API_BASE_URL}/items?q=${query}`);
      console.log("Respuesta API:", response.data);
      resultados.value = response.data.results;
    } catch (err) {
      error.value = (err as Error).message || 'Error al buscar productos';
    } finally {
      cargando.value = false;
    }
  };

  // Función para obtener detalles de un producto
  const obtenerDetallesProducto = async (id: number) => {
    cargando.value = true;
    error.value = null;

    try {
      const response = await axios.get(`${API_BASE_URL}/items/${id}`);
      detallesProducto.value = response.data;
    } catch (err) {
      error.value = (err as Error).message || 'Error al obtener detalles del producto';
    } finally {
      cargando.value = false;
    }
  };

  // Función para obtener todos los productos
  const fetchProductos = async () => {
    cargando.value = true;
    error.value = null;

    try {
      const response = await axios.get(`${API_BASE_URL}/items`);
      arrayProductos.value = response.data.results;
    } catch (err) {
      error.value = (err as Error).message || 'Error al obtener los productos';
    } finally {
      cargando.value = false;
    }
  };

  return {
    arrayProductos,
    resultados,
    detallesProducto,
    cargando,
    error,
    searchQuery,
    buscarProductos,
    obtenerDetallesProducto,
    fetchProductos
  };
});
