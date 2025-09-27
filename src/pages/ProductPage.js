// src/pages/ProductPage.js

import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import { CartContext } from '../context/CartContext'; 

// Definimos los colores de tu marca para usarlos fácilmente
const COLORS = {
    panfletoYellow: '#F1CD3A',
    panfletoBlack: '#171717',
    white: '#FFFFFF',
};

// Estilos personalizados
const styles = {
    // ... (El resto de estilos no se modifican)
    title: {
        color: COLORS.panfletoBlack,
        paddingBottom: '10px',
        borderBottom: `2px solid ${COLORS.panfletoYellow}`, 
        marginBottom: '15px',
        fontSize: '2rem', 
        fontWeight: 'bold',
    },
    addToCartButton: {
        backgroundColor: COLORS.panfletoYellow,
        borderColor: COLORS.panfletoYellow,
        color: COLORS.panfletoBlack,
        fontWeight: 'bold',
        transition: 'background-color 0.3s',
    },
    blackText: {
        color: COLORS.panfletoBlack,
        fontSize: '1.05rem', 
    },
    // NUEVO ESTILO: Títulos en el recuadro de acciones (Precio, Estatus)
    labelBold: { 
        color: COLORS.panfletoBlack,
        fontWeight: 'bold', // Aplicamos negrita
    },
    priceItem: {
        backgroundColor: COLORS.white,
        borderBottom: `1px solid ${COLORS.panfletoBlack}`,
        color: COLORS.panfletoBlack,
    },
    priceText: {
        color: COLORS.panfletoBlack,
        fontSize: '1.2rem',
    },
    cardBorder: {
        border: `2px solid ${COLORS.panfletoBlack}`, 
    },
    inStockText: {
        color: COLORS.panfletoYellow,
        fontWeight: 'bold',
    },
    outOfStockText: {
        color: 'red',
        fontWeight: 'bold',
    }
};

const ProductPage = () => {
    const [product, setProduct] = useState({});
    const { id } = useParams();
    
    const { addToCart } = useContext(CartContext); 

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`/products/${id}`); 
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        addToCart({ ...product, qty: 1 }); 
    };

    if (!product.name) {
        return <div className="text-center my-5" style={styles.blackText}>Cargando...</div>;
    }

    return (
        <Container className='my-5'>
            <Row>
                {/* Columna de Imagen */}
                <Col md={6}>
                    <Image 
                        src={product.image} 
                        alt={product.name} 
                        fluid 
                        style={styles.cardBorder}
                    />
                </Col>

                {/* Columna de Detalles (Nombre, Descripción) */}
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item className='border-0'>
                            <h3 style={styles.title}>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item className='border-0 pt-0'>
                            <p style={styles.blackText}>
                                Descripción: {product.description}
                            </p>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                {/* Columna de Acciones (Precio, Estatus, Botón) */}
                <Col md={3}>
                    <Card style={styles.cardBorder}>
                        <ListGroup variant='flush'>
                            
                            {/* Fila de Precio */}
                            <ListGroup.Item style={styles.priceItem}>
                                <Row className='py-1'>
                                    {/* APLICAMOS EL NUEVO ESTILO labelBold */}
                                    <Col style={styles.labelBold}>Precio:</Col> 
                                    <Col className='text-end'>
                                        <strong style={styles.priceText}>
                                            ${(product.price / 100).toFixed(2)} .MXN
                                        </strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            
                            {/* Fila de Estatus */}
                            <ListGroup.Item style={styles.blackText}>
                                <Row className='py-1'>
                                    {/* APLICAMOS EL NUEVO ESTILO labelBold */}
                                    <Col style={styles.labelBold}>Estatus:</Col> 
                                    <Col className='text-end'>
                                        <strong style={product.countInStock > 0 ? styles.inStockText : styles.outOfStockText}>
                                            {product.countInStock > 0 ? 'En Stock' : 'Agotado'}
                                        </strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            
                            {/* Fila de Botón */}
                            <ListGroup.Item className='d-grid'>
                                <Button 
                                    onClick={handleAddToCart}
                                    className='py-2'
                                    type='button' 
                                    disabled={product.countInStock === 0}
                                    style={styles.addToCartButton}
                                >
                                    Añadir al Carrito
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ProductPage;