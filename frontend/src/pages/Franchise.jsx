import React, { useState } from 'react';
import { Network, MapPin, CheckCircle } from 'lucide-react';

const Franchise = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    city: '',
    phone: '',
    email: '',
    investment: '',
    message: ''
  });
  const [status, setStatus] = useState(null);

  const locations = ["Karnataka", "Maharashtra", "Madhya Pradesh", "Rajasthan"];
  const offers = ["Eco Green Paints brand rights", "Manufacturing & supply support", "Marketing & branding assistance", "Technical guidance & training"];
  const highlights = ["Transparent business model", "Scalable growth opportunity", "Support from Namami Gaiya team"];

  const handleApply = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/enquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, type: 'Franchise' })
      });
      setStatus("Application Sent Successfully! Our team will contact you shortly.");
      setFormData({ name: '', company: '', city: '', phone: '', email: '', investment: '', message: '' });
    } catch (err) {
      setStatus("Application Sent (Mock)");
    }
  };

  return (
    <div className="franchise-page section-padding">
      <div className="container">
        <div className="text-center mb-5 max-w-800">
          <Network size={48} className="text-primary mb-4 block-center" />
          <h1 className="section-title">Franchise Network</h1>
          <p className="section-subtitle">
            Eco Green Paints is expanding its franchise network across India. We invite entrepreneurs, distributors, and business partners to join our eco-friendly paint movement.
          </p>
        </div>

        <div className="grid-2 mt-6">

          {/* Info Section */}
          <div>
            <div className="glass-effect p-4 mb-4" style={{ padding: '30px', borderRadius: '12px' }}>
              <h3 className="mb-4">Existing Franchise Locations</h3>
              <ul className="turnkey-list">
                {locations.map((loc, idx) => (
                  <li key={idx} style={{ marginBottom: '10px' }}><MapPin className="text-primary" /> {loc}</li>
                ))}
              </ul>
            </div>

            <div className="glass-effect p-4" style={{ padding: '30px', borderRadius: '12px' }}>
              <h3 className="mb-4">What We Offer</h3>
              <ul className="turnkey-list mb-4">
                {offers.map((offer, idx) => (
                  <li key={idx} style={{ marginBottom: '10px' }}><CheckCircle className="text-primary" /> {offer}</li>
                ))}
              </ul>

              <h3 className="mb-4">Franchise Model Highlights</h3>
              <ul className="turnkey-list">
                {highlights.map((hlt, idx) => (
                  <li key={idx} style={{ marginBottom: '10px' }}><CheckCircle className="text-primary" /> {hlt}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Form Section */}
          <div className="franchise-form-box glass-effect" style={{ padding: '40px', borderRadius: '12px' }}>
            <h2 className="mb-4">Be a Franchise Partner</h2>
            <p className="text-muted mb-4">Entrepreneurs, Paint dealers & distributors, and Business groups can apply.</p>

            {status ? (
              <div className="promo-msg">{status}</div>
            ) : (
              <form onSubmit={handleApply}>
                <input required type="text" placeholder="Name" className="form-input" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                <input required type="text" placeholder="Company / Firm Name" className="form-input" value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} />
                <input required type="text" placeholder="City & State" className="form-input" value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} />
                <input required type="tel" placeholder="Phone Number" className="form-input" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                <input required type="email" placeholder="Email" className="form-input" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />

                <select required className="form-input" value={formData.investment} onChange={e => setFormData({ ...formData, investment: e.target.value })}>
                  <option value="" disabled>Select Investment Range</option>
                  <option value="5-10 Lakhs">5 - 10 Lakhs</option>
                  <option value="10-25 Lakhs">10 - 25 Lakhs</option>
                  <option value="25+ Lakhs">Above 25 Lakhs</option>
                </select>

                <textarea required placeholder="Message" className="form-input" rows="4" value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}></textarea>

                <button type="submit" className="btn-primary w-100 mt-4">Apply for Franchise</button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Franchise;
