import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import api from '../axios';
import { useUser } from '../context/UserContext';
import FormContainer from '../components/FormContainer';

const ProductCreatePage = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [category, setCategory] = useState('');

    const { user } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        // Redirige si el usuario no es un administrador
        if (!user || !user.isAdmin) {
            navigate('/login');
        }
    }, [user, navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            

            const newProduct = {
                name,
                price,
                image,
                description,
                countInStock,
                category,
            };

            // Ahora usamos 'api.post' sin pasar el objeto de configuración del token
            await api.post('/products', newProduct);
            
            alert('¡Producto creado exitosamente!');
            navigate('/admin/products'); // Redirige a la lista de productos
        } catch (error) {
            console.error('Error al crear el producto:', error);
            alert('Error al crear el producto. Inténtalo de nuevo.');
        }
    };

    return (
        <FormContainer>
            <h1>Crear Nuevo Producto</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name' className='mb-3'>
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Ingresa el nombre del producto'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId='price' className='mb-3'>
                    <Form.Label>Precio</Form.Label>
                    <Form.Control
                        type='number'
                        placeholder='Ingresa el precio'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId='image' className='mb-3'>
                    <Form.Label>URL de la Imagen</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Ingresa la URL de la imagen'
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId='description' className='mb-3'>
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control
                        as='textarea'
                        rows={3}
                        placeholder='Ingresa la descripción'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </Form.Group>
                
                <Form.Group controlId='countInStock' className='mb-3'>
                    <Form.Label>Stock</Form.Label>
                    <Form.Control
                        type='number'
                        placeholder='Ingresa el stock disponible'
                        value={countInStock}
                        onChange={(e) => setCountInStock(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId='category' className='mb-3'>
                    <Form.Label>Categoría</Form.Label>
                    <Form.Control
                       type='text'
                       placeholder='Ingresa la categoría'
                       value={category}
                       onChange={(e) => setCategory(e.target.value)}
                       required
                    />
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Crear Producto
                </Button>
            </Form>
        </FormContainer>
    );
};

export default ProductCreatePage;