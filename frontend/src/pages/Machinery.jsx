import React from 'react';
import { Link } from 'react-router-dom';
import { Settings, CheckCircle } from 'lucide-react';
import './Machinery.css';

const Machinery = () => {
  const plantTypes = [
    { title: "Small Capacity Plants", desc: "Ideal for small gaushalas and local entrepreneurs starting their journey." },
    { title: "Medium Capacity Plants", desc: "Perfect for regional distributors and mid-sized NGOs." },
    { title: "Large Capacity Plants", desc: "Designed for state-level government projects and mass production." },
    { title: "Customized Turnkey Plants", desc: "Tailor-made solutions to fit specific geographical and capacity needs." }
  ];

  const turnkeySteps = [
    "Project Planning & Layout",
    "Machinery Manufacturing",
    "Installation & Commissioning",
    "Operator Training",
    "After-Sales Support"
  ];

  return (
    <div className="machinery-page">
      {/* Header */}
      <section className="page-header machinery-bg">
        <div className="container">
          <h1 className="page-title">Machinery Division</h1>
          <p className="page-subtitle">Pioneering Cow Dung Paint Manufacturing Technology</p>
        </div>
        <div className="header-overlay"></div>
      </section>

      {/* Overview */}
      <section className="section-padding">
        <div className="container text-center max-w-800">
          <Settings size={48} className="text-primary mb-4 block-center" />
          <h2 className="section-title">End-to-End Solutions</h2>
          <p className="section-subtitle">
            We design, manufacture, and install complete cow dung paint plant machinery with scalable capacities. Our solutions are suitable for government departments, gaushalas, NGOs, and institutions across India.
          </p>
        </div>
      </section>

      {/* Plant Types */}
      <section className="section-padding bg-alt">
        <div className="container">
          <h2 className="section-title text-center mb-5">Plant Types & Capacities</h2>
          <div className="grid-2">
            {plantTypes.map((plant, index) => (
              <div key={index} className="plant-card">
                <h3>{plant.title}</h3>
                <p>{plant.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Turnkey Solutions */}
      <section className="section-padding">
        <div className="container grid-2 align-items-center">
          <div className="turnkey-content">
            <h2 className="section-title mb-4">Turnkey Solutions</h2>
            <ul className="turnkey-list">
              {turnkeySteps.map((step, index) => (
                <li key={index}>
                  <CheckCircle className="text-primary" size={24} />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Link to="/contact" className="btn-primary">Request Machinery Proposal</Link>
            </div>
          </div>
          <div className="turnkey-image">
            <img src="https://namamigaiya.com/static/media/gallery3.16be9567ec574b60d32a.jpg" alt="Machinery Plant" className="mock-image" style={{ objectFit: 'cover' }} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Machinery;
