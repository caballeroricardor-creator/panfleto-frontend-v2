// src/pages/PrivacyPolicyPage.js

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
    // 🔑 NUEVO ESTILO: Para la fecha de última actualización
    updateDateStyle: {
        color: COLORS.panfletoYellow, // Color Amarillo Panfleto
        fontWeight: 'bold',          // En negrita
        fontSize: '1.1rem',          // Ligeramente más grande
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

const PrivacyPolicyPage = () => {
    return (
        <Container className='py-5'>
            <Row>
                <Col>
                    <h1 style={styles.mainTitle}>
                        Política de Privacidad
                    </h1>
                </Col>
            </Row>

            <Row>
                <Col md={{ span: 10, offset: 1 }}>
                    
                    {/* 🔑 APLICACIÓN DEL NUEVO ESTILO */}
                    <p style={styles.updateDateStyle}> 
                        Última Actualización: 24 de Septiembre de 2025
                    </p>
                    
                    <p style={styles.subText}>
                        En Panfleto, valoramos tu privacidad y nos comprometemos a proteger la información personal que compartes con nosotros. Esta Política de Privacidad describe cómo recopilamos, utilizamos y compartimos tu información cuando utilizas nuestro sitio web y servicios.
                    </p>

                    {/* SECCIÓN 1: Información que Recopilamos */}
                    <h2 style={styles.sectionTitle}>1. Información que Recopilamos</h2>
                    <p style={styles.subText}>
                        Recopilamos varios tipos de información para proporcionarte y mejorar nuestros servicios:
                    </p>
                    <ul style={styles.list}>
                        <li>**Información de Identificación Personal (IIP):** Nombre, dirección de correo electrónico, dirección de envío y facturación, y número de teléfono. Recopilada durante el registro o el proceso de compra.</li>
                        <li>**Datos de Transacción:** Información sobre los productos que has comprado, los métodos de pago utilizados y el historial de pedidos.</li>
                        <li>**Datos de Uso:** Información sobre cómo accedes y utilizas el sitio web, incluyendo tu dirección IP, tipo de navegador, páginas visitadas y tiempos de sesión.</li>
                    </ul>

                    {/* SECCIÓN 2: Uso de tu Información */}
                    <h2 style={styles.sectionTitle}>2. Uso de tu Información</h2>
                    <p style={styles.subText}>
                        Utilizamos la información recopilada para los siguientes propósitos:
                    </p>
                    <ul style={styles.list}>
                        <li>Procesar y completar tus pedidos, incluyendo el envío de confirmaciones y actualizaciones.</li>
                        <li>Gestionar tu cuenta y brindarte soporte al cliente.</li>
                        <li>Personalizar tu experiencia de compra y mejorar nuestros productos.</li>
                        <li>Enviar comunicaciones de marketing (si has optado por recibirlas).</li>
                    </ul>
                    
                    {/* SECCIÓN 3: Seguridad de los Datos */}
                    <h2 style={styles.sectionTitle}>3. Seguridad de los Datos</h2>
                    <p style={styles.subText}>
                        Tomamos medidas razonables para proteger tu información personal de pérdidas, robos y accesos no autorizados. Sin embargo, recuerda que ningún método de transmisión por Internet o almacenamiento electrónico es 100% seguro.
                    </p>

                    {/* SECCIÓN 4: Tus Derechos */}
                    <h2 style={styles.sectionTitle}>4. Tus Derechos</h2>
                    <p style={styles.subText}>
                        Tienes derecho a acceder, corregir o eliminar la información personal que hemos recopilado sobre ti. Para ejercer estos derechos, por favor contáctanos a través de la página de Contacto.
                    </p>
                </Col>
            </Row>
        </Container>
    );
};

export default PrivacyPolicyPage;