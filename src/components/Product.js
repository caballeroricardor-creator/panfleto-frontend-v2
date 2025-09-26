import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// 🔑 IMPORTAMOS EL CSS DEDICADO A LA TARJETA
import '../css/ProductCard.css'; 

const Product = ({ product }) => {
  return (
    // 🔑 Aplicamos la clase principal 'product-card'
    <Card className='my-3 p-3 product-card'> 
      <Link to={`/products/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>
      <Card.Body>
        <Link to={`/products/${product._id}`} style={{ textDecoration: 'none' }}>
          {/* 🔑 Aplicamos la clase 'product-card-title' para el color blanco */}
          {/* Eliminamos los estilos y clases en línea de color anteriores */}
          <Card.Title 
              as='div' 
              className='product-card-title' 
          >
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        {/* 🔑 Aplicamos la clase 'product-card-price' para el color blanco */}
        {/* Usamos 'product-card-price' en lugar de 'text-center' */}
        <Card.Text as="h3" className='product-card-price'>
            ${(product.price / 100).toFixed(2)} .MXN
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;