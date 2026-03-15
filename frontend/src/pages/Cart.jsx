import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, CheckCircle } from 'lucide-react';
import './Cart.css';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    const [promoCode, setPromoCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [promoMsg, setPromoMsg] = useState('');

    const [customer, setCustomer] = useState({ name: '', email: '', phone: '', address: '' });
    const [paymentMethod, setPaymentMethod] = useState('UPI');
    const [orderComplete, setOrderComplete] = useState(null);

    const handleApplyPromo = async () => {
        if (!promoCode) return;
        setPromoMsg('Validating...');

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/coupons/validate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: promoCode })
            });
            const data = await res.json();

            if (data.valid) {
                const discountAmt = getCartTotal() * (data.discountPercentage / 100);
                setDiscount(discountAmt);
                setPromoMsg(`${data.discountPercentage}% Discount Applied!`);
            } else {
                setDiscount(0);
                setPromoMsg(data.message || 'Invalid Promo Code');
            }
        } catch (err) {
            setDiscount(0);
            setPromoMsg('Error validating code');
        }
    };

    const finalTotal = getCartTotal() - discount;

    const handleCheckout = async (e) => {
        e.preventDefault();
        if (cartItems.length === 0) return;

        // Simulate API Call
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    orderItems: cartItems,
                    total: finalTotal,
                    customerInfo: customer
                })
            });
            const data = await res.json();
            if (data.success) {
                setOrderComplete(data.orderId);
                clearCart();
            }
        } catch (err) {
            console.error(err);
            // Fallback
            setOrderComplete('ORD-' + Math.floor(Math.random() * 100000));
            clearCart();
        }
    };

    if (orderComplete) {
        return (
            <div className="section-padding container text-center">
                <CheckCircle size={80} className="text-primary block-center mb-4" />
                <h1 className="section-title">Order Confirmed!</h1>
                <p className="text-lg">Thank you for your purchase. Your order ID is <strong>{orderComplete}</strong>.</p>
                <Link to="/" className="btn-primary mt-6">Return to Home</Link>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="section-padding container text-center">
                <h1 className="section-title">Your Cart is Empty</h1>
                <p className="mb-4">Looks like you haven't added any paints yet.</p>
                <Link to="/shop" className="btn-primary">Browse Shop</Link>
            </div>
        );
    }

    return (
        <div className="cart-page section-padding">
            <div className="container">
                <h1 className="section-title mb-5">Shopping Cart</h1>

                <div className="cart-grid">
                    {/* Cart Items List */}
                    <div className="cart-items">
                        {cartItems.map((item, idx) => (
                            <div key={idx} className="cart-item-card glass-effect">
                                <div className="item-info">
                                    <h3>{item.name}</h3>
                                    <p className="text-muted">Shade: {item.shade} | Pack: {item.packSize}</p>
                                </div>
                                <div className="item-controls">
                                    <div className="qty-control">
                                        <button onClick={() => updateQuantity(item.id, item.shade, item.quantity - 1)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.shade, item.quantity + 1)}>+</button>
                                    </div>
                                    <div className="item-price">₹{item.price * item.quantity}</div>
                                    <button onClick={() => removeFromCart(item.id, item.shade)} className="remove-btn">
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}

                        {/* Promo Code */}
                        <div className="promo-box glass-effect mt-4">
                            <h4>Have a Promo Code?</h4>
                            <div className="calc-flex">
                                <input
                                    type="text"
                                    value={promoCode}
                                    onChange={(e) => setPromoCode(e.target.value)}
                                    placeholder="Enter code"
                                    className="form-input"
                                />
                                <button onClick={handleApplyPromo} className="btn-outline">Apply</button>
                            </div>
                            {promoMsg && <p className="promo-msg">{promoMsg}</p>}
                        </div>
                    </div>

                    {/* Checkout Form & Summary */}
                    <div className="checkout-sidebar">
                        <div className="summary-box glass-effect mb-4">
                            <h3>Order Summary</h3>
                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>₹{getCartTotal().toFixed(2)}</span>
                            </div>
                            {discount > 0 && (
                                <div className="summary-row discount">
                                    <span>Discount</span>
                                    <span>-₹{discount.toFixed(2)}</span>
                                </div>
                            )}
                            <hr className="divider" />
                            <div className="summary-row total">
                                <span>Total</span>
                                <span>₹{finalTotal.toFixed(2)}</span>
                            </div>
                        </div>

                        <form onSubmit={handleCheckout} className="checkout-form glass-effect">
                            <h3>Checkout Details</h3>
                            <input required type="text" placeholder="Full Name" className="form-input" value={customer.name} onChange={e => setCustomer({ ...customer, name: e.target.value })} />
                            <input required type="email" placeholder="Email Address" className="form-input" value={customer.email} onChange={e => setCustomer({ ...customer, email: e.target.value })} />
                            <input required type="tel" placeholder="Phone Number" className="form-input" value={customer.phone} onChange={e => setCustomer({ ...customer, phone: e.target.value })} />
                            <textarea required placeholder="Delivery Address" className="form-input" rows="3" value={customer.address} onChange={e => setCustomer({ ...customer, address: e.target.value })}></textarea>

                            <div className="payment-options">
                                <label className="radio-label">
                                    <input type="radio" value="UPI" checked={paymentMethod === 'UPI'} onChange={(e) => setPaymentMethod(e.target.value)} /> UPI Payment
                                </label>
                                <label className="radio-label">
                                    <input type="radio" value="Card" checked={paymentMethod === 'Card'} onChange={(e) => setPaymentMethod(e.target.value)} /> Credit/Debit Card
                                </label>
                                <label className="radio-label">
                                    <input type="radio" value="Net Banking" checked={paymentMethod === 'Net Banking'} onChange={(e) => setPaymentMethod(e.target.value)} /> Net Banking
                                </label>
                            </div>

                            <button type="submit" className="btn-primary w-100 mt-4">Place Order (₹{finalTotal.toFixed(2)})</button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Cart;
