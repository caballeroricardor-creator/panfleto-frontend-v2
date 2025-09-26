// frontend/src/components/FormContainer.js (CÓDIGO MODIFICADO)
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
// 🔑 Importa la hoja de estilos global de layout
import '../css/LayoutPage.css'; 

const FormContainer = ({ children }) => {
  return (
    // 🔑 Aplicamos la clase que usamos en CartPage para el margen superior
    <Container className='page-margin-top'> 
      <Row className='justify-content-md-center'>
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;