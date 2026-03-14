import React from 'react';
import { Target, Eye, Info } from 'lucide-react';
import './About.css';

const About = () => {
  return (
    <div className="about-page section-padding">
      <div className="container">

        <div className="about-header text-center">
          <h1 className="section-title">About Us</h1>
          <p className="section-subtitle">Pioneering a sustainable, indigenous ecosystem</p>
        </div>

        <div className="about-content grid-2 align-items-center">
          <div className="about-image-box">
            <img src="https://namamigaiya.com/static/media/gallery7.e43026bec84ba2fe0414.jpg" alt="About Namami Gaiya" className="mock-image" style={{ objectFit: 'cover' }} />
          </div>
          <div className="about-text-box">
            <h2 className="mb-4">Namami Gaiya Khadi Prakritik Paint Pvt. Ltd.</h2>
            <p className="mb-4">
              We are an Indian manufacturing company committed to sustainable and indigenous paint solutions. We specialize in cow dung paint machinery and eco-friendly paint products, supporting government initiatives, gaushalas, and green entrepreneurship.
            </p>
          </div>
        </div>

        <div className="vision-mission-grid mt-6">
          <div className="vm-card glass-effect">
            <div className="vm-icon"><Eye size={40} /></div>
            <h2>Vision</h2>
            <p>
              To build a sustainable, chemical-free paint ecosystem that supports rural employment and environmental protection.
            </p>
          </div>

          <div className="vm-card glass-effect">
            <div className="vm-icon"><Target size={40} /></div>
            <h2>Mission</h2>
            <p>
              To deliver reliable cow dung paint machinery and eco-friendly paints through innovation, quality, and nationwide execution.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
