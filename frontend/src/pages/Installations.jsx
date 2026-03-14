import React from 'react';
import { Map, MapPin } from 'lucide-react';

const Installations = () => {
  return (
    <div className="installations-page section-padding">
      <div className="container text-center">
        <Map size={48} className="text-primary mb-4 block-center" />
        <h1 className="section-title">Installations Overview</h1>
        <p className="section-subtitle">
          Namami Gaiya has successfully installed cow dung paint plants across multiple states in India, empowering local communities and entrepreneurs.
        </p>

        <div className="grid-3 mt-6">
          <div className="stat-box glass-effect">
            <MapPin size={32} className="text-primary block-center mb-2" />
            <h3 className="stat-number">150+</h3>
            <p className="stat-text">Installations in Chhattisgarh</p>
          </div>

          <div className="stat-box glass-effect">
            <MapPin size={32} className="text-primary block-center mb-2" />
            <h3 className="stat-number">13+</h3>
            <p className="stat-text">Installations in Uttar Pradesh</p>
          </div>

          <div className="stat-box glass-effect">
            <MapPin size={32} className="text-primary block-center mb-2" />
            <h3 className="stat-number">Pan-India</h3>
            <p className="stat-text">Ongoing Installations in Other States</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Installations;
