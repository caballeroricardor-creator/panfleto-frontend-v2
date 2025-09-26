// src/context/CartContext.js

import React, { createContext, useState, useEffect } from 'react';

// 1. Crear el contexto del carrito
export const CartContext = createContext();

// 2. Crear el componente proveedor
export const CartProvider = ({ children }) => {
    // Inicializar el carrito con los datos de localStorage, si existen
    const [cartItems, setCartItems] = useState(() => {
        try {
            const itemsFromStorage = localStorage.getItem('cartItems');
            return itemsFromStorage ? JSON.parse(itemsFromStorage) : [];
        } catch (error) {
            console.error("Error al cargar el carrito de localStorage:", error);
            return [];
        }
    });

    // 3. Persistir el carrito en localStorage cada vez que cambie
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    // Función para agregar un producto al carrito
    const addToCart = (product) => {
        setCartItems((prevItems) => {
            // Verificar si el producto ya está en el carrito
            const itemExists = prevItems.find((item) => item._id === product._id);

            if (itemExists) {
                // Si el producto existe, actualizar la cantidad
                return prevItems.map((item) =>
                    item._id === product._id ? { ...item, qty: item.qty + 1 } : item
                );
            } else {
                // Si el producto no existe, agregarlo con cantidad 1
                return [...prevItems, { ...product, qty: 1 }];
            }
        });
    };

    // Función para eliminar un producto del carrito
    const removeFromCart = (id) => {
        setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
    };

    // Función para ajustar la cantidad de un producto
    const updateQuantity = (id, newQty) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item._id === id ? { ...item, qty: newQty } : item
            )
        );
    };
    
    // Función para vaciar completamente el carrito
    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cartItems');
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart, // <-- ¡Añade esta línea!
            }}
        >
            {children}
        </CartContext.Provider>
    );
};