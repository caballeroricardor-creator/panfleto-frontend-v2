// src/components/AboutSection.js

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const COLORS = {
    panfletoYellow: '#F1CD3A',
    panfletoBlack: '#171717',
};

const styles = {
    sectionTitle: {
        color: COLORS.panfletoBlack,
        paddingBottom: '10px',
        borderBottom: `2px solid ${COLORS.panfletoYellow}`,
        marginBottom: '30px',
        fontSize: '2rem',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: '60px',
    },
    subText: {
        color: COLORS.panfletoBlack,
        marginBottom: '20px',
        lineHeight: '1.7',
        fontSize: '1.2rem',
        textAlign: 'center',
        maxWidth: '800px',
        margin: '0 auto',
    },
    highlight: {
        color: COLORS.panfletoYellow,
        fontWeight: 'bold',
    }
};

const AboutSection = () => {
    return (
        <Container className="py-5">
            <h2 style={styles.sectionTitle}>
                Acerca de Nosotros
            </h2>
            <Row>
                <Col>
                    <p style={styles.subText}>
                        En un mundo de mensajes fugaces, creamos <strong style={styles.highlight}>Panfleto</strong> para celebrar la permanencia y belleza de un mensaje impreso en un póster. Un panfleto es una hoja de papel que se distribuye para comunicar algo; nosotros llevamos esa idea al siguiente nivel, creando un lienzo para la expresión artística.
                    </p>
                    
                </Col>
            </Row>
        </Container>
    );
};

export default AboutSection;