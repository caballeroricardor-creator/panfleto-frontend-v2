// src/pages/Profile.js

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Image, Table, Spinner, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import api from '../axios'; 
import userAvatar from '../assets/Photo-profile.jpg'; // Asegúrate de que esta ruta sea correcta

// Colores oficiales de Panfleto
const COLORS = {
    panfletoBlack: '#171717', 
    panfletoYellow: '#F1CD3A', 
    white: '#FFFFFF',
};

// Estilos personalizados
const styles = {
    // Estilo para el título principal
    title: {
        color: COLORS.panfletoBlack,
        paddingBottom: '10px',
        borderBottom: `2px solid ${COLORS.panfletoYellow}`, 
        marginBottom: '20px',
    },
    // NUEVO ESTILO: Borde simple para la tarjeta
    profileCard: {
        border: `1px solid ${COLORS.panfletoBlack}`,
    },
    // Estilo para la imagen del perfil: AHORA CIRCULAR Y POSICIONADA
    profileImage: {
        width: '200px', 
        height: '200px', 
        borderRadius: '50%', // <-- ¡HACE LA IMAGEN CIRCULAR!
        objectFit: 'cover', 
        objectPosition: 'top', // <-- ASEGURA QUE LA PARTE SUPERIOR (LOGO) SE VEA
        border: `2px solid ${COLORS.panfletoYellow}`, 
    },
    // Estilo para el nombre (más grande)
    userName: {
        fontSize: '2.5rem', 
        fontWeight: 'bold',
        color: COLORS.panfletoBlack,
    },
    // Separador debajo del nombre
    nameSeparator: {
        borderBottom: `2px solid ${COLORS.panfletoBlack}`,
        width: '50%',
        margin: '10px auto 15px auto', // Centrar y añadir margen
    },
    // Estilo para el conteo de productos (más pequeño)
    productCount: {
        fontSize: '1rem', 
        color: COLORS.panfletoBlack,
        fontWeight: 'normal',
    },
    // Estilo para el encabezado de la tabla
    tableHeader: {
        backgroundColor: COLORS.panfletoBlack,
        color: COLORS.panfletoYellow,
        fontWeight: 'bold',
    },
    // Estilo para botones primarios (Administrar Productos)
    adminPrimaryButton: {
        backgroundColor: COLORS.panfletoYellow,
        color: COLORS.panfletoBlack,
        borderColor: COLORS.panfletoYellow,
        fontWeight: 'bold',
        padding: '10px 20px', 
    },
    // Estilo para botones secundarios (Administrar Usuarios) - Estilo Contorno Amarillo/Negro
    adminSecondaryButton: {
        backgroundColor: COLORS.white, 
        color: COLORS.panfletoBlack, 
        borderColor: COLORS.panfletoYellow, 
        fontWeight: 'bold',
        padding: '10px 20px',
        borderWidth: '2px', 
    }
};

const ProfilePage = () => {
    const { user, loading } = useUser();
    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [ordersLoading, setOrdersLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (loading) {
            return;
        }

        if (!user) {
            navigate('/login');
            return;
        }

        const fetchOrders = async () => {
            try {
                setOrdersLoading(true);
                const { data } = await api.get('/orders/myorders');
                
                setOrders(data);
                setOrdersLoading(false);
            } catch (err) {
                if (err.response && err.response.data.expired) {
                    setError('Tu sesión ha expirado, por favor inicia sesión de nuevo.');
                    navigate('/login'); 
                } else {
                    setError(err.response && err.response.data.message ? err.response.data.message : err.message);
                }
                setOrdersLoading(false);
            }
        };

        fetchOrders();
    }, [user, navigate, loading]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(amount);
    };
    
    const totalProducts = orders.reduce((acc, order) => {
        return acc + order.orderItems.reduce((sum, item) => sum + item.qty, 0);
    }, 0);
    
    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
                <Spinner animation="border" role="status" style={{ color: COLORS.panfletoYellow }}>
                    <span className="visually-hidden">Cargando...</span>
                </Spinner>
            </Container>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <Container className="my-5">
            <h1 style={styles.title} className="text-center">Mi Perfil</h1>

            <Row className="justify-content-center">
                {/* Columna de Perfil de Usuario */}
                <Col md={6} className="mb-4">
                    {/* Tarjeta con borde simple */}
                    <Card className="text-center p-4" style={styles.profileCard}> 
                        <Card.Body>
                            <Image
                                src={userAvatar}
                                alt="User Avatar"
                                className="mb-3"
                                style={styles.profileImage}
                            />
                            <Card.Title style={styles.userName}>{user.name}</Card.Title>
                            
                            {/* LÍNEA SEPARADORA */}
                            <div style={styles.nameSeparator}></div>

                            <Card.Text style={styles.productCount}>Productos comprados: {totalProducts}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Panel de Administrador (si aplica) */}
                {user.isAdmin && (
                    <Col md={12} className="mb-4">
                        {/* Tarjeta con borde simple */}
                        <Card className="p-4" style={styles.profileCard}>
                            <Card.Body>
                                <h4 className="text-center mb-4" style={{color: COLORS.panfletoBlack}}>Panel de Administrador</h4>
                                <div className="d-flex justify-content-center gap-3">
                                    <Button as={Link} to="/admin/products" style={styles.adminPrimaryButton}>
                                        Administrar Productos
                                    </Button>
                                    <Button as={Link} to="/admin/users" style={styles.adminSecondaryButton}>
                                        Administrar Usuarios
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                )}
            </Row>

            {/* Historial de Compras */}
            <h4 className="mt-5 text-center mb-4" style={styles.title}>Historial de Compras</h4>
            
            {ordersLoading ? (
                <p className="text-center">Cargando historial de compras...</p>
            ) : error ? (
                <p className="text-center" style={{ color: 'red' }}>Error: {error}</p>
            ) : (
                <Table striped bordered hover responsive className="table-sm text-center">
                    {/* Encabezados de la Tabla */}
                    <thead style={styles.tableHeader}>
                        <tr>
                            <th>ID</th>
                            <th>Fecha</th>
                            <th>Total</th>
                            <th>Productos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <tr key={order._id}>
                                    <td className="align-middle">{order._id}</td>
                                    <td className="align-middle">{order.createdAt.substring(0, 10)}</td>
                                    <td className="align-middle">{formatCurrency(order.totalPrice)}</td>
                                    <td>
                                        <div className="d-flex flex-wrap justify-content-center">
                                            {order.orderItems.map((item, index) => (
                                                <div key={index} className="m-2 text-center" style={{ width: '100px' }}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                    <small className="d-block" style={{color: COLORS.panfletoBlack}}>{item.name}</small>
                                                    <small className="d-block" style={{color: COLORS.panfletoBlack}}>{item.qty} x {formatCurrency(item.price)}</small>
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center" style={{color: COLORS.panfletoBlack}}>No tienes compras realizadas.</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            )}
        </Container>
    );
};

export default ProfilePage;