// src/pages/HomePage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button } from 'react-bootstrap'; 
import { Link } from 'react-router-dom';

// Importa las secciones
import FeaturedProductsSection from '../components/FeaturedProductsSection';
import AboutSection from '../components/AboutSection';
import TestimonialsSection from '../components/TestimonialsSection'; 

// Importa los recursos visuales existentes
import logo from '../assets/Logo_Panfleto-512B.png';
import heroBackground from '../assets/FondoIndex.jpg';
import '../css/HomePage.css'; 

// Definimos los colores de la marca
const COLORS = {
    panfletoYellow: '#F1CD3A',
    panfletoBlack: '#171717',
    white: '#FFFFFF',
};

// Estilos del Hero/Jumbotron
const heroStyle = {
    backgroundColor: COLORS.panfletoBlack,
    color: COLORS.white,
    height: '80vh', 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: '0',
    backgroundImage: `url(${heroBackground})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center', 
};

// 🔑 CAMBIO 1 y 2: Ajuste de Tamaño, Espaciado y Ancho para una Sola Línea
const sloganStyle = {
    color: COLORS.white,
    fontSize: '3rem', // 🔑 CAMBIO: Más grande (de 2.5rem a 3rem)
    fontWeight: '400', 
    marginTop: '40px', // 🔑 CAMBIO: Mayor espacio vertical con el logo (de 20px a 40px)
    maxWidth: '100%',
    margin: '0 auto',
    whiteSpace: 'nowrap', 
    letterSpacing: '2px', // Espacio sutil entre letras para el efecto de mayúsculas
};


const HomePage = () => {
    
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('/products'); 
                setProducts(data);
            } catch (error) {
                console.error('Error al obtener los productos:', error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div>
            {/* 1. SECCIÓN HERO DE IMPACTO VISUAL */}
            <div
                className="hero-banner-container"
                style={heroStyle} 
            >
                <div className="hero-content">
                    
                    <img src={logo} alt="Panfleto Logo" className="hero-logo logo-hover-effect" />
                    
                    {/* 🔑 CAMBIO 3: Texto en Mayúsculas sin signos de exclamación */}
                    <h1 className="slogan" style={sloganStyle}>LA VIRTUD DE UN MENSAJE IMPRESO</h1>
                </div>
            </div>

            <Container className="my-5">
                
                {/* 2. PRODUCTOS MÁS VENDIDOS */}
                <FeaturedProductsSection allProducts={products} /> 

                {/* 3. IDENTIDAD DE MARCA */}
                <AboutSection /> 

                {/* 4. PRUEBA SOCIAL */}
                <TestimonialsSection /> 
                
                {/* 5. LLAMADA A LA ACCIÓN FINAL */}
                <div className="text-center py-5">
                    <h2 style={{ color: COLORS.panfletoBlack, marginBottom: '30px' }}>Explora toda la colección</h2>
                    <Button 
                        as={Link} 
                        to="/products"
                        variant="warning" 
                        size="lg"
                        style={{ 
                            backgroundColor: COLORS.panfletoYellow, 
                            borderColor: COLORS.panfletoYellow, 
                            color: COLORS.panfletoBlack, 
                            fontWeight: 'bold' 
                        }}
                    >
                        Ver Catálogo Completo
                    </Button>
                </div>
            </Container>
        </div>
    );
};

export default HomePage;