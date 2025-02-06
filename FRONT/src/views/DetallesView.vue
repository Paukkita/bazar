<!-- views/detallesView.vue -->
<template>
    <DetallesProducto :producto="producto" :cargando="cargando" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useProductStore } from '@/stores/datosStore';
import DetallesProducto from '@/components/Detalles.vue';

const route = useRoute();
const productStore = useProductStore();
const producto = ref<any | null>(null);
const cargando = ref<boolean>(true);

const obtenerDetalles = async () => {
    const productId = Number(route.params.id);
    if (!isNaN(productId)) {
        await productStore.obtenerDetallesProducto(productId);
        producto.value = productStore.detallesProducto;
    }
    cargando.value = false;
};

onMounted(obtenerDetalles);
</script>
