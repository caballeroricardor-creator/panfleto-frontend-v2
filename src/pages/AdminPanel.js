// src/pages/AdminPanel.js (CÓDIGO MODIFICADO)

import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Button, Spinner } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';

const PANFLETO_YELLOW = '#F1CD3A';
const PANFLETO_BLACK = '#171717ff';

const AdminPanel = () => {
    const { user, loading } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && (!user || !user.isAdmin)) {
            navigate('/login');
        }
    }, [user, navigate, loading]);

    if (loading) {
        return (
            <div className="text-center" style={{ paddingTop: '6rem' }}>
                <Spinner animation="border" role="status" style={{ color: PANFLETO_YELLOW }} />
            </div>
        );
    }
    
    if (!user || !user.isAdmin) {
        return null;
    }

    return (
        <FormContainer>
            <div className="text-center">
                <h1 style={{ color: PANFLETO_BLACK }}>Panel de Administración</h1>
                <p style={{ color: PANFLETO_BLACK }}>Bienvenido, {user.name}. Tienes acceso completo al panel.</p>
                <hr style={{ color: PANFLETO_BLACK }} />

                <h3 style={{ color: PANFLETO_BLACK }}>Herramientas de Administración</h3>
                
                {/* 🔑 MODIFICACIÓN CLAVE: Usamos 'd-flex' con 'justify-content-center' 
                       y 'flex-wrap' para que los botones se envuelvan sin encimarse. 
                       También agregamos un margen entre ellos.
                */}
                <div className="d-flex justify-content-center flex-wrap gap-3 mt-4">
                    
                    <Button 
                        as={Link} 
                        to="/admin/products" 
                        // Quitamos las clases de margen para que 'gap-3' de Bootstrap se encargue.
                        style={{ 
                            backgroundColor: PANFLETO_YELLOW, 
                            borderColor: PANFLETO_YELLOW, 
                            color: PANFLETO_BLACK 
                        }}
                    >
                        Gestionar Productos
                    </Button>
                    
                    <Button 
                        as={Link} 
                        to="/admin/users" 
                        variant="outline-secondary" 
                        // Quitamos las clases de margen.
                        style={{ 
                            borderColor: PANFLETO_BLACK, 
                            color: PANFLETO_BLACK 
                        }}
                    >
                        Gestionar Usuarios
                    </Button>
                </div>
            </div>
        </FormContainer>
    );
};

export default AdminPanel;