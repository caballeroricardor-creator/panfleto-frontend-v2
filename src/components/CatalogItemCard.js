// src/components/CatalogItemCard.js

import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../css/CatalogItemCard.css'; // 🔑 Nuevo archivo CSS

const CatalogItemCard = ({ product }) => {
    
    // Formateo del precio para visibilidad
    const formattedPrice = (product.price / 100).toFixed(2); 

    return (
        // 🔑 Clase para el estilo de la tarjeta de Catálogo
        <Card className='my-3 catalog-item-card'> 
            <Link to={`/products/${product._id}`} style={{ textDecoration: 'none' }}>
                
                {/* 🔑 Marco del Póster Cuadrado */}
                <div className="catalog-poster-frame"> 
                    <Card.Img 
                        src={product.image} 
                        variant='top' 
                        className="catalog-card-image" 
                    />
                </div>

                {/* 🔑 Card.Body para el Nombre y Precio VISIBLES */}
                <Card.Body className="catalog-card-body">
                    <Card.Title 
                        as='div' 
                        className='catalog-card-title'
                    >
                        {product.name} 
                    </Card.Title>
                    <Card.Text 
                        as="h3" 
                        className='catalog-card-price'
                    >
                        ${formattedPrice} MXN
                    </Card.Text>
                </Card.Body>
            </Link>
        </Card>
    );
};

export default CatalogItemCard;