// src/components/TestimonialsSection.js

import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

// Definimos los colores de tu marca
const COLORS = {
    panfletoYellow: '#F1CD3A',
    panfletoBlack: '#171717',
    white: '#FFFFFF',
};

// Estilos
const styles = {
    sectionTitle: {
        color: COLORS.panfletoBlack,
        paddingBottom: '10px',
        borderBottom: `2px solid ${COLORS.panfletoYellow}`,
        marginBottom: '40px',
        fontSize: '2rem',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: '60px', // Espacio superior
    },
    // Estilo de tarjeta para el testimonio (coherencia visual)
    card: {
        border: `1px solid ${COLORS.panfletoBlack}`,
        borderRadius: '5px',
        height: '100%', // Asegura que todas las tarjetas tengan la misma altura
        padding: '15px',
        display: 'flex',
        flexDirection: 'column',
    },
    reviewText: {
        color: COLORS.panfletoBlack,
        fontStyle: 'italic',
        marginBottom: '15px',
        flexGrow: 1, // Permite que el texto crezca
    },
    authorText: {
        color: COLORS.panfletoBlack,
        fontWeight: 'bold',
        textAlign: 'right',
        marginTop: '10px',
        borderTop: `1px solid ${COLORS.panfletoYellow}`, // Separador amarillo sutil
        paddingTop: '5px',
    },
    // Estilo para los corazones (Amarillo Panfleto)
    ratingIcon: {
        color: COLORS.panfletoYellow,
        marginRight: '3px',
    }
};

// Función para generar la calificación en corazones
const Rating = ({ count }) => {
    const hearts = [];
    for (let i = 0; i < 5; i++) {
        hearts.push(
            <FontAwesomeIcon 
                key={i} 
                icon={faHeart} 
                style={{ ...styles.ratingIcon, opacity: i < count ? 1 : 0.4 }} // Corazones llenos vs. vacíos
            />
        );
    }
    return <div className="mb-3">{hearts}</div>;
};


const TestimonialsSection = () => {

    const testimonials = [
        {
            rating: 5,
            comment: "¡Simplemente espectacular! El afiche superó mis expectativas. La calidad de la impresión es impecable y el papel es muy resistente. Definitivamente volveré a comprar.",
            author: "Aurea R."
        },
        {
            rating: 5,
            comment: "El diseño llegó rapidísimo y el empaque fue excelente, muy bien protegido. Amo cómo se ve en mi sala, le dio el toque minimalista y moderno que buscaba.",
            author: "Edgar C."
        },
        {
            rating: 4,
            comment: "Muy buenos productos. Solo le pongo 4 corazones porque el rastreo tardó un día en actualizarse, pero la atención al cliente fue muy amable. ¡Recomendados!",
            author: "Ruben C."
        },
    ];

    return (
        <section className="my-5">
            <h2 style={styles.sectionTitle}>
                Nuestros Clientes Dicen...
            </h2>
            
            <Row className="g-4 justify-content-center">
                {testimonials.map((testimonial, index) => (
                    <Col md={4} key={index}>
                        <Card style={styles.card}>
                            <Card.Body>
                                <Rating count={testimonial.rating} />
                                <p style={styles.reviewText}>
                                    "{testimonial.comment}"
                                </p>
                                <p style={styles.authorText}>
                                    — {testimonial.author}
                                </p>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </section>
    );
};

export default TestimonialsSection;