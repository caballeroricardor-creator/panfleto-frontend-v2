// src/pages/TermsAndConditionsPage.js

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

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
    sectionTitle: {
        color: COLORS.panfletoBlack,
        fontWeight: 'bold',
        fontSize: '1.5rem',
        marginTop: '25px',
        marginBottom: '10px',
    },
    updateDateStyle: {
        color: COLORS.panfletoYellow, 
        fontWeight: 'bold',          
        fontSize: '1.1rem',         
        marginBottom: '10px',
    },
    subText: {
        color: COLORS.panfletoBlack,
        marginBottom: '15px',
        lineHeight: '1.6',
    },
    list: {
        color: COLORS.panfletoBlack,
        listStyleType: 'disc',
        marginLeft: '20px',
        marginBottom: '20px',
    }
};

const TermsAndConditionsPage = () => {
    return (
        <Container className='py-5'>
            <Row>
                <Col>
                    <h1 style={styles.mainTitle}>
                        Términos y Condiciones
                    </h1>
                </Col>
            </Row>

            <Row>
                <Col md={{ span: 10, offset: 1 }}>
                    
                    <p style={styles.updateDateStyle}> 
                        Última Revisión: 24 de Septiembre de 2025
                    </p>
                    
                    <p style={styles.subText}>
                        Bienvenido a Panfleto. Al acceder y utilizar este sitio web y realizar una compra, usted acepta estar sujeto a los siguientes términos y condiciones ("Términos"). Si no está de acuerdo con alguna parte de estos términos, le rogamos no utilice nuestra plataforma.
                    </p>

                    {/* SECCIÓN 1: Uso del Sitio Web */}
                    <h2 style={styles.sectionTitle}>1. Uso del Sitio Web</h2>
                    <p style={styles.subText}>
                        El contenido de las páginas de este sitio web es para su información general y uso exclusivo. Está sujeto a cambios sin previo aviso.
                    </p>
                    <ul style={styles.list}>
                        <li>Usted es responsable de mantener la confidencialidad de su cuenta y contraseña.</li>
                        <li>El uso no autorizado de este sitio web puede dar lugar a una reclamación por daños y perjuicios y/o ser un delito penal.</li>
                    </ul>

                    {/* SECCIÓN 2: Propiedad Intelectual */}
                    <h2 style={styles.sectionTitle}>2. Propiedad Intelectual</h2>
                    <p style={styles.subText}>
                        Todo el contenido de este sitio (incluyendo diseños de afiches, texto, gráficos, logotipos y software) es propiedad de Panfleto o de sus proveedores de contenido y está protegido por leyes de derechos de autor y propiedad intelectual.
                    </p>
                    <ul style={styles.list}>
                        <li>Queda estrictamente prohibida la reproducción, copia o distribución de cualquier diseño de producto sin el consentimiento expreso por escrito de Panfleto.</li>
                        <li>Al comprar un afiche, usted adquiere el producto físico, pero no los derechos de propiedad intelectual sobre el diseño.</li>
                    </ul>
                    
                    {/* SECCIÓN 3: Precios y Pagos */}
                    <h2 style={styles.sectionTitle}>3. Precios y Pagos</h2>
                    <p style={styles.subText}>
                        Todos los precios están cotizados en pesos mexicanos (MXN) e incluyen el Impuesto al Valor Agregado (IVA) aplicable. Nos reservamos el derecho de modificar los precios en cualquier momento.
                    </p>

                    {/* SECCIÓN 4: Limitación de Responsabilidad */}
                    <h2 style={styles.sectionTitle}>4. Limitación de Responsabilidad</h2>
                    <p style={styles.subText}>
                        Panfleto no será responsable de ningún daño directo, indirecto, incidental o consecuente que resulte del uso o la imposibilidad de usar los productos o servicios ofrecidos.
                    </p>
                </Col>
            </Row>
        </Container>
    );
};

export default TermsAndConditionsPage;