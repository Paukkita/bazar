<template>
    <Header />
    <main>
        <div v-if="cargando" class="loading">
            <p>Cargando detalles del producto...</p>
        </div>

        <div v-else-if="producto" class="detalle-container">
            <!-- Nombre del producto -->
            <h2 class="producto-titulo">{{ producto.title }}</h2>

            <!-- Sección de imágenes -->
            <div class="imagenes-container">
                <img :src="producto.thumbnail" :alt="producto.title" class="thumbnail" />

                <div class="imagenes-secundarias">
                    <img v-for="(img, index) in producto.images.slice(1, 4)" :key="index" :src="img" :alt="producto.title" />
                </div>
            </div>

            <!-- Información principal -->
            <div class="info">
                <p class="precio"><strong>Precio:</strong> {{ producto.price }}$</p>
                <p class="rating">
                    <strong>Calificación:</strong> 
                    {{ producto.rating }}
                </p>
            </div>

            <!-- Descripción -->
            <p class="descripcion">{{ producto.description }}</p>

            <!-- Botón de comprar -->
            <button @click="comprar" class="boton-comprar">Comprar Ahora</button>
        </div>

        <div v-else class="error">
            <p>Producto no encontrado.</p>
        </div>
    </main>
    <div>
        <foot />
    </div>
    
</template>

<script setup lang="ts">
import { useToast } from "vue-toastification";
import Header from "./Header.vue";
import foot from "./foot.vue";  

const toast = useToast();
const props = defineProps<{ producto: any; cargando: boolean }>();


const comprar = () => {
    toast.success("Producto añadido al carrito.", { timeout: 4000 });
};
</script>

<style scoped>

/* Contenedor principal */
.detalle-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 800px;
    height: 100%;
    margin: auto;
    padding: 20px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
}

/* Nombre del producto */
.producto-titulo {
    font-size: 28px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 20px;
}

/* Contenedor de imágenes */
.imagenes-container {
    display: flex;
    gap: 15px;
    width: 100%;
    max-width: 600px;
}

/* Imagen principal (Thumbnail) */
.thumbnail {
    width: 70%;
    height: auto;
    border-radius: 10px;
    object-fit: cover;
}

/* Imágenes secundarias en columna */
.imagenes-secundarias {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 30%;
}

.imagenes-secundarias img {
    width: 100%;
    height: 60px;
    object-fit: cover;
    border-radius: 8px;
    transition: transform 0.3s ease-in-out;
}

.imagenes-secundarias img:hover {
    transform: scale(1.05);
}

/* Precio y calificación */
.info {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 600px;
    margin: 15px 0;
    font-size: 18px;
}

.precio {
    font-size: 16px;
    font-weight: bold;
    color: #27ae60;
}

.rating {
    font-size: 18px;
    color: #f39c12;
}

/* Descripción */
.descripcion {
    text-align: center;
    font-size: 16px;
    color: #555;
    margin-bottom: 20px;
}

/* Botón de Comprar */
.boton-comprar {
    width: 60%;
    padding: 15px;
    font-size: 20px;
    font-weight: bold;
    background: antiquewhite;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.3s ease-in-out;
}

.boton-comprar:hover {
    background: green;
}

/* Estilos para carga y error */
.loading,
.error {
    text-align: center;
    font-size: 18px;
    margin-top: 50px;
}
</style>
