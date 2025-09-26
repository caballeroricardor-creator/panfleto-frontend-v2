// src/pages/CatalogPage.js

import React from 'react';
import { Container } from 'react-bootstrap';
// 🔑 Importamos el componente de listado completo
import AllProductsScreen from '../components/AllProductsScreen'; 

const COLORS = {
    panfletoBlack: '#171717',
    panfletoYellow: '#F1CD3A',
};

const styles = {
    mainTitle: {
        color: COLORS.panfletoBlack,
        paddingBottom: '10px',
        borderBottom: `2px solid ${COLORS.panfletoYellow}`,
        marginBottom: '40px',
        fontSize: '2.5rem',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: '30px',
    },
};

const CatalogPage = () => {
    return (
        <Container className='py-5'>
            <h1 style={styles.mainTitle}>
                Catálogo Completo
            </h1>
            
            {/* 🔑 Renderiza el componente que trae todos los productos */}
            <AllProductsScreen />
            
        </Container>
    );
};

export default CatalogPage;