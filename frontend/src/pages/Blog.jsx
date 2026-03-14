import React from 'react';
import { BookOpen } from 'lucide-react';

const Blog = () => {
  const articles = [
    { title: "Understanding Cow Dung Paint Technology", excerpt: "How natural waste is transformed into premium wall finishes using modern eco-friendly machinery." },
    { title: "Sustainable Manufacturing in India", excerpt: "The role of indigenous technology in promoting green entrepreneurship." },
    { title: "Government Initiatives for Gaushalas", excerpt: "How state governments are empowering gaushalas to become economically self-reliant." },
    { title: "Eco-Friendly Living: Why Your Choice of Paint Matters", excerpt: "The health hazards of chemical paints vs the natural benefits of khadi prakritik paint." }
  ];

  return (
    <div className="blog-page section-padding bg-alt">
      <div className="container">
        <div className="text-center mb-5">
          <BookOpen size={48} className="text-primary block-center mb-4" />
          <h1 className="section-title">Our Blog</h1>
          <p className="section-subtitle">Educational articles and updates on cow dung paint technology and sustainable living.</p>
        </div>

        <div className="grid-2">
          {articles.map((art, idx) => (
            <div key={idx} className="glass-effect" style={{ padding: '30px', borderRadius: '12px', background: 'var(--surface)' }}>
              <h3 className="mb-2" style={{ color: 'var(--primary-dark)' }}>{art.title}</h3>
              <p className="text-muted mb-4">{art.excerpt}</p>
              <a href="#" className="text-primary font-bold">Read Article &rarr;</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
