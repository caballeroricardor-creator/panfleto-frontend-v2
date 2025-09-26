import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';

// Definimos los colores de tu marca
const PANFLETO_YELLOW = '#F1CD3A';
const PANFLETO_BLACK = '#171717ff';

const ShippingPage = () => {
    const navigate = useNavigate();

    // Nota: Es común inicializar el estado del envío desde localStorage si existe,
    // pero para este ejemplo, solo aplicaremos los estilos.
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        const shippingAddress = { address, city, postalCode, country };
        localStorage.setItem('shippingAddress', JSON.stringify(shippingAddress));
        navigate('/payment');
    };

    return (
        <FormContainer>
            {/* 🔑 Título con color de marca */}
            <h1 style={{ color: PANFLETO_BLACK }}>Formulario de Envío</h1>
            
            <Form onSubmit={submitHandler}>
                
                {/* 🔑 Etiquetas de formulario con color de marca */}
                <Form.Group controlId='address' className='my-3'>
                    <Form.Label style={{ color: PANFLETO_BLACK }}>Dirección</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Ingresa tu dirección'
                        value={address}
                        required
                        onChange={(e) => setAddress(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='city' className='my-3'>
                    <Form.Label style={{ color: PANFLETO_BLACK }}>Ciudad</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Ingresa tu ciudad'
                        value={city}
                        required
                        onChange={(e) => setCity(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='postalCode' className='my-3'>
                    <Form.Label style={{ color: PANFLETO_BLACK }}>Código Postal</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Ingresa tu código postal'
                        value={postalCode}
                        required
                        onChange={(e) => setPostalCode(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='country' className='my-3'>
                    <Form.Label style={{ color: PANFLETO_BLACK }}>País</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Ingresa tu país'
                        value={country}
                        required
                        onChange={(e) => setCountry(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                {/* 🔑 Botón Principal: Fondo Amarillo, Texto Negro Suave */}
                <Button 
                    type='submit' 
                    className='my-3' // Quitamos variant='primary' para usar el estilo personalizado
                    style={{
                        backgroundColor: PANFLETO_YELLOW,
                        borderColor: PANFLETO_YELLOW,
                        color: PANFLETO_BLACK,
                        fontWeight: 'bold'
                    }}
                >
                    Continuar al pago
                </Button>
            </Form>
        </FormContainer>
    );
};

export default ShippingPage;