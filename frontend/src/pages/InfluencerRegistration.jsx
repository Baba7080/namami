import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Gift, CheckCircle } from 'lucide-react';
import './InfluencerRegistration.css';

const InfluencerRegistration = () => {
    const [formData, setFormData] = useState({ name: '', phone: '', instagramId: '' });
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch(`\${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/influencer/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();

            if (data.success) {
                setResult({
                    code: data.code,
                    discount: data.discountPercentage
                });
            } else {
                setError(data.message || 'Registration failed');
                if (data.code) {
                    setResult({ code: data.code, discount: 10, existing: true });
                }
            }
        } catch (err) {
            setError('Server connection error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (result) {
        return (
            <div className="section-padding container text-center">
                <CheckCircle size={80} className="text-primary block-center mb-4" />
                <h1 className="section-title">{result.existing ? 'Welcome Back!' : 'Registration Successful!'}</h1>
                <p className="text-lg mt-3">
                    Your exclusive Influencer Coupon Code is:
                </p>
                <div className="coupon-display mt-4 mb-4" style={{
                    background: 'rgba(30, 123, 52, 0.1)',
                    display: 'inline-block',
                    padding: '15px 30px',
                    borderRadius: '8px',
                    border: '2px dashed var(--primary)',
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    color: 'var(--primary-dark)',
                    letterSpacing: '2px'
                }}>
                    {result.code}
                </div>
                <p className="mb-5">
                    Share this code with your followers to give them a <strong>{result.discount}% discount</strong> on their entire purchase!
                </p>
                <div className="flex-center gap-4">
                    <button onClick={() => navigator.clipboard.writeText(result.code)} className="btn-outline">
                        Copy Code
                    </button>
                    <Link to="/shop" className="btn-primary">Go to Shop</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="influencer-page section-padding">
            <div className="container">
                <div className="influencer-header text-center mb-5">
                    <Gift size={48} className="text-primary mx-auto mb-3" />
                    <h1 className="section-title">Partner With Us</h1>
                    <p className="text-muted max-w-2xl mx-auto">
                        Join our Influencer Program today! Register below to receive your exclusive coupon code. Share it with your friends and followers to give them a special discount on all Namami Gaiya products.
                    </p>
                </div>

                <div className="glass-effect registration-card mx-auto p-5" style={{ maxWidth: '500px', borderRadius: '12px' }}>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="font-bold block mb-2">Full Name *</label>
                            <input
                                type="text"
                                required
                                className="form-input w-100"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="font-bold block mb-2">Contact Number *</label>
                            <input
                                type="tel"
                                required
                                className="form-input w-100"
                                placeholder="Enter your phone number"
                                value={formData.phone}
                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>
                        <div className="mb-5">
                            <label className="font-bold block mb-2">Instagram ID <span className="text-muted fw-normal">(Optional)</span></label>
                            <input
                                type="text"
                                className="form-input w-100"
                                placeholder="@username"
                                value={formData.instagramId}
                                onChange={e => setFormData({ ...formData, instagramId: e.target.value })}
                            />
                        </div>

                        {error && <p className="text-danger mb-4" style={{ color: '#c62828' }}>{error}</p>}

                        <button type="submit" className="btn-primary w-100 py-3" disabled={loading} style={{ fontSize: '1.1rem' }}>
                            {loading ? 'Generating Code...' : 'Get My Coupon Code'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default InfluencerRegistration;
