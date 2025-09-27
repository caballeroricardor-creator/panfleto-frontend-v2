import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import api from '../axios';
import { useUser } from '../context/UserContext';
import FormContainer from '../components/FormContainer';

const ProductEditPage = () => {
    const { id } = useParams();
    
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(true); // <-- Nuevo estado para manejar la carga
    const [error, setError] = useState(null); // <-- Nuevo estado para manejar errores

    const { user } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || !user.isAdmin) {
            navigate('/login');
            return;
        }

        const fetchProduct = async () => {
            try {
                
                
                // Ahora usamos 'api.get' y el interceptor se encarga del token
                const { data } = await api.get(`/products/${id}`);
                
                setName(data.name);
                setPrice(data.price);
                setImage(data.image);
                setDescription(data.description);
                setCountInStock(data.countInStock);
                setCategory(data.category);
                setLoading(false);
            } catch (err) {
                console.error('Error al cargar el producto para edición:', err);
                setError('Error al cargar el producto. Inténtalo de nuevo.');
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id, user, navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            

            const updatedProduct = {
                name,
                price,
                image,
                description,
                countInStock,
                category,
            };

            // Ahora usamos 'api.put'
            await api.put(`/products/${id}`, updatedProduct);
            
            alert('¡Producto actualizado exitosamente!');
            navigate('/admin/products');
        } catch (err) {
            console.error('Error al actualizar el producto:', err);
            alert('Error al actualizar el producto. Inténtalo de nuevo.');
        }
    };

    return (
        <FormContainer>
            <h1>Editar Producto</h1>
            {loading ? (
                <p>Cargando...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
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
                        Actualizar Producto
                    </Button>
                </Form>
            )}
        </FormContainer>
    );
};

export default ProductEditPage;