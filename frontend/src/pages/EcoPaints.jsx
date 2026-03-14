import React from 'react';
import { Link } from 'react-router-dom';
import { Droplets, ShieldCheck, Sun, Wind } from 'lucide-react';
import './Machinery.css'; /* Reusing header styles */
import './EcoPaints.css';

const EcoPaints = () => {
  const products = [
    { title: "Interior Eco Paints", desc: "Smooth finish for homes and offices. Breathable mapping and premium look.", icon: <ShieldCheck size={32} /> },
    { title: "Exterior Eco Paints", desc: "Weather-resistant natural paints built to withstand Indian climate conditions.", icon: <Sun size={32} /> },
    { title: "Distemper", desc: "Economical and breathable wall finish, perfect for rural and urban households.", icon: <Wind size={32} /> },
    { title: "Primer & Base Coats", desc: "For better adhesion, durability, and a flawless final coat.", icon: <Droplets size={32} /> }
  ];

  return (
    <div className="eco-paints-page">
      {/* Header */}
      <section className="page-header eco-paints-bg">
        <div className="container">
          <h1 className="page-title">Eco Green Paints</h1>
          <p className="page-subtitle">Natural, Safe, and Sustainable Wall Finishes</p>
        </div>
        <div className="header-overlay"></div>
      </section>

      {/* Brand Overview */}
      <section className="section-padding">
        <div className="container text-center max-w-800">
          <h2 className="section-title">Brand Overview</h2>
          <p className="section-subtitle">
            Eco Green Paints is a natural paint brand made from cow dung–based technology. The paints are safe, eco-friendly, low-odor, and suitable for residential, commercial, and institutional spaces.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-padding bg-alt">
        <div className="container">
          <div className="products-grid">
            {products.map((prod, index) => (
              <div key={index} className="product-card">
                <div className="product-icon">{prod.icon}</div>
                <h3>{prod.title}</h3>
                <p>{prod.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shades & Finishes */}
      <section className="section-padding">
        <div className="container text-center max-w-800">
          <h2 className="section-title mb-4">Shades & Finishes</h2>
          <p className="mb-5">
            Choose from a wide range of light, premium, and Indian-inspired natural shades. Our shades are designed to deliver a calm, clean, and premium look to your living spaces.
          </p>
          <Link to="/shop" className="btn-primary">Browse Shop & Select Shades</Link>
        </div>
      </section>

    </div>
  );
};

export default EcoPaints;
