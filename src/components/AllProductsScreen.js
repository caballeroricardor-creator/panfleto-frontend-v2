// src/components/AllProductsScreen.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap'; 

// 🔑 CAMBIO CLAVE: Importamos el nuevo componente
import CatalogItemCard from './CatalogItemCard'; 

const AllProductsScreen = () => {
    // ... (Toda la lógica de fetch se mantiene) ...

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('/products');
                setProducts(data);
                setLoading(false);
            } catch (err) {
                setError('Error al cargar los productos. Por favor, intente de nuevo más tarde.');
                setLoading(false);
                console.error(err);
            }
        };
        fetchProducts();
    }, []);

    if (loading) {
        return <h2 className="text-center py-5">Cargando catálogo...</h2>;
    }

    if (error) {
        return <h2 className="text-center py-5" style={{ color: 'red' }}>{error}</h2>;
    }

    return (
        <Row>
            {products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    {/* 🔑 CAMBIO CLAVE: Usamos el nuevo componente del Catálogo */}
                    <CatalogItemCard product={product} /> 
                </Col>
            ))}
        </Row>
    );
};

export default AllProductsScreen;