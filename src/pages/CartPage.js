// src/pages/CartPage.js

import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../context/CartContext';
import '../css/LayoutPage.css'; 

// Definimos los colores de tu marca para usarlos fácilmente
const PANFLETO_YELLOW = '#F1CD3A';
const PANFLETO_BLACK = '#171717ff';

const CartPage = () => {
    const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
    const navigate = useNavigate();

    const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);

    const checkoutHandler = () => {
        navigate('/shipping');
    };

    return (
        <Container className='page-margin-top'> 
            <Row className="justify-content-md-center">
                <Col md={7} lg={6}>
                    <h1 className='mb-4 text-center'>Carrito de Compras</h1>
                    
                    {cartItems.length === 0 ? (
                        <Card className="p-4 text-center">
                            Su carrito está vacío. 
                            {/* AQUÍ ESTÁ EL CAMBIO: Agregamos el estilo en línea al Link */}
                            <Link to="/" style={{ color: PANFLETO_YELLOW, fontWeight: 'bold' }}>
                                Volver a la tienda
                            </Link>
                        </Card>
                    ) : (
                        <>
                            {/* LISTADO DE PRODUCTOS (Vertical) */}
                            <ListGroup variant="flush" className="mb-4">
                                {cartItems.map((item) => (
                                    <ListGroup.Item key={item._id} className="p-3">
                                        
                                        <Row className="align-items-center mb-3">
                                            
                                            <Col xs={4} className="d-flex justify-content-center">
                                                <Image 
                                                    src={item.image} 
                                                    alt={item.name} 
                                                    fluid 
                                                    rounded 
                                                    style={{ maxWidth: '120px', height: 'auto' }}
                                                />
                                            </Col>

                                            <Col xs={8}>
                                                {/* 🔑 COLOR DE NOMBRE DE PRODUCTO: Cambiado a Negro suave */}
                                                <h4 className='fw-bold mb-1' style={{ color: PANFLETO_BLACK }}>
                                                    <Link 
                                                         to={`/products/${item._id}`} 
                                                         style={{ textDecoration: 'none', color: PANFLETO_BLACK }}
                                                    >
                                                         {item.name}
                                                    </Link>
                                                </h4>
                                                
                                                <p className='text-muted small mb-1'>
                                                    {item.description ? item.description.substring(0, 50) + '...' : 'Afiche de colección impreso en alta calidad.'}
                                                </p>
                                                
                                                {/* 🔑 COLOR DEL PRECIO: Cambiado a Negro */}
                                                <h5 style={{ color: PANFLETO_BLACK }}>
                                                    {(item.price / 100).toFixed(2)} .MXN
                                                </h5>
                                            </Col>
                                        </Row>

                                        <Row className="align-items-center border-top pt-2">
                                            <Col xs={6} className="d-flex align-items-center">
                                                {/* 🔑 COLOR DE LA ETIQUETA 'Cantidad': Cambiado a Negro suave */}
                                                <Form.Label className="me-2 mb-0 small" style={{ color: PANFLETO_BLACK }}>
                                                    Cantidad:
                                                </Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    value={item.qty}
                                                    onChange={(e) => updateQuantity(item._id, Number(e.target.value))}
                                                    style={{ width: '60px', padding: '0.25rem' }}
                                                >
                                                    {[...Array(item.countInStock).keys()].map((x) => (
                                                        <option key={x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                    ))}
                                                </Form.Control>
                                            </Col>
                                            
                                            <Col xs={6} className="text-end">
                                                {/* 🔑 COLOR DEL BOTÓN BASURA: Botón Danger (Rojo) */}
                                                <Button 
                                                    type="button" 
                                                    variant="danger" 
                                                    onClick={() => removeFromCart(item._id)}
                                                >
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>

                            {/* RECUADRO DE SUBTOTAL */}
                            <Card className='mt-4'>
                                <ListGroup variant="flush">
                                    {/* 🔑 COLOR DE FONDO DEL ENCABEZADO: Fondo Negro Suave, Texto Amarillo */}
                                    <ListGroup.Item style={{ backgroundColor: PANFLETO_BLACK, color: PANFLETO_YELLOW }}>
                                        <h4 className='mb-0'>Resumen del Pedido</h4>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row className="fw-bold">
                                            {/* 🔑 COLOR DEL TEXTO: Cambiado a Negro suave */}
                                            <Col style={{ color: PANFLETO_BLACK }}>
                                                Subtotal de ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) productos:
                                            </Col>
                                            {/* 🔑 COLOR DEL MONTO: Cambiado a Negro */}
                                            <Col className='text-end' style={{ color: PANFLETO_BLACK }}>
                                                {(subtotal / 100).toFixed(2)} .MXN
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        {/* 🔑 COLOR DEL BOTÓN DE PAGO: Fondo Amarillo, Texto Negro Suave */}
                                        <Button
                                            type="button"
                                            className="w-100"
                                            disabled={cartItems.length === 0}
                                            onClick={checkoutHandler}
                                            style={{ backgroundColor: PANFLETO_YELLOW, borderColor: PANFLETO_YELLOW, color: PANFLETO_BLACK }}
                                        >
                                            Proceder al pago
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default CartPage;