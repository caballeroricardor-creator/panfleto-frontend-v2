// src/pages/AboutPage.js

import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

// Definimos los colores de tu marca
const COLORS = {
    panfletoYellow: '#F1CD3A',
    panfletoBlack: '#171717',
    white: '#FFFFFF',
};

// Estilos
const styles = {
    mainTitle: {
        color: COLORS.panfletoBlack,
        paddingBottom: '10px',
        borderBottom: `2px solid ${COLORS.panfletoYellow}`,
        marginBottom: '40px',
        fontSize: '2.5rem',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    // Estilo para la tarjeta que contendrá la Misión/Visión
    card: {
        border: `1px solid ${COLORS.panfletoBlack}`,
        backgroundColor: COLORS.white,
        borderRadius: '5px',
        boxShadow: 'none', 
        marginBottom: '40px',
        padding: '20px',
    },
    sectionTitle: {
        color: COLORS.panfletoBlack,
        fontWeight: 'bold',
        fontSize: '1.5rem',
        marginTop: '25px',
        marginBottom: '10px',
        borderBottom: `1px solid ${COLORS.panfletoYellow}`, // Línea sutil bajo subtítulos
        display: 'inline-block', // Para que la línea solo cubra el texto
        paddingBottom: '5px',
    },
    subText: {
        color: COLORS.panfletoBlack,
        marginBottom: '15px',
        lineHeight: '1.6',
        fontSize: '1.1rem', // Hacemos el texto principal un poco más grande
    },
    missionVisionText: {
        color: COLORS.panfletoBlack,
        fontSize: '1rem',
        marginBottom: '20px',
    },
    highlight: {
        color: COLORS.panfletoYellow,
        fontWeight: 'bold',
    }
};

const AboutPage = () => {
    return (
        <Container className='py-5'>
            <Row>
                <Col>
                    <h1 style={styles.mainTitle}>
                        Acerca de Nosotros
                    </h1>
                </Col>
            </Row>

            <Row>
                <Col md={{ span: 10, offset: 1 }}>
                    
                    {/* Texto Principal (Replicado de la página principal) */}
                    <h2 style={styles.sectionTitle}>Nuestra Historia</h2>
                    <p style={styles.subText}>
                        En un mundo de mensajes fugaces, creamos <strong style={{ color: COLORS.panfletoYellow }}>Panfleto</strong> para celebrar la permanencia y belleza de un mensaje impreso en un póster. Un panfleto es una hoja de papel que se distribuye para comunicar algo; nosotros llevamos esa idea al siguiente nivel, creando un <strong style={styles.highlight}>lienzo para la expresión artística</strong>.
                    </p>
                    <p style={styles.subText}>
                        Nuestra pasión es transformar espacios comunes en galerías personales, ofreciendo afiches de alta calidad que cuentan una historia, celebran una pasión, o simplemente aportan una explosión de color y diseño.
                    </p>
                    
                    {/* Misión y Visión en una Tarjeta Separada para Resaltar */}
                    <Card style={styles.card}>
                        <Card.Body>
                            <Row>
                                {/* Misión */}
                                <Col md={6}>
                                    <h3 style={{ ...styles.sectionTitle, borderBottom: `2px solid ${COLORS.panfletoYellow}` }}>
                                        Nuestra Misión
                                    </h3>
                                    <p style={styles.missionVisionText}>
                                        Inspirar la decoración y el arte personal al proporcionar afiches de diseño único y calidad superior que permitan a cada individuo expresar su identidad en sus propios espacios.
                                    </p>
                                </Col>

                                {/* Visión */}
                                <Col md={6}>
                                    <h3 style={{ ...styles.sectionTitle, borderBottom: `2px solid ${COLORS.panfletoYellow}` }}>
                                        Nuestra Visión
                                    </h3>
                                    <p style={styles.missionVisionText}>
                                        Convertirnos en la plataforma líder para el arte impreso en Latinoamérica, reconocida por la excelencia de nuestros materiales y la vanguardia de nuestros diseños exclusivos.
                                    </p>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>

                    <h2 style={styles.sectionTitle}>La Virtud del Mensaje Impreso</h2>
                    <p style={styles.subText}>
                        Creemos que el arte no debe ser exclusivo. Por eso, nos enfocamos en curar y crear colecciones que sean accesibles y estéticamente impactantes. Cada póster de Panfleto es una declaración de estilo, una obra pensada para durar.
                    </p>
                    
                </Col>
            </Row>
        </Container>
    );
};

export default AboutPage;