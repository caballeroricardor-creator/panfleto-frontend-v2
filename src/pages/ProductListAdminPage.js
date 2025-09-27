import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import api from '../axios';
import { Table, Button, Row, Col, Container, Spinner, Alert, Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import '../css/LayoutPage.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'; 

// Definimos los colores de tu marca
const PANFLETO_YELLOW = '#F1CD3A';
const PANFLETO_BLACK = '#171717ff';

const ProductListAdminPage = () => {
    // ... (El resto del estado y la lógica permanece igual) ...
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { user } = useUser();
    const navigate = useNavigate();

    const fetchProducts = useCallback(async () => {
        try {
            if (!user || !user.isAdmin) {
                navigate('/login');
                return;
            }
            
            const { data } = await api.get('/products/admin');
            
            setProducts(data);
            setLoading(false);
        } catch (err) {
            setError(err.response && err.response.data.message ? err.response.data.message : 'Error al cargar los productos');
            setLoading(false);
        }
    }, [user, navigate]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const deleteHandler = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
            try {
                await api.delete(`/products/${id}`);
                fetchProducts();
            } catch (err) {
                console.error(err);
                setError(err.response && err.response.data.message ? err.response.data.message : 'Error al eliminar el producto');
            }
        }
    };

    return (
        <Container className='page-margin-top'>
            <Row className='align-items-center mb-4'>
                <Col>
                    <h1 style={{ color: PANFLETO_BLACK }}>Productos de la Tienda</h1>
                </Col>
                <Col className='text-end'>
                    <LinkContainer to='/admin/products/create'>
                        {/* 🔑 SOLUCIÓN: Nos aseguramos de NO usar la prop variant */}
                        <Button 
                            className='my-3'
                            style={{ 
                                backgroundColor: PANFLETO_YELLOW, 
                                borderColor: PANFLETO_YELLOW, 
                                color: PANFLETO_BLACK,
                                fontWeight: 'bold' 
                            }}
                        >
                            <FontAwesomeIcon icon={faPlus} className='me-1' /> Crear Producto
                        </Button>
                    </LinkContainer>
                </Col>
            </Row>

            {loading ? (
                 <div className="text-center my-5">
                    <Spinner animation="border" role="status" style={{ color: PANFLETO_YELLOW }} />
                </div>
            ) : error ? (
                <Alert variant='danger'>{error}</Alert>
            ) : (
                <Card>
                    {/* Encabezado del Card: Fondo Negro, Texto Amarillo */}
                    <Card.Header style={{ backgroundColor: PANFLETO_BLACK, color: PANFLETO_YELLOW, fontWeight: 'bold', fontSize: '1.25rem' }}>
                        Lista de Productos
                    </Card.Header>
                    <Card.Body className="p-0"> 
                        <Table 
                            striped 
                            hover 
                            responsive 
                            className='table-sm mb-0' 
                            style={{ borderColor: 'transparent' }} 
                        >
                            {/* Encabezado de la tabla: Fondo Negro, Texto Blanco */}
                            <thead style={{ backgroundColor: PANFLETO_BLACK, color: 'white' }}>
                                <tr>
                                    <th>ID</th>
                                    <th>NOMBRE</th>
                                    <th>PRECIO</th>
                                    <th>CATEGORÍA</th>
                                    <th>STOCK</th>
                                    <th>ACCIONES</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product._id} style={{ color: PANFLETO_BLACK }}>
                                        <td>{product._id.substring(0, 8)}...</td>
                                        <td>{product.name}</td>
                                        <td>${(product.price / 100).toFixed(2)}</td>
                                        <td>{product.category}</td>
                                        <td>{product.countInStock}</td>
                                        <td style={{ whiteSpace: 'nowrap' }}> 
                                            <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                                {/* Botón Editar (btn-md) */}
                                                <Button 
                                                    variant='light' 
                                                    className='btn-md me-2' 
                                                    style={{ 
                                                        borderColor: PANFLETO_BLACK, 
                                                        color: PANFLETO_BLACK,
                                                        border: '1px solid',
                                                        backgroundColor: 'white'
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faEdit} size="sm" /> 
                                                </Button>
                                            </LinkContainer>
                                            {/* Botón Eliminar (btn-md) */}
                                            <Button
                                                variant='danger'
                                                className='btn-md' 
                                                onClick={() => deleteHandler(product._id)}
                                            >
                                                <FontAwesomeIcon icon={faTrash} size="sm" /> 
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            )}
        </Container>
    );
};

export default ProductListAdminPage;