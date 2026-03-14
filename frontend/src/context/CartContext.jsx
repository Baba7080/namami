import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product, shade, quantity) => {
        setCartItems(prev => {
            // Check if item with same product & shade exists
            const existing = prev.find(item => item.id === product.id && item.shade === shade);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id && item.shade === shade
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prev, { ...product, shade, quantity }];
        });
    };

    const removeFromCart = (productId, shade) => {
        setCartItems(prev => prev.filter(item => !(item.id === productId && item.shade === shade)));
    };

    const updateQuantity = (productId, shade, quantity) => {
        setCartItems(prev => prev.map(item =>
            item.id === productId && item.shade === shade
                ? { ...item, quantity: Math.max(1, quantity) }
                : item
        ));
    };

    const clearCart = () => setCartItems([]);

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal }}>
            {children}
        </CartContext.Provider>
    );
};
