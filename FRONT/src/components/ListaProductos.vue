<template>
    <div id="page-container">
        <Header />
        <main>
            <!-- Contenedor de resultados de búsqueda -->
            <section v-if="resultados.length > 0" class="search-results">
                <h2>
                    Resultados de búsqueda de
                    <span v-if="SearchQuery">{{ `"${SearchQuery}"` }}</span>
                    <span v-else>Todas las categorías</span>: {{ resultados.length }}
                </h2>

                <div class="category-filters">
                    <!-- Botón para ver todos los productos -->
                    <button @click="filtrarPorCategoria(null)" :class="{ active: !categoriaSeleccionada }">
                        Ver Todos ({{ resultados.length }})
                    </button>
                </div>

                <!-- Botones de selección de categorías con iconos dinámicos -->
                <div class="radio-inputs">
                    <label v-for="(count, category) in categoryCounts" :key="category">
                        <input class="radio-input" type="radio" name="category" :value="category"
                            v-model="categoriaSeleccionada" @change="filtrarPorCategoria(category)">
                        <span class="radio-tile">
                            <span class="radio-icon">
                                <img :src="getIcon(category)" :alt="category" width="40" height="40" />
                            </span>

                            <span class="radio-label">{{ category }} ({{ count }})</span>
                        </span>
                    </label>
                </div>
            </section>

            <section>
                <!-- Mensaje si no hay productos -->
                <div v-if="resultados.length === 0 && !cargando">
                    <p>No se encontraron productos.</p>
                </div>

                <!-- Lista de productos -->
                <div v-else-if="!cargando">
                    <article v-for="producto in resultadosFiltrados" :key="producto.id" class="producto"
                        @click="verDetalles(producto.id)">
                        <img :src="producto.thumbnail" alt="Imagen del producto" />
                        <div class="info">
                            <h3>{{ producto.title }}</h3>
                            <p id="precios">
                                <strong>Precio:</strong>
                                <span v-if="producto.discountPercentage > 0"
                                    style="text-decoration:line-through; color:red">
                                    ${{ producto.price }}$
                                </span>
                                <span id="precio">
                                    {{ producto.discountPercentage > 0 ?
                                        Math.round(producto.price * (1 - producto.discountPercentage / 100)) :
                                        producto.price }}$
                                </span>
                            </p>
                            <p><strong>Categoría:</strong> {{ producto.category }}</p>
                            <p class="rating">
                                <strong>Calificación:</strong>
                                {{ producto.rating }}
                            </p>
                        </div>
                    </article>
                </div>

                <!-- Indicador de carga -->
                <div v-else>
                    <p>Cargando...</p>
                </div>
            </section>
        </main>
        <Foot />
    </div>
</template>

<script setup lang="ts">
import Foot from '@/components/Foot.vue';
import Header from './Header.vue';
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useProductStore } from '@/stores/datosStore';

const productStore = useProductStore();
const router = useRouter();

// Hacer que `SearchQuery` sea reactivo a los cambios en la store
const SearchQuery = computed(() => productStore.searchQuery);

// Estado para la categoría seleccionada
const categoriaSeleccionada = ref<string | null>(null);

// Computed: Obtiene la cantidad de productos por categoría
const categoryCounts = computed(() => {
    return resultados.value.reduce((acc: Record<string, number>, producto) => {
        acc[producto.category] = (acc[producto.category] || 0) + 1;
        return acc;
    }, {});
});

// Computed: Filtra los productos por la categoría seleccionada
const resultados = computed(() => productStore.resultados);
const cargando = computed(() => productStore.cargando);
const resultadosFiltrados = computed(() => {
    return categoriaSeleccionada.value
        ? resultados.value.filter(producto => producto.category === categoriaSeleccionada.value)
        : resultados.value;
});

// Función para filtrar por categoría
const filtrarPorCategoria = (categoria: string | null) => {
    categoriaSeleccionada.value = categoria;
};

// Función para navegar a la vista de detalles del producto
const verDetalles = (id: number) => {
    router.push({ name: 'detalles', params: { id } });
};

