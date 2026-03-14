import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Save, LogOut, Image as ImageIcon, TicketIcon } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import CouponManagement from './CouponManagement';
import './Admin.css';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const { fetchPageContent } = useContent();

    const [activeTab, setActiveTab] = useState('home');
    const [saving, setSaving] = useState(false);

    // Editable State
    const [contentData, setContentData] = useState({
        title: '',
        sections: {},
        images: {}
    });

    // Check token
    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) navigate('/admin');
        else if (activeTab !== 'coupons') loadContent(activeTab);
    }, [navigate, activeTab]);

    const loadContent = async (pageRoute) => {
        try {
            const res = await fetch(`\${import.meta.env.VITE_API_URL || `\${import.meta.env.VITE_API_URL || 'http://localhost:5000'}`}/api/admin/content/${pageRoute}`);
            const data = await res.json();
            if (data.success && data.data) {
                setContentData({
                    title: data.data.title || '',
                    sections: data.data.sections || {},
                    images: data.data.images || {}
                });
            } else {
                setContentData({ title: '', sections: {}, images: {} }); // Reset if new
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin');
    };

    const handleTextChange = (sectionKey, value) => {
        setContentData(prev => ({
            ...prev,
            sections: { ...prev.sections, [sectionKey]: value }
        }));
    };

    const handleImageUpload = async (e, imageKey) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        try {
            const token = localStorage.getItem('adminToken');
            const res = await fetch(`\${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/admin/upload`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData
            });
            const data = await res.json();

            if (data.success) {
                setContentData(prev => ({
                    ...prev,
                    images: { ...prev.images, [imageKey]: `\${import.meta.env.VITE_API_URL || `\${import.meta.env.VITE_API_URL || 'http://localhost:5000'}`}${data.imageUrl}` }
                }));
            }
        } catch (err) {
            console.error('Upload failed:', err);
            alert('Image upload failed');
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const token = localStorage.getItem('adminToken');
            const res = await fetch(`\${import.meta.env.VITE_API_URL || `\${import.meta.env.VITE_API_URL || 'http://localhost:5000'}`}/api/admin/content/${activeTab}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(contentData)
            });
            const data = await res.json();
            if (data.success) {
                alert('Content saved successfully!');
                fetchPageContent(activeTab); // Refresh context
            }
        } catch (err) {
            alert('Error saving content');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar bg-alt">
                <div className="admin-logo">
                    <LayoutDashboard size={24} />
                    <h2>CMS Panel</h2>
                </div>
                <nav className="admin-nav">
                    <button className={activeTab === 'home' ? 'active' : ''} onClick={() => handleTabChange('home')}>Home Page</button>
                    <button className={activeTab === 'about' ? 'active' : ''} onClick={() => handleTabChange('about')}>About Us</button>
                    <button className={activeTab === 'machinery' ? 'active' : ''} onClick={() => handleTabChange('machinery')}>Machinery</button>
                    <button className={activeTab === 'footer' ? 'active' : ''} onClick={() => handleTabChange('footer')}>Footer</button>
                    <button className={activeTab === 'coupons' ? 'active' : ''} onClick={() => handleTabChange('coupons')} style={{ marginTop: '20px', borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '10px' }}>
                        Influencer Coupons
                    </button>
                </nav>
                <div className="admin-logout">
                    <button onClick={handleLogout} className="btn-outline w-100 flex-center gap-2">
                        <LogOut size={16} /> Logout
                    </button>
                </div>
            </aside>

            <main className="admin-main section-padding">
                <div className="admin-header flex-center" style={{ justifyContent: 'space-between', marginBottom: '30px' }}>
                    <h1>{activeTab === 'coupons' ? 'Manage Influencer Coupons' : `Editing: ${activeTab.toUpperCase()}`}</h1>
                    {activeTab !== 'coupons' && (
                        <button onClick={handleSave} className="btn-primary flex-center gap-2" disabled={saving}>
                            <Save size={18} /> {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                    )}
                </div>

                {activeTab === 'coupons' ? (
                    <CouponManagement />
                ) : (
                    <div className="admin-editor glass-effect p-4" style={{ borderRadius: '12px' }}>
                        <div className="mb-4">
                            <label className="font-bold">Page Title (SEO)</label>
                            <input
                                type="text"
                                className="form-input"
                                value={contentData.title || ''}
                                onChange={(e) => setContentData({ ...contentData, title: e.target.value })}
                            />
                        </div>

                        <h3 className="mb-3 mt-5" style={{ color: 'var(--primary-dark)' }}>Text Content Sections</h3>

                        {/* Dynamic Text Editor Interface base */}
                        <div className="editor-grid grid-2">
                            <div className="mb-4">
                                <label>Hero Heading</label>
                                <input
                                    type="text" className="form-input"
                                    value={contentData.sections?.heroHeading || ''}
                                    onChange={(e) => handleTextChange('heroHeading', e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label>Hero Subheading</label>
                                <textarea
                                    className="form-input" rows="3"
                                    value={contentData.sections?.heroSubheading || ''}
                                    onChange={(e) => handleTextChange('heroSubheading', e.target.value)}
                                />
                            </div>
                            {/* We can add more specific fields mapped dynamically later */}
                        </div>

                        <h3 className="mb-3 mt-5" style={{ color: 'var(--primary-dark)' }}>Image Assets</h3>
                        <div className="editor-grid grid-3">

                            <div className="image-uploader-box">
                                <label>Hero Background Image</label>
                                <div className="upload-preview mb-2" style={{ height: '150px', background: '#eef3ef', borderRadius: '8px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {contentData.images?.heroBg ? (
                                        <img src={contentData.images.heroBg} alt="Hero" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <ImageIcon size={40} className="text-muted" />
                                    )}
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, 'heroBg')}
                                    className="form-input"
                                />
                            </div>

                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;
