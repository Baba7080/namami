import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Package, Calculator } from 'lucide-react';
import './Shop.css'; // Reusing some shop styles

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const [product, setProduct] = useState(null);
    const [shade, setShade] = useState('Classic White');
    const [packSize, setPackSize] = useState('1 Ltr');
    const [quantity, setQuantity] = useState(1);

    // Calculator state
    const [roomArea, setRoomArea] = useState('');
    const coveragePerLtr = 100; // sq ft per litre

    useEffect(() => {
        // Simulated fetch for product details
        const fetchProduct = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/products');
                const data = await res.json();
                const found = data.find(p => p.id === parseInt(id)) || null;
                setProduct(found);
            } catch (err) {
                // Fallback mock
                const mockProducts = [
                    { id: 1, name: 'Interior Eco Paint', description: 'Smooth finish for homes and offices', category: 'Paint', price: 250 },
                    { id: 2, name: 'Exterior Eco Paint', description: 'Weather-resistant natural paint', category: 'Paint', price: 280 },
                    { id: 3, name: 'Distemper', description: 'Economical and breathable wall finish', category: 'Paint', price: 150 },
                    { id: 4, name: 'Primer & Base Coats', description: 'For better adhesion and durability', category: 'Primer', price: 200 }
                ];
                setProduct(mockProducts.find(p => p.id === parseInt(id)));
            }
        };
        fetchProduct();
    }, [id]);

    const handleCalculate = () => {
        if (roomArea > 0) {
            const needed = Math.ceil(roomArea / coveragePerLtr);
            setQuantity(needed);
        }
    };

    const handleAddToCart = () => {
        if (product) {
            // Adjust price for different sizes if needed, here keeping simple
            addToCart({ ...product, packSize }, shade, parseInt(quantity));
            navigate('/cart');
        }
    };

    if (!product) return <div className="section-padding text-center">Loading product details...</div>;

    return (
        <div className="product-detail-page section-padding">
            <div className="container">
                <button onClick={() => navigate('/shop')} className="btn-outline mb-4">&larr; Back to Shop</button>

                <div className="grid-2 mt-4">

                    <div className="product-image-box">
                        <img src="https://namamigaiya.com/static/media/pro1.d16812839b2cd48c4ae8.jpg" alt="Product" className="mock-image" style={{ height: '500px', objectFit: 'cover' }} />
                    </div>

                    <div className="product-info-box">
                        <h1 className="product-title">{product.name}</h1>
                        <p className="product-price">₹{product.price} / Litre</p>
                        <p className="product-desc">{product.description}</p>
                        <hr className="divider" />

                        <div className="options-group">
                            <label>Available Pack Sizes</label>
                            <select value={packSize} onChange={(e) => setPackSize(e.target.value)} className="form-input">
                                <option value="1 Ltr">1 Litre</option>
                                <option value="4 Ltr">4 Litres</option>
                                <option value="10 Ltr">10 Litres</option>
                                <option value="20 Ltr">20 Litres</option>
                            </select>
                        </div>

                        <div className="options-group">
                            <label>Select Shade</label>
                            <select value={shade} onChange={(e) => setShade(e.target.value)} className="form-input">
                                <option value="Classic White">Classic White</option>
                                <option value="Earthy Beige">Earthy Beige</option>
                                <option value="Soft Green">Soft Green</option>
                                <option value="Terracotta Red">Terracotta Red</option>
                                <option value="Ocean Blue">Ocean Blue</option>
                            </select>
                        </div>

                        <div className="calculator-box glass-effect">
                            <h4><Calculator size={20} /> Quantity Calculator</h4>
                            <p className="text-sm text-muted">Enter area to estimate required paint (Coverage: ~100 sq.ft/L)</p>
                            <div className="calc-flex">
                                <input
                                    type="number"
                                    placeholder="Area (sq.ft)"
                                    value={roomArea}
                                    onChange={(e) => setRoomArea(e.target.value)}
                                    className="form-input"
                                />
                                <button type="button" onClick={handleCalculate} className="btn-outline calc-btn">Calculate</button>
                            </div>
                        </div>

                        <div className="options-group quantity-box">
                            <label>Quantity</label>
                            <input
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                className="form-input"
                            />
                        </div>

                        <button onClick={handleAddToCart} className="btn-primary add-cart-btn">Add to Cart</button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
