// frontend/src/pages/LoginPage.js (CÓDIGO MODIFICADO)
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Form, Button, Alert } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';

// Definimos los colores de tu marca
const PANFLETO_YELLOW = '#F1CD3A';
const PANFLETO_BLACK = '#171717ff';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const { login } = useUser();

    const submitHandler = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            const errorMessage =
                err.response && err.response.data && err.response.data.message
                    ? err.response.data.message
                    : err.message;
            setError(errorMessage);
        }
    };

    return (
        <FormContainer>
            {/* 🔑 Color de Encabezado: Cambiado a Negro Suave */}
            <h1 style={{ color: PANFLETO_BLACK }}>Iniciar Sesión</h1>
            {error && <Alert variant='danger'>{error}</Alert>}

            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email' className='mb-3'>
                    {/* 🔑 Color de Etiqueta: Cambiado a Negro Suave */}
                    <Form.Label style={{ color: PANFLETO_BLACK }}>Dirección de Email</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Ingresa tu email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId='password'>
                    {/* 🔑 Color de Etiqueta: Cambiado a Negro Suave */}
                    <Form.Label style={{ color: PANFLETO_BLACK }}>Contraseña</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Ingresa tu contraseña'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>

                {/* 🔑 Estilo de Botón: Fondo Amarillo y Texto Negro Suave */}
                <Button 
                    type='submit' 
                    className='mt-3'
                    style={{ 
                        backgroundColor: PANFLETO_YELLOW, 
                        borderColor: PANFLETO_YELLOW, 
                        color: PANFLETO_BLACK 
                    }}
                >
                    Iniciar Sesión
                </Button>
            </Form>

            <p className='mt-3' style={{ color: PANFLETO_BLACK }}>
                ¿Aún no tienes una cuenta? 
                {/* 🔑 Color de Enlace: Cambiado a Amarillo */}
                <Link to='/register' style={{ color: PANFLETO_YELLOW, fontWeight: 'bold' }}>
                    Regístrate aquí
                </Link>
            </p>
        </FormContainer>
    );
};

export default LoginPage;