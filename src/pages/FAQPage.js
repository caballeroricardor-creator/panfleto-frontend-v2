// src/pages/FAQPage.js

import React from 'react';
import { Container, Row, Col, Accordion } from 'react-bootstrap';

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
        marginBottom: '40px',
        fontSize: '2.5rem',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    // Estilo general para el contenedor del acordeón (misma coherencia visual)
    accordionContainer: {
        maxWidth: '800px',
        margin: '0 auto',
        // Opcional: Agregar un borde exterior al contenedor
        // border: `1px solid ${COLORS.panfletoBlack}`, 
        // borderRadius: '5px',
        // padding: '15px' 
    },
    // Estilo para el encabezado de cada pregunta (Accordion.Header)
    accordionHeader: {
        backgroundColor: COLORS.white,
        color: COLORS.panfletoBlack,
        fontWeight: 'bold',
        fontSize: '1.1rem',
        border: `1px solid ${COLORS.panfletoBlack}`, // Borde de 1px
        borderRadius: '5px',
        marginBottom: '8px',
        padding: '12px 15px', // Ajustamos padding para mejor visualización
    },
    // Estilo para el cuerpo de la respuesta (Accordion.Body)
    accordionBody: {
        color: COLORS.panfletoBlack,
        backgroundColor: '#f8f9fa', // Fondo ligeramente gris para contraste
        borderLeft: `5px solid ${COLORS.panfletoYellow}`, // Toque de Panfleto Yellow
        padding: '20px',
        marginBottom: '15px',
        borderRadius: '0 5px 5px 5px',
    },
};

const FAQPage = () => {

    const faqs = [
        {
            id: '1',
            question: '¿Qué tipos de materiales utilizan en sus afiches?',
            answer: 'Nuestros afiches son impresos en papel mate premium de alta densidad (250gsm) para garantizar la durabilidad y la fidelidad de los colores. Utilizamos tintas de pigmento ecológicas que resisten la decoloración con el paso del tiempo.'
        },
        {
            id: '2',
            question: '¿Cuál es el tiempo de procesamiento y envío de un pedido?',
            answer: 'El procesamiento de tu pedido tarda generalmente de 1 a 2 días hábiles. Una vez enviado, el tiempo de entrega estándar es de 3 a 5 días hábiles dentro del territorio nacional. Recibirás un número de rastreo por correo electrónico.'
        },
        {
            id: '3',
            question: '¿Puedo devolver un afiche si no me gusta?',
            answer: 'Aceptamos devoluciones de productos dentro de los 30 días posteriores a la recepción, siempre y cuando el afiche se encuentre en perfectas condiciones y en su embalaje original. El cliente es responsable del costo de envío de la devolución. Consulta nuestra política de devoluciones completa en la sección "Información Legal".'
        },
    ];

    return (
        <Container className='py-5'>
            <Row>
                <Col>
                    <h1 className='mb-5' style={styles.title}>
                        Preguntas Frecuentes
                    </h1>
                </Col>
            </Row>

            <Row>
                <Col style={styles.accordionContainer}>
                    <Accordion defaultActiveKey="0">
                        {faqs.map((faq) => (
                            <Accordion.Item eventKey={faq.id} key={faq.id}>
                                
                                {/* 🔑 Aplicamos estilo al encabezado */}
                                <Accordion.Header style={styles.accordionHeader}>
                                    {faq.question}
                                </Accordion.Header>
                                
                                {/* 🔑 Aplicamos estilo al cuerpo */}
                                <Accordion.Body style={styles.accordionBody}>
                                    {faq.answer}
                                </Accordion.Body>
                            </Accordion.Item>
                        ))}
                    </Accordion>
                </Col>
            </Row>
        </Container>
    );
};

export default FAQPage;