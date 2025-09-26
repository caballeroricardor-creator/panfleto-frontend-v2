import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import api from '../axios';
import { Spinner, Alert, Container, Table, Button, Card, Row, Col } from 'react-bootstrap'; // Importamos Card y Row/Col
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons'; // Íconos para la tabla
import '../css/LayoutPage.css'; // 🔑 Importamos el CSS de layout

// Definimos los colores de tu marca
const PANFLETO_YELLOW = '#F1CD3A';
const PANFLETO_BLACK = '#171717ff';

const UserListAdminPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { user } = useUser();
    const navigate = useNavigate();

    const fetchUsers = useCallback(async () => {
        try {
            if (!user || !user.isAdmin) {
                navigate('/login');
                return;
            }
            
            const { data } = await api.get('/api/users/admin');
            
            setUsers(data);
            setLoading(false);
        } catch (err) {
            setError('Error al cargar los usuarios');
            setLoading(false);
        }
    }, [user, navigate]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const deleteHandler = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
            try {
                // Previene que un administrador se elimine a sí mismo accidentalmente (opcional)
                if (user && user._id === id) {
                    alert('No puedes eliminar tu propia cuenta de administrador mientras estás conectado.');
                    return;
                }
                
                await api.delete(`/api/users/${id}`);
                
                fetchUsers(); // Recarga la lista de usuarios
            } catch (err) {
                console.error(err);
                setError('Error al eliminar el usuario');
            }
        }
    };

    if (loading) {
        // 🔑 Spinner con color de marca y margen superior
        return (
            <div className="text-center" style={{ paddingTop: '6rem' }}>
                <Spinner animation="border" role="status" style={{ color: PANFLETO_YELLOW }} />
            </div>
        );
    }

    if (error) {
        return (
            <Container className="page-margin-top">
                <Alert variant="danger">
                    Hubo un error al cargar los usuarios: {error}
                </Alert>
            </Container>
        );
    }

    return (
        // 🔑 Aplicamos el margen superior para evitar el Header y margen inferior
        <Container className="page-margin-top mb-5"> 
            <Row className='mb-4'>
                <Col>
                    {/* 🔑 Título con color de marca */}
                    <h1 style={{ color: PANFLETO_BLACK }}>Gestión de Usuarios</h1>
                </Col>
            </Row>

            {/* 🔑 Aplicamos el estilo de Card para la tabla */}
            <Card>
                {/* 🔑 Encabezado del Card: Fondo Negro, Texto Amarillo */}
                <Card.Header style={{ backgroundColor: PANFLETO_BLACK, color: PANFLETO_YELLOW, fontWeight: 'bold', fontSize: '1.25rem' }}>
                    Lista de Usuarios
                </Card.Header>
                <Card.Body className="p-0"> 
                    <Table 
                        striped 
                        hover 
                        responsive 
                        className='table-sm mb-0' // Eliminamos el margen inferior de la tabla
                    >
                        {/* 🔑 Encabezado de la tabla: Fondo Negro, Texto Blanco */}
                        <thead style={{ backgroundColor: PANFLETO_BLACK, color: 'white' }}>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Email</th>
                                <th>ADMIN</th>
                                <th>Fecha de Reg.</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((u) => (
                                <tr key={u._id} style={{ color: PANFLETO_BLACK }}>
                                    <td>{u._id.substring(0, 8)}...</td>
                                    <td>{u.name}</td>
                                    <td>
                                        <a href={`mailto:${u.email}`} style={{ color: PANFLETO_BLACK, textDecoration: 'underline' }}>
                                            {u.email}
                                        </a>
                                    </td>
                                    {/* 🔑 Columna ADMIN: Usamos íconos para claridad */}
                                    <td className='text-center'>
                                        {u.isAdmin ? (
                                            <FontAwesomeIcon icon={faCheck} style={{ color: 'green' }} />
                                        ) : (
                                            <FontAwesomeIcon icon={faTimes} style={{ color: 'red' }} />
                                        )}
                                    </td>
                                    <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                                    
                                    {/* 🔑 Columna Acciones: Botón de eliminar más grande (btn-md) y con ícono */}
                                    <td style={{ whiteSpace: 'nowrap' }}>
                                        {/* Solo se puede eliminar si no es el usuario logueado */}
                                        {user && user._id !== u._id && (
                                            <Button
                                                variant='danger'
                                                className='btn-md' // Botón mediano
                                                onClick={() => deleteHandler(u._id)}
                                            >
                                                <FontAwesomeIcon icon={faTrash} size="sm" /> 
                                            </Button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default UserListAdminPage;