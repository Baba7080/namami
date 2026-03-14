import React, { useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', message: '', type: 'General'
  });
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:5000/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      setStatus("Enquiry Sent Successfully!");
      setFormData({ name: '', email: '', phone: '', message: '', type: 'General' });
    } catch (err) {
      setStatus("Enquiry Sent (Mock)");
    }
  };

  return (
    <div className="contact-page section-padding">
      <div className="container">
        <h1 className="section-title text-center mb-5">Contact Us</h1>

        <div className="grid-2">

          <div className="contact-info">
            <div className="glass-effect p-4 mb-4 text-center" style={{ padding: '40px', borderRadius: '12px' }}>
              <MapPin size={40} className="text-primary mb-4 block-center" />
              <h3>Corporate Office</h3>
              <p className="text-muted">Namami Gaiya Khadi Prakritik Paint Pvt. Ltd.</p>
            </div>

            <div className="glass-effect p-4 mb-4 text-center" style={{ padding: '40px', borderRadius: '12px' }}>
              <MapPin size={40} className="text-primary mb-4 block-center" />
              <h3>Manufacturing Units</h3>
              <p className="text-muted">Uttar Pradesh | Bihar</p>
            </div>

            <div className="grid-2">
              <div className="glass-effect p-4 text-center" style={{ padding: '20px', borderRadius: '12px' }}>
                <Phone className="text-primary mb-2 block-center" />
                <p>+91 98765 43210</p>
              </div>
              <div className="glass-effect p-4 text-center" style={{ padding: '20px', borderRadius: '12px' }}>
                <Mail className="text-primary mb-2 block-center" />
                <p>info@namamigaiya.com</p>
              </div>
            </div>
          </div>

          <div className="contact-form-box glass-effect" style={{ padding: '40px', borderRadius: '12px' }}>
            <h2 className="mb-4">Send an Enquiry</h2>
            {status ? <div className="promo-msg">{status}</div> : (
              <form onSubmit={handleSubmit}>
                <select className="form-input" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}>
                  <option value="General">General Enquiry</option>
                  <option value="Machinery">Machinery Enquiry</option>
                  <option value="Paint Purchase">Paint Purchase Enquiry</option>
                </select>
                <input required type="text" placeholder="Name" className="form-input" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                <input required type="email" placeholder="Email" className="form-input" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                <input required type="tel" placeholder="Phone" className="form-input" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                <textarea required placeholder="Your Message" className="form-input" rows="5" value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}></textarea>

                <button type="submit" className="btn-primary w-100 mt-4">Submit Enquiry</button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
