import React from 'react';
import { Link } from 'react-router-dom';
import { Settings, Droplets, CheckCircle, ShieldCheck, Factory, Award, ArrowRight } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import './Home.css';

const Home = () => {
  const { getContent } = useContent();
  const content = getContent('home') || {}; // Fallback during load

  // Safely extract text fields with defaults from the original site
  const sections = content.sections || {};
  const images = content.images || {};

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section" style={images.heroBg ? { backgroundImage: `url(${images.heroBg})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}>
        <div className="container hero-container">
          <div className="hero-content glass-effect">
            <h1 className="hero-title">{sections.heroHeading || 'India’s Cow Dung Paint & Machinery Ecosystem'}</h1>
            <p className="hero-subtitle">
              {sections.heroSubheading || 'Manufacturing cow dung paint machinery, executing government projects, and delivering eco-friendly paints through our brand Eco Green Paints.'}
            </p>
            <div className="hero-buttons">
              <Link to="/contact" className="btn-primary">Machinery Enquiry</Link>
              <Link to="/shop" className="btn-outline">Buy Paint Online</Link>
            </div>
          </div>
        </div>
        {!images.heroBg && <div className="hero-overlay"></div>}
      </section>

      {/* Two Division Section */}
      <section className="divisions-section section-padding">
        <div className="container">
          <div className="grid-2">

            {/* Machinery Division */}
            <div className="division-card card-machinery">
              <div className="division-icon">
                <Settings size={48} />
              </div>
              <h2>Machinery Division</h2>
              <p>
                We manufacture and supply cow dung paint machinery and turnkey plant solutions for government bodies, gaushalas, NGOs, and institutions across India.
              </p>
              <Link to="/machinery" className="card-link">View Machinery Solutions <ArrowRight size={18} /></Link>
            </div>

            {/* Eco Green Paints */}
            <div className="division-card card-paints">
              <div className="division-icon">
                <Droplets size={48} />
              </div>
              <h2>Eco Green Paints</h2>
              <p>
                Eco Green Paints is our natural paint brand made using cow dung–based technology, offering safe, sustainable, and premium-finish paints.
              </p>
              <Link to="/eco-paints" className="card-link">Explore Eco Green Paints <ArrowRight size={18} /></Link>
            </div>

          </div>
        </div>
      </section>

      {/* Key Achievements Section */}
      <section className="achievements-section section-padding bg-alt">
        <div className="container">
          <div className="achievements-grid">
            <div className="stat-box">
              <h3 className="stat-number">150+</h3>
              <p className="stat-text">Cow Dung Paint Plants Installed in Chhattisgarh</p>
            </div>
            <div className="stat-box">
              <h3 className="stat-number">13+</h3>
              <p className="stat-text">Cow Dung Paint Plants Installed in Uttar Pradesh</p>
            </div>
            <div className="stat-box">
              <h3 className="stat-number">Pan-India</h3>
              <p className="stat-text">Active Presence Across Multiple Indian States</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Namami Gaiya Section */}
      <section className="why-us-section section-padding">
        <div className="container text-center">
          <h2 className="section-title">Why Namami Gaiya</h2>
          <p className="section-subtitle">Pioneering sustainable solutions for a greener future</p>

          <div className="grid-3 features-grid">
            <div className="feature-item">
              <div className="feature-icon-wrapper"><Award size={36} /></div>
              <h4>Indigenous & Sustainable Innovation</h4>
            </div>
            <div className="feature-item">
              <div className="feature-icon-wrapper"><Factory size={36} /></div>
              <h4>Proven Government & Institutional Experience</h4>
            </div>
            <div className="feature-item">
              <div className="feature-icon-wrapper"><Settings size={36} /></div>
              <h4>End-to-End Technical Support</h4>
            </div>
            <div className="feature-item">
              <div className="feature-icon-wrapper"><ShieldCheck size={36} /></div>
              <h4>Eco-Friendly & Chemical-Free Solutions</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Work Orders Preview */}
      <section className="preview-section align-left section-padding bg-alt">
        <div className="container grid-2 align-items-center">
          <div className="preview-content">
            <h2 className="section-title">Government & Institutional Work Orders</h2>
            <p>
              Namami Gaiya has successfully executed multiple government and institutional work orders related to cow dung paint plants and eco-friendly paint initiatives.
            </p>
            <br />
            <Link to="/work-orders" className="btn-primary">View All Work Orders</Link>
          </div>
          <div className="preview-image-box">
            <img src="https://namamigaiya.com/static/media/pro1.d16812839b2cd48c4ae8.jpg" alt="Work Orders" className="mock-image" style={{ objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      {/* Media Preview */}
      <section className="preview-section align-right section-padding">
        <div className="container grid-2 align-items-center">
          <div className="preview-image-box order-2">
            <img src="https://namamigaiya.com/static/media/gallery4.ad3084493e45c931f40c.jpg" alt="Media" className="mock-image" style={{ objectFit: 'cover' }} />
          </div>
          <div className="preview-content order-1">
            <h2 className="section-title">In The Media</h2>
            <p>
              Our work and innovation have been featured across print, digital, and electronic media platforms.
            </p>
            <br />
            <Link to="/media" className="btn-primary">View Media & News</Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
