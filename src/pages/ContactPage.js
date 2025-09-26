// src/pages/ContactPage.js

import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

// Definimos los colores de tu marca
const COLORS = {
    panfletoYellow: '#F1CD3A',
    panfletoBlack: '#171717',
    white: '#FFFFFF',
};

// Estilos
const styles = {
    title: {
        color: COLORS.panfletoBlack,
        paddingBottom: '10px',
        borderBottom: `2px solid ${COLORS.panfletoYellow}`,
        marginBottom: '20px',
        fontSize: '2.5rem',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    // 🔑 MODIFICACIÓN CLAVE: Aplicamos borderRadius de 5px
    card: {
        border: `1px solid ${COLORS.panfletoBlack}`,
        backgroundColor: COLORS.white,
        borderRadius: '5px', // <--- BORDES REDONDEADOS APLICADOS
        boxShadow: 'none', 
        maxWidth: '700px',
        margin: '0 auto', 
    },
    // Estilo para cada línea de información de contacto
    contactItem: {
        fontSize: '1.1rem',
        color: COLORS.panfletoBlack,
        marginBottom: '15px',
    },
    icon: {
        color: COLORS.panfletoYellow,
        marginRight: '15px',
    },
    // Estilo para la línea de separación
    separator: {
        height: '1px',
        backgroundColor: COLORS.panfletoYellow,
        margin: '25px 0',
    }
};

const ContactPage = () => {
    return (
        <Container className='py-5'>
            <Row>
                <Col>
                    <h1 className='mb-5' style={styles.title}>
                        Contáctanos
                    </h1>
                </Col>
            </Row>

            <Row>
                <Col>
                    {/* La tarjeta ahora tendrá esquinas suavemente redondeadas */}
                    <Card style={styles.card} className='p-4'>
                        <Card.Body>
                            <h4 className='text-center mb-4' style={{ color: COLORS.panfletoBlack, fontWeight: 'bold' }}>
                                ¿Cómo podemos ayudarte?
                            </h4>
                            
                            <p className='text-center mb-4' style={{ color: COLORS.panfletoBlack }}>
                                Estamos aquí para resolver tus dudas sobre productos, pedidos o cualquier consulta general.
                            </p>

                            <div style={styles.separator}></div>
                            
                            {/* Información de Contacto (Hardcodeada para prototipo) */}
                            <div className='d-flex flex-column align-items-start'>
                                
                                {/* Correo Electrónico */}
                                <div style={styles.contactItem}>
                                    <FontAwesomeIcon icon={faEnvelope} size="lg" style={styles.icon} />
                                    **Correo Electrónico:** hola@panfleto.com
                                </div>

                                {/* Teléfono */}
                                <div style={styles.contactItem}>
                                    <FontAwesomeIcon icon={faPhone} size="lg" style={styles.icon} />
                                    **Teléfono:** +52 55 1234 5678 (Lunes a Viernes, 9:00 - 18:00 hrs)
                                </div>

                                {/* Dirección */}
                                <div style={styles.contactItem}>
                                    <FontAwesomeIcon icon={faMapMarkerAlt} size="lg" style={styles.icon} />
                                    **Oficina Principal:** Calle Creatividad #42, Col. Diseño, 01010, Ciudad Panfleto.
                                </div>
                            </div>
                        
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ContactPage;