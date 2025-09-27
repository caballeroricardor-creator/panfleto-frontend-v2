import React, { useState, useEffect, useContext } from 'react';
import { Form, Button, Row, Col, ListGroup, Card, Image, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js'; // <-- Necesaria para stripePromise
import { CartContext } from '../context/CartContext'; 
import { useUser } from '../context/UserContext'; 
import axios from 'axios';

// Carga tu clave publicable de Stripe 
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY); // <-- Definición de stripePromise

// Componente para formatear la moneda a pesos mexicanos 
const formatCurrency = (amount) => { 
    return new Intl.NumberFormat('es-MX', { 
        style: 'currency', 
        currency: 'MXN', 
    }).format(amount); 
}; 

// Colores oficiales de Panfleto
const COLORS = {
    panfletoBlack: '#171717', 
    panfletoYellow: '#F1CD3A', 
    white: '#FFFFFF', 
};

// Estilos personalizados
const styles = {
    // Estilos para los títulos de la sección principal (línea inferior amarilla)
    mainSectionTitle: {
        color: COLORS.panfletoBlack,
        paddingBottom: '10px',
        borderBottom: `2px solid ${COLORS.panfletoYellow}`, 
        marginBottom: '15px',
    },
    // Estilo para el h2 dentro del Card (Resumen del Pedido)
    cardHeaderStyle: {
        backgroundColor: COLORS.panfletoBlack, // Fondo Negro Panfleto
        color: COLORS.panfletoYellow, // Texto Amarillo Panfleto
        padding: '10px 15px',
        margin: '-1px -1px 0 -1px', 
        borderBottom: `1px solid ${COLORS.panfletoYellow}`, 
    },
    // Estilo para las filas de la tarjeta (Subtotal y Envío)
    listGroupItemWhite: {
        backgroundColor: COLORS.white, // Fondo Blanco
        color: COLORS.panfletoBlack, // Texto Negro
        border: 'none', 
        fontSize: '1rem', // Usamos el tamaño anterior al cambio fallido
    },
    // Estilos para el ListGroup.Item del TOTAL (fondo amarillo, texto negro)
    listGroupItemTotal: {
        backgroundColor: COLORS.panfletoYellow, // Fondo Amarillo Panfleto
        color: COLORS.panfletoBlack, // Texto Negro Panfleto
        fontWeight: 'bold',
        border: 'none',
        fontSize: '1.2rem', // Usamos el tamaño anterior al cambio fallido
    },
};


