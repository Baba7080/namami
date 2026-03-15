import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Power } from 'lucide-react';
import './CouponManagement.css';

const CouponManagement = () => {
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newCoupon, setNewCoupon] = useState({ code: '', discountPercentage: '' });
    const [error, setError] = useState('');

    const fetchCoupons = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/admin/coupons`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                setCoupons(data.data);
            }
        } catch (err) {
            console.error('Failed to load coupons', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCoupons();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        setError('');
        if (!newCoupon.code || !newCoupon.discountPercentage) return;

        try {
            const token = localStorage.getItem('adminToken');
            const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/admin/coupons`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newCoupon)
            });
            const data = await res.json();
            if (data.success) {
                setCoupons([...coupons, data.data]);
                setNewCoupon({ code: '', discountPercentage: '' });
            } else {
                setError(data.message || 'Failed to create coupon');
            }
        } catch (err) {
            setError('Server connection error');
        }
    };

    const handleToggle = async (coupon) => {
        try {
            const token = localStorage.getItem('adminToken');
            const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/admin/coupons/${coupon.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ isActive: !coupon.isActive })
            });
            const data = await res.json();
            if (data.success) {
                setCoupons(coupons.map(c => c.id === coupon.id ? data.data : c));
            }
        } catch (err) {
            console.error('Failed to toggle coupon status');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this coupon?')) return;

        try {
            const token = localStorage.getItem('adminToken');
            const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/admin/coupons/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                setCoupons(coupons.filter(c => c.id !== id));
            }
        } catch (err) {
            console.error('Failed to delete coupon');
        }
    };

    return (
        <div className="coupons-container admin-editor glass-effect p-4">
            <h2 className="mb-4" style={{ color: 'var(--primary-dark)' }}>Influencer Coupons</h2>

            <form onSubmit={handleCreate} className="editor-grid grid-3 mb-5" style={{ alignItems: 'end' }}>
                <div>
                    <label>Influencer Code</label>
                    <input
                        type="text"
                        required
                        className="form-input"
                        placeholder="e.g. NAMAMI20"
                        value={newCoupon.code}
                        onChange={e => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
                    />
                </div>
                <div>
                    <label>Discount (%)</label>
                    <input
                        type="number"
                        required
                        min="1"
                        max="100"
                        className="form-input"
                        placeholder="e.g. 15"
                        value={newCoupon.discountPercentage}
                        onChange={e => setNewCoupon({ ...newCoupon, discountPercentage: e.target.value })}
                    />
                </div>
                <div>
                    <button type="submit" className="btn-primary flex-center gap-2 w-100">
                        <Plus size={18} /> Add Coupon
                    </button>
                </div>
            </form>

            {error && <p className="text-danger mb-3" style={{ color: '#c62828' }}>{error}</p>}

            <div className="table-responsive">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Discount</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="4">Loading coupons...</td></tr>
                        ) : coupons.length === 0 ? (
                            <tr><td colSpan="4">No active coupons found.</td></tr>
                        ) : (
                            coupons.map(coupon => (
                                <tr key={coupon.id}>
                                    <td className="font-bold">{coupon.code}</td>
                                    <td>{coupon.discountPercentage}%</td>
                                    <td>
                                        <span className={`status-badge ${coupon.isActive ? 'active' : 'inactive'}`}>
                                            {coupon.isActive ? 'Active' : 'Disabled'}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleToggle(coupon)}
                                            className="admin-btn toggle"
                                            title={coupon.isActive ? "Disable" : "Enable"}
                                        >
                                            <Power size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(coupon.id)}
                                            className="admin-btn delete"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CouponManagement;
