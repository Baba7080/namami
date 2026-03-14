import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            const data = await res.json();

            if (data.success) {
                localStorage.setItem('adminToken', data.token);
                navigate('/admin/dashboard');
            } else {
                setError(data.message || 'Invalid Credentials');
            }
        } catch (err) {
            setError('Server connection failed');
        }
    };

    return (
        <div className="section-padding flex-center" style={{ minHeight: '80vh' }}>
            <div className="glass-effect" style={{ padding: '40px', maxWidth: '400px', width: '100%', borderRadius: '12px' }}>
                <div className="text-center mb-4">
                    <Lock size={40} className="text-primary block-center mb-2" />
                    <h2 style={{ color: 'var(--primary-dark)' }}>Admin Portal</h2>
                    <p className="text-muted text-sm">Sign in to manage website content</p>
                </div>

                {error && <div style={{ color: 'red', marginBottom: '15px', textAlign: 'center', fontSize: '0.9rem' }}>{error}</div>}

                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label>Username</label>
                        <input
                            type="text"
                            className="form-input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-primary w-100 mt-2">Sign In</button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
