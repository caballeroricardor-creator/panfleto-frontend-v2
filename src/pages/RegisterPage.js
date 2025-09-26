// src/pages/RegisterPage.js

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Form, Button, Alert } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import api from '../axios';

// Definimos los colores de tu marca (igual que en LoginPage)
const PANFLETO_YELLOW = '#F1CD3A';
const PANFLETO_BLACK = '#171717ff';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const { user, login } = useUser();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        try {
            await api.post('/api/users/register', { name, email, password });
            
            await login(email, password); 
            navigate('/');
            
        } catch (err) {
            const errorMessage =
                err.response && err.response.data && err.response.data.message
                ? err.response.data.message
                : 'Error de red. Por favor, intenta de nuevo.';
            setError(errorMessage);
        }
    };

    return (
        <FormContainer>
            {/* 🔑 Color de Encabezado: Cambiado a Negro Suave */}
            <h1 style={{ color: PANFLETO_BLACK }}>Crear Cuenta</h1>
            {error && <Alert variant='danger'>{error}</Alert>}

            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name' className='mb-3'>
                    {/* 🔑 Color de Etiqueta: Cambiado a Negro Suave */}
                    <Form.Label style={{ color: PANFLETO_BLACK }}>Nombre</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Ingresa tu nombre'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </Form.Group>

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

                <Form.Group controlId='confirmPassword'>
                    {/* 🔑 Color de Etiqueta: Cambiado a Negro Suave */}
                    <Form.Label style={{ color: PANFLETO_BLACK }}>Confirmar Contraseña</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirma tu contraseña'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
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
                    Registrarse
                </Button>
            </Form>

            <p className='mt-3' style={{ color: PANFLETO_BLACK }}>
                ¿Ya tienes una cuenta? 
                {/* 🔑 Color de Enlace: Cambiado a Amarillo */}
                <Link to='/login' style={{ color: PANFLETO_YELLOW, fontWeight: 'bold' }}>
                    Iniciar Sesión
                </Link>
            </p>
        </FormContainer>
    );
};

export default RegisterPage;