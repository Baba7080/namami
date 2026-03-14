import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Mail, Phone, MapPin } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import './Footer.css';

const Footer = () => {
    const { getContent } = useContent();
    const content = getContent('footer') || {}; // Fetch 'footer' from MongoDB

    // Safely extract
    const sections = content.sections || {};
    const images = content.images || {};

    return (
        <footer className="footer bg-alt">
            <div className="container">
                <div className="footer-grid">

                    <div className="footer-brand">
                        <Link to="/" className="footer-logo">
                            {images.logo ? (
                                <img src={images.logo} alt="Namami Gaiya Logo" style={{ height: '50px' }} />
                            ) : (
                                <img src="https://namamigaiya.com/static/media/Logonamami.ed4ae7367c0500cb105e.png" alt="Namami Gaiya Logo" style={{ height: '50px' }} />
                            )}
                            <h2 style={{ marginLeft: '10px' }}>{sections.brandName || 'Namami Gaiya'}</h2>
                        </Link>
                        <p className="footer-desc">
                            {sections.brandDesc || "India's leading manufacturer of cow dung paint machinery and provider of eco-friendly paints under the brand Eco Green Paints."}
                        </p>
                    </div>

                    <div className="footer-links">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/machinery">Machinery Division</Link></li>
                            <li><Link to="/eco-paints">Eco Green Paints</Link></li>
                            <li><Link to="/franchise">Franchise Network</Link></li>
                            <li><Link to="/work-orders">Work Orders</Link></li>
                            <li><Link to="/media">Media & News</Link></li>
                            <li><Link to="/blog">Blog</Link></li>
                            <li><Link to="/contact">Contact Us</Link></li>
                        </ul>
                    </div>

                    <div className="footer-contact">
                        <h3>Contact Info</h3>
                        <ul>
                            <li>
                                <MapPin size={18} />
                                <span><strong>Corporate Office:</strong> {sections.address || 'Namami Gaiya Khadi Prakritik Paint Pvt. Ltd. | Manufacturing Units: Uttar Pradesh | Bihar'}</span>
                            </li>
                            <li>
                                <Phone size={18} />
                                <span>{sections.phone || '+91 98765 43210'}</span>
                            </li>
                            <li>
                                <Mail size={18} />
                                <span>{sections.email || 'info@namamigaiya.com'}</span>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="footer-bottom">
                    <p>
                        &copy; {new Date().getFullYear()} {sections.copyrightText || 'Eco Green Paints is a brand of Namami Gaiya Khadi Prakritik Paint Pvt. Ltd. All rights reserved.'}
                    </p>
                    <div className="footer-legal">
                        <Link to="/privacy-policy">Privacy Policy</Link>
                        <Link to="/terms-conditions">Terms & Conditions</Link>
                        <Link to="/refund-policy">Refund & Shipping Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
