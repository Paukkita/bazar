<template>
    <header>
        <!-- Logo con función de retroceso -->
        <div id="logo" @click="volverAtras">
            <img src="/carro-deportivo.png" alt="logo de la pagina">
        </div>

        <!-- Botón de búsqueda -->
        <div class="searchBox">
            <input class="searchInput" v-model="searchQuery" type="text" placeholder="Laptops, Smartphones, Tablets">
            <button class="searchButton" @click="goToSearch">
                <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none">
                    <g clip-path="url(#clip0_2_17)">
                        <g filter="url(#filter0_d_2_17)">
                            <path d="M23.7953 23.9182L19.0585 19.1814M19.0585 19.1814C19.8188 18.4211 20.4219 17.5185 20.8333 16.5251C21.2448 15.5318 21.4566 14.4671 21.4566 13.3919C21.4566 12.3167 21.2448 11.252 20.8333 10.2587C20.4219 9.2653 19.8188 8.36271 19.0585 7.60242C18.2982 6.84214 17.3956 6.23905 16.4022 5.82759C15.4089 5.41612 14.3442 5.20435 13.269 5.20435C12.1938 5.20435 11.1291 5.41612 10.1358 5.82759C9.1424 6.23905 8.23981 6.84214 7.47953 7.60242C5.94407 9.13789 5.08145 11.2204 5.08145 13.3919C5.08145 15.5634 5.94407 17.6459 7.47953 19.1814C9.01499 20.7168 11.0975 21.5794 13.269 21.5794C15.4405 21.5794 17.523 20.7168 19.0585 19.1814Z"
                                stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
                                shape-rendering="crispEdges"></path>
                        </g>
                    </g>
                    <defs>
                        <clipPath id="clip0_2_17">
                            <rect width="28.0702" height="28.0702" fill="white"
                                transform="translate(0.403503 0.526367)"></rect>
                        </clipPath>
                    </defs>
                </svg>
            </button>
        </div>
        <div id="carrito" >
            <img src="/carrito.png" alt="carrito">
        </div>
    </header>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useProductStore } from '@/stores/datosStore'; 

const router = useRouter();
const searchQuery = ref('');
const productStore = useProductStore(); 

const volverAtras = () => {
    if (window.history.length > 1) {
        router.back();
    } else {
        router.push('/');
    }
};

const goToSearch = () => {
    productStore.buscarProductos(searchQuery.value); 
};
</script>


<style scoped>

#carrito,#logo{
    width: 100px;
    height: 50px;
}

#carrito img,#logo img{
    width: 100%;
    height:100%;
    background-color: antiquewhite;
    border-radius: 50%;
    object-position: middle;
}
#logo{
    padding-top: 5px;
}
#logo img{
    background-color: transparent;
    width: 40px;
    height: 40px;
    border-radius: 0px;
    object-position: bottom
}



/* Search Box */
.searchBox {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    background: #2f3640;
    border-radius: 50px;
    position: relative;
    max-width: 300px;
    padding: 5px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    width: 70%;
    height: 50px;
}

.searchInput {
    border: none;
    background: none;
    outline: none;
    color: white;
    font-size: 15px;
    padding: 24px 46px 24px 26px;
    flex: 1;
    border-radius: 20px;
}

.searchButton {
    position: absolute;
    right: 8px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--gradient-2, linear-gradient(90deg, antiquewhite 0%, rgb(255, 172, 63) 100%));
    border: 0;
    color: white;
    display: inline-block;
}
</style>