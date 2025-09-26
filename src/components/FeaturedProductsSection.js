// src/components/FeaturedProductsSection.js

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard'; 

const COLORS = {
    panfletoBlack: '#171717',
    panfletoYellow: '#F1CD3A',
};

// ... (Estilos se mantienen)

const styles = {
    sectionTitle: {
        color: COLORS.panfletoBlack,
        paddingBottom: '10px',
        borderBottom: `2px solid ${COLORS.panfletoYellow}`,
        marginBottom: '10px', 
        fontSize: '2rem',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: '60px',
    },
    subHeading: {
        color: COLORS.panfletoBlack,
        fontSize: '1.2rem',
        textAlign: 'center',
        marginBottom: '40px',
    }
};

// 🔑 CAMBIO CLAVE: Reducción a solo 3 productos
const FEATURED_NAMES = [
    'The fall into time', 
    'Norwegian Wood', 
    'Eréndira'
];

const FeaturedProductsSection = ({ allProducts }) => { 
    
    const featuredProducts = allProducts.filter(product => 
        FEATURED_NAMES.includes(product.name)
    );
    
    if (allProducts.length === 0) {
        return <Container className="text-center py-5">Cargando afiches destacados...</Container>;
    }

    return (
        <Container className="py-5">
            <h2 style={styles.sectionTitle}>
                Afiches Destacados 
            </h2>
            
            <p style={styles.subHeading}>
                Explora nuestra selección curada de arte impreso.
            </p>
            
            <Row className="g-4 justify-content-center"> 
                {featuredProducts.map((product) => (
                    // 🔑 CAMBIO CLAVE: Usamos Col lg={4}. 12/4 = 3. Perfecto para 3 artículos.
                    // Usamos mx-auto para asegurar el centrado en caso de menos de 3 en otras vistas.
                    <Col key={product._id} sm={10} md={6} lg={4} className="mx-auto"> 
                        <ProductCard product={product} /> 
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default FeaturedProductsSection;