const PaymentForm = () => { // <-- Definición de PaymentForm
    const navigate = useNavigate(); 
    const stripe = useStripe(); 
    const elements = useElements(); 
    const { cartItems, clearCart } = useContext(CartContext); 
    const { user } = useUser(); 
    const [clientSecret, setClientSecret] = useState(''); 
    
    // Obtener la dirección de envío desde localStorage 
    const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress')); 

    // Calcula el subtotal (dividimos por 100 para convertir a pesos) 
    const subtotal = cartItems.reduce((acc, item) => acc + item.qty * (item.price / 100), 0); 
    const shippingPrice = subtotal > 1000 ? 0 : 150; 
    const totalPrice = subtotal + shippingPrice; 

    useEffect(() => { 
        const getClientSecret = async () => { 
            try { 
                // Asegurar que solo se haga si hay items en el carrito y un precio total positivo
                if (totalPrice > 0) {
                    // La API espera centavos, por eso multiplicamos por 100
                    const { data } = await axios.post('/payment/create-payment-intent', { amount: Math.round(totalPrice * 100) }); 
                    setClientSecret(data.clientSecret); 
                }
            } catch (error) { 
                console.error("Error fetching client secret:", error); 
            } 
        }; 
        getClientSecret(); 
    }, [totalPrice]); 

    const submitHandler = async (e) => { 
        e.preventDefault(); 
    
        if (!stripe || !elements || !clientSecret || !user || !user.token) { 
            console.error('No se puede procesar el pago. Usuario no autenticado o falta información de pago.'); 
            return; 
        } 

        const cardElement = elements.getElement(CardElement); 

        const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, { 
            payment_method: { 
                card: cardElement, 
            }, 
        }); 
    
        if (error) { 
            console.error('Error en el pago:', error); 
        } else if (paymentIntent.status === 'succeeded') { 
            try { 
                // Configuración para enviar el token de autorización 
                const config = { 
                    headers: { 
                        'Content-Type': 'application/json', 
                        Authorization: `Bearer ${user.token}`, 
                    }, 
                }; 
                
                const { data } = await axios.post('/orders', { 
                    orderItems: cartItems.map(item => ({ 
                        name: item.name, 
                        qty: item.qty, 
                        image: item.image, 
                        // Guardamos el precio en centavos para consistencia en el backend
                        price: item.price, 
                        product: item._id 
                    })), 
                    shippingAddress: shippingAddress, 
                    paymentMethod: 'Stripe', 
                    // Enviamos el precio total en centavos
                    totalPrice: Math.round(totalPrice * 100) 
                }, config); 
                
                console.log('Orden creada:', data); 
                navigate('/order-confirmation'); 
                clearCart(); 

            } catch (error) { 
                console.error("Error al crear la orden:", error.response ? error.response.data.message : error.message); 
            } 
        } 
    }; 

    return ( 
        <Row className="my-4"> 
            <Col md={8}> 
                <ListGroup variant='flush'> 
                    <ListGroup.Item> 
                        <h2 style={styles.mainSectionTitle}>Resumen de la Orden</h2> 
                        <p> 
                            <strong>Dirección de Envío:</strong> 
                            <br /> 
                            {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country} 
                        </p> 
                    </ListGroup.Item> 

                    <ListGroup.Item> 
                        <h2 style={styles.mainSectionTitle}>Productos</h2> 
                        <ListGroup variant='flush'> 
                            {cartItems.map((item) => ( 
                                <ListGroup.Item key={item._id}> 
                                    <Row className="align-items-center"> 
                                        <Col md={2}> 
                                            <Image src={item.image} alt={item.name} fluid rounded /> 
                                        </Col> 
                                        <Col> 
                                            {item.name} (Cantidad: {item.qty}) 
                                        </Col> 
                                        <Col className="text-end"> 
                                            {/* El precio en pesos se calcula dividiendo item.price (centavos) por 100 */}
                                            {formatCurrency(item.qty * (item.price / 100))} 
                                        </Col> 
                                    </Row> 
                                </ListGroup.Item> 
                            ))} 
                        </ListGroup> 
                    </ListGroup.Item> 

                    <ListGroup.Item> 
                        <h2 style={styles.mainSectionTitle}>Detalles del Pago</h2> 
                        <Form onSubmit={submitHandler}> 
                            <Form.Group className='mb-3'> 
                                <Form.Label>Número de tarjeta</Form.Label> 
                                <div style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}> 
                                    <CardElement /> 
                                </div> 
                            </Form.Group> 
                            <Button 
                                type="submit" 
                                className="my-3" 
                                disabled={!stripe || !clientSecret}
                                style={{ 
                                    backgroundColor: COLORS.panfletoYellow, 
                                    color: COLORS.panfletoBlack, 
                                    borderColor: COLORS.panfletoYellow, 
                                    fontWeight: 'bold' 
                                }}
                            > 
                                Pagar Ahora ({formatCurrency(totalPrice)}) 
                            </Button> 
                        </Form> 
                    </ListGroup.Item> 
                </ListGroup> 
            </Col> 
            <Col md={4}> 
                {/* La tarjeta de resumen tiene fondo blanco y borde negro */}
                <Card style={{ backgroundColor: COLORS.white, color: COLORS.panfletoBlack, border: `1px solid ${COLORS.panfletoBlack}` }}> 
                    <ListGroup variant='flush'> 
                        {/* El encabezado de la tarjeta sigue el estilo Panfleto Negro/Amarillo */}
                        <ListGroup.Item style={styles.cardHeaderStyle}> 
                            <h2>Resumen del Pedido</h2> 
                        </ListGroup.Item> 
                        {/* Subtotal y Envío usan el estilo blanco/negro */}
                        <ListGroup.Item style={styles.listGroupItemWhite}> 
                            <Row> 
                                <Col>Subtotal</Col> 
                                <Col className="text-end">{formatCurrency(subtotal)}</Col> 
                            </Row> 
                        </ListGroup.Item> 
                        <ListGroup.Item style={styles.listGroupItemWhite}> 
                            <Row> 
                                <Col>Envío</Col> 
                                <Col className="text-end">{formatCurrency(shippingPrice)}</Col> 
                            </Row> 
                        </ListGroup.Item> 
                        {/* El Total mantiene el estilo Amarillo Panfleto/Negro */}
                        <ListGroup.Item style={styles.listGroupItemTotal}> 
                            <Row> 
                                <Col>TOTAL</Col> 
                                <Col className="text-end">{formatCurrency(totalPrice)}</Col> 
                            </Row> 
                        </ListGroup.Item> 
                    </ListGroup> 
                </Card> 
            </Col> 
        </Row> 
    ); 
}; 

const PaymentPage = () => { // <-- Componente PaymentPage que usa los anteriores
    return ( 
        // Se aplica el margen superior (mt-5) al contenedor para evitar que el título se oculte
        <Container className="mt-5"> 
            <h1 style={{ color: COLORS.panfletoBlack }}>Método de Pago</h1> 
            <Elements stripe={stripePromise}> 
                <PaymentForm /> 
            </Elements> 
        </Container> 
    ); 
}; 

export default PaymentPage;