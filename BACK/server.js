const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3001;

app.use(cors());

// Cargar los productos desde el archivo JSON
const productsData = JSON.parse(fs.readFileSync('./products.json', 'utf-8')).products;

// Endpoint para buscar productos por query
app.get('/api/items', (req, res) => {
    const searchQuery = req.query.q ? req.query.q.toLowerCase() : '';

    if (!searchQuery) {
        return res.json({ results: productsData, total: productsData.length });
    }

    const results = productsData.filter(product =>
        product.title.toLowerCase().includes(searchQuery) ||
        product.description.toLowerCase().includes(searchQuery) ||
        product.category.toLowerCase().includes(searchQuery)
    );

    res.json({ results, total: results.length });
});

// Endpoint para obtener detalles de un producto por ID
app.get('/api/items/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = productsData.find(p => p.id === productId);

    if (!product) {
        return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json(product);
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
