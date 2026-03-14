import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => {
        setIsOpen(false);
        setOpenDropdown(null);
    };

    const toggleDropdown = (menu) => {
        setOpenDropdown(openDropdown === menu ? null : menu);
    };

    const navStructure = [
        { title: 'Home', path: '/' },
        { title: 'About Us', path: '/about' },
        {
            title: 'Divisions',
            dropdown: true,
            items: [
                { title: 'Machinery Division', path: '/machinery' },
                { title: 'Eco Green Paints', path: '/eco-paints' },
                { title: 'Franchise Network', path: '/franchise' }
            ]
        },
        {
            title: 'Resources',
            dropdown: true,
            items: [
                { title: 'Installations', path: '/installations' },
                { title: 'Work Orders', path: '/work-orders' },
                { title: 'Media & News', path: '/media' },
                { title: 'Blog', path: '/blog' },
                { title: 'Get a Coupon', path: '/influencer-program' }
            ]
        },
        { title: 'Contact Us', path: '/contact' }
    ];

    return (
        <header className="navbar glass-effect">
            <div className="container nav-container">

                {/* Brand / Logo */}
                <Link to="/" className="nav-logo" onClick={closeMenu}>
                    <img src="/logo.png" alt="Eco Green Paints Logo" style={{ height: '60px' }} />
                </Link>

                {/* Desktop Menu */}
                <nav className="nav-menu desktop-menu">
                    {navStructure.map((link) => (
                        link.dropdown ? (
                            <div className="nav-dropdown" key={link.title} onMouseEnter={() => setOpenDropdown(link.title)} onMouseLeave={() => setOpenDropdown(null)}>
                                <span className={`nav-link ${openDropdown === link.title ? 'active' : ''}`} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    {link.title} <ChevronDown size={14} />
                                </span>
                                {openDropdown === link.title && (
                                    <div className="dropdown-menu glass-effect">
                                        {link.items.map(subItem => (
                                            <NavLink key={subItem.title} to={subItem.path} className="dropdown-item" onClick={closeMenu}>
                                                {subItem.title}
                                            </NavLink>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <NavLink
                                key={link.title}
                                to={link.path}
                                onClick={closeMenu}
                                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                            >
                                {link.title}
                            </NavLink>
                        )
                    ))}
                </nav>

                {/* CTA */}
                <div className="nav-cta desktop-cta">
                    <Link to="/shop" className="btn-primary">Buy Paint Online</Link>
                </div>

                {/* Mobile Toggle */}
                <button className="mobile-toggle" onClick={toggleMenu} aria-label="Toggle Navigation">
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

            </div>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
                <nav className="mobile-nav-links">
                    {navStructure.map((link) => (
                        link.dropdown ? (
                            <div key={link.title} className="mobile-dropdown">
                                <button className="nav-link w-100 flex-center" style={{ justifyContent: 'space-between', background: 'transparent', border: 'none', padding: '15px' }} onClick={() => toggleDropdown(link.title)}>
                                    {link.title} <ChevronDown size={16} style={{ transform: openDropdown === link.title ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
                                </button>
                                {openDropdown === link.title && (
                                    <div className="mobile-dropdown-items pl-4">
                                        {link.items.map(subItem => (
                                            <NavLink key={subItem.title} to={subItem.path} className="nav-link" onClick={closeMenu} style={{ paddingLeft: '30px', fontSize: '1rem' }}>
                                                &#8226; {subItem.title}
                                            </NavLink>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <NavLink
                                key={link.title}
                                to={link.path}
                                onClick={closeMenu}
                                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                            >
                                {link.title}
                            </NavLink>
                        )
                    ))}
                    <Link to="/shop" className="btn-primary mobile-btn mt-4 mx-4" onClick={closeMenu}>Buy Paint Online</Link>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