const iconos: Record<string, string> = {
    "vehicle": "/icons/vehiculo.svg",
    "womens-watches": "/icons/reloj.svg",
    "furniture": "/icons/furniture.svg",
    "motorcycle": "/icons/moto.svg",
    "mens-watches": "/icons/reloj.svg",
    "laptops": "/icons/laptop.svg",
    "smartphones": "/icons/smartphone.svg"
};


// Función para obtener el ícono de la categoría
const getIcon = (category: string) => {
    console.log(category);
    return iconos[category];
};

</script>


<style scoped>
.category-filters button {
    background-color: antiquewhite;
    padding: 5px;
    border-radius: 1em;
    margin-bottom: 5px;
}
#page-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}



/* Header */
header {
    height: 10vh;
    display: flex;
    align-items: center;
    background-color: antiquewhite;
    padding: 10px 15px;
    gap: 10px;
}

/* Products */
.producto {
    display: flex;
    align-items: center;
    border: 1px solid #ddd;
    border-radius: 12px;
    padding: 12px;
    margin: 8px;
    width: 90%;
    max-width: 500px;
    background-color: white;
    box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease-in-out;
    gap: 15px;
}

.producto:hover {
    transform: scale(1.03);
}

.producto img {
    width: 130px;
    height: 130px;
    object-fit: cover;
    border-radius: 10px;
    flex-shrink: 0;
    border: 2px solid #ccc;
}

.producto .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    text-align: left;
    gap: 5px;
}

.producto h3 {
    font-size: 18px;
    font-weight: bold;
    color: #333;
    margin: 2px 0;
}

.producto p {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    margin: 2px 0;
    font-size: 15px;
    line-height: 1.4;
}

.producto strong {
    color: #222;
    font-weight: bold;
}

#precio {
    text-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
    font-weight: bold;
}

#precios {
    font-size: 1.5em;
}

/* Section Styling */
section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    padding: 10px;
}



/* aaaaaaaaaaa */
/* From Uiverse.io by Yaya12085 */
.radio-inputs {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 300px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    flex-wrap: wrap;
}

.radio-inputs>* {
    margin: 6px;
}

.radio-input:checked+.radio-tile {
    border-color: #2260ff;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    color: #2260ff;
}

.radio-input:checked+.radio-tile:before {
    transform: scale(1);
    opacity: 1;
    background-color: #2260ff;
    border-color: #2260ff;
}

.radio-input:checked+.radio-tile .radio-icon svg {
    fill: #2260ff;
}

.radio-input:checked+.radio-tile .radio-label {
    color: #2260ff;
}

.radio-input:focus+.radio-tile {
    border-color: #2260ff;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1), 0 0 0 4px #b5c9fc;
}

.radio-input:focus+.radio-tile:before {
    transform: scale(1);
    opacity: 1;
}

.radio-tile {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 80px;
    min-height: 80px;
    border-radius: 0.5rem;
    border: 2px solid #b5bfd9;
    background-color: #fff;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    transition: 0.15s ease;
    cursor: pointer;
    position: relative;
}

.radio-tile:before {
    content: "";
    position: absolute;
    display: block;
    width: 0.75rem;
    height: 0.75rem;
    border: 2px solid #b5bfd9;
    background-color: #fff;
    border-radius: 50%;
    top: 0.25rem;
    left: 0.25rem;
    opacity: 0;
    transform: scale(0);
    transition: 0.25s ease;
}

.radio-tile:hover {
    border-color: #2260ff;
}

.radio-tile:hover:before {
    transform: scale(1);
    opacity: 1;
}

.radio-icon svg {
    width: 2rem;
    height: 2rem;
    fill: #494949;
}

.radio-label {
    color: #707070;
    transition: 0.375s ease;
    text-align: center;
    font-size: 13px;
}

.radio-input {
    clip: rect(0 0 0 0);
    -webkit-clip-path: inset(100%);
    clip-path: inset(100%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
}
</style>
