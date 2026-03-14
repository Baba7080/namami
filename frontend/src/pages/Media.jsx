import React from 'react';
import { Newspaper, PlayCircle } from 'lucide-react';

const Media = () => {
  const news = [
    { title: "Namami Gaiya Installs 100th Plant in Chhattisgarh", type: "Press Release", date: "Sept 12, 2025" },
    { title: "Revolutionizing Rural Employment with Cow Dung Paint", type: "News Feature", date: "Aug 05, 2025" },
    { title: "Awarded Best Eco-Friendly Innovation 2025", type: "Recognition", date: "Jul 20, 2025" }
  ];

  return (
    <div className="media-page section-padding">
      <div className="container">
        <h1 className="section-title text-center mb-5">Media & News</h1>

        <div className="grid-3">
          {news.map((item, idx) => (
            <div key={idx} className="glass-effect" style={{ borderRadius: '12px', overflow: 'hidden' }}>
              <img src={`https://namamigaiya.com/static/media/gallery${idx === 0 ? '5.ed08763814c9fd71dc72' : idx === 1 ? '6.e42f440945c2a2085046' : '8.a425e7084c522240e316'}.jpg`} alt="News" style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
              <div style={{ padding: '24px' }}>
                <span style={{ color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 'bold' }}>{item.type}</span>
                <h3 style={{ margin: '12px 0', fontSize: '1.1rem' }}>{item.title}</h3>
                <p className="text-muted" style={{ fontSize: '0.9rem' }}>{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Media;
