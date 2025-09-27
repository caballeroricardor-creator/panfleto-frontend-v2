import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';

const AddProductPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState(''); // Estado para la imagen
  const [countInStock, setCountInStock] = useState(0);

  const submitHandler = async (e) => {
    e.preventDefault();
    const product = { name, description, price, image, countInStock };

    try {
      const token = localStorage.getItem('userToken');

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post('/api/products', product, config);
      console.log('Product created:', data);
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <Container>
      <h1>Add New Product</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control type='text' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='description' className='mt-3'>
          <Form.Label>Description</Form.Label>
          <Form.Control as='textarea' rows={3} placeholder='Enter description' value={description} onChange={(e) => setDescription(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='price' className='mt-3'>
          <Form.Label>Price</Form.Label>
          <Form.Control type='number' placeholder='Enter price' value={price} onChange={(e) => setPrice(e.target.value)}></Form.Control>
        </Form.Group>
        
        {/* Nuevo campo para la imagen */}
        <Form.Group controlId='image' className='mt-3'>
          <Form.Label>Image URL</Form.Label>
          <Form.Control type='text' placeholder='Enter image URL' value={image} onChange={(e) => setImage(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='countInStock' className='mt-3'>
          <Form.Label>Count In Stock</Form.Label>
          <Form.Control type='number' placeholder='Enter stock count' value={countInStock} onChange={(e) => setCountInStock(e.target.value)}></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' className='mt-3'>
          Add Product
        </Button>
      </Form>
    </Container>
  );
};

export default AddProductPage;