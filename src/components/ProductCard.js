// src/components/ProductCard.js - FINAL

import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../css/ProductCard.css'; 

const ProductCard = ({ product }) => {
    return (
        <Card 
            className='my-3 product-card product-card-hover-effect' 
        > 
            <Link to={`/products/${product._id}`} style={{ textDecoration: 'none' }}>
                {/* 🔑 CONTENEDOR PRINCIPAL: El marco de póster */}
                <div className="product-poster-frame"> 
                    
                    {/* Contenedor de la Imagen para el Overlay */}
                    <div className="image-overlay-container">
                        <Card.Img 
                            src={product.image} 
                            variant='top' 
                            className="card-image" 
                        />

                        {/* 🔑 EL OVERLAY CON EL NOMBRE (SOLO VISIBLE AL HOVER) */}
                        <div className="product-overlay">
                            <div className="product-title-overlay">
                                {product.name}
                            </div>
                        </div>
                    </div>

                </div> {/* Fin de product-poster-frame */}

                {/* 🔑 ELIMINAMOS POR COMPLETO Card.Body, el nombre y el precio visibles. */}
                
            </Link>
        </Card>
    );
};

export default ProductCard;