// src/components/Footer.js

import React from 'react';
import { Container, Row, Col, Nav, NavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faPinterest } from '@fortawesome/free-brands-svg-icons'; 
import logo from '../assets/Logo_Panfleto.png'; 

const Footer = () => {
    const accentColor = '#F1CD3A'; 

    // Definimos el estilo base para los íconos de redes sociales
    const socialIconStyle = { 
        color: accentColor,
        textDecoration: 'none', // 🔑 CLAVE: ELIMINA EL SUBRAYADO
    };

    return (
        <footer className="text-light pt-4 border-top" style={{ backgroundColor: '#171717ff' }}>
            <Container>
                
                <Row className="text-center text-md-start">
                    
                    {/* Columna 1: Marca e Identidad - Más Grande (md={6}) */}
                    <Col md={6} className="mx-auto mb-4"> 
                        
                        {/* Logo */}
                        <div className="mb-2 d-flex flex-column align-items-md-start align-items-center">
                            <img 
                                src={logo} 
                                alt="Logo Panfleto" 
                                style={{ height: '55px', marginBottom: '8px' }}
                            />
                        </div>
                        
                        {/* Nombre de la Marca */}
                        <h5 className="text-uppercase fw-bold" style={{ color: accentColor }}>
                            PANFLETO
                        </h5>
                        
                        {/* Eslogan */}
                        <p className="text-white-50 small"> 
                            ¡La virtud de un mensaje impreso!
                            Creando arte para tu espacio.
                        </p>
                        
                        {/* Redes Sociales - Aplicando el nuevo estilo sin subrayado */}
                        <div className="mt-3">
                            <a 
                                href="https://facebook.com" 
                                className="me-3" 
                                style={socialIconStyle} // Aplicamos el nuevo estilo
                                target="_blank" 
                                rel="noopener noreferrer" 
                                aria-label="Facebook"
                            >
                                <FontAwesomeIcon icon={faFacebook} size="xl" />
                            </a>
                            <a 
                                href="https://instagram.com" 
                                className="me-3" 
                                style={socialIconStyle} // Aplicamos el nuevo estilo
                                target="_blank" 
                                rel="noopener noreferrer" 
                                aria-label="Instagram"
                            >
                                <FontAwesomeIcon icon={faInstagram} size="xl" />
                            </a>
                            <a 
                                href="https://pinterest.com" 
                                style={socialIconStyle} // Aplicamos el nuevo estilo
                                target="_blank" 
                                rel="noopener noreferrer" 
                                aria-label="Pinterest"
                            >
                                <FontAwesomeIcon icon={faPinterest} size="xl" />
                            </a>
                        </div>
                    </Col>

                    {/* Columna 2: Soporte y Ayuda (md={3}) */}
                    <Col md={3} className="mx-auto mb-4">
                        <h6 className="text-uppercase fw-bold mb-3" style={{ color: accentColor }}>
                            Soporte
                        </h6>
                        <Nav className="flex-column">
                            <NavLink as={Link} to="/contact" className="p-0 text-white-50 mb-2">Contacto</NavLink>
                            <NavLink as={Link} to="/faq" className="p-0 text-white-50 mb-2">Preguntas Frecuentes</NavLink>
                        </Nav>
                    </Col>

                    {/* Columna 3: Legal y Empresa (md={3}) */}
                    <Col md={3} className="mx-auto mb-4">
                        <h6 className="text-uppercase fw-bold mb-3" style={{ color: accentColor }}>
                            Información Legal
                        </h6>
                        <Nav className="flex-column">
                            <NavLink as={Link} to="/privacy" className="p-0 text-white-50 mb-2">Política de Privacidad</NavLink>
                            <NavLink as={Link} to="/terms" className="p-0 text-white-50 mb-2">Términos y Condiciones</NavLink>
                            <NavLink as={Link} to="/about" className="p-0 text-white-50 mb-2">Acerca de Nosotros</NavLink>
                        </Nav>
                    </Col>
                </Row>

                {/* Derechos de Autor y Sello */}
                <Row className="py-3 mt-4 border-top border-secondary">
                    <Col className="text-center">
                        <p className="mb-0 text-white-50">
                            &copy; {new Date().getFullYear()} Panfleto. Todos los derechos reservados.
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;