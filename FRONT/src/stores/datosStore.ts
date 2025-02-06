import { ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useProductStore = defineStore('product', () => {
  const arrayProductos = ref<any[]>([]); // Almacenar todos los productos
  const resultados = ref<any[]>([]); // Almacenar los resultados de la búsqueda
  const detallesProducto = ref<any | null>(null); // Almacenar el detalle de un producto
  const cargando = ref<boolean>(false); // Indicador de carga
  const error = ref<string | null>(null); // Manejo de errores
  const searchQuery = ref<string>(''); // Agregar la propiedad searchQuery

  // Función para buscar productos
  const buscarProductos = async (query: string) => {
    cargando.value = true;
    error.value = null; // Limpiar errores anteriores
    searchQuery.value = query; // Guardar la consulta de búsqueda

    try {
      const response = await axios.get(`http://localhost:3001/api/items?q=${query}`);
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
    error.value = null; // Limpiar errores anteriores

    try {
      const response = await axios.get(`http://localhost:3001/api/items/${id}`);
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
    error.value = null; // Limpiar errores anteriores

    try {
      const response = await axios.get('http://localhost:3001/api/items');
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
