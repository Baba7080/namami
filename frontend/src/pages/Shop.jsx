import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import './Shop.css';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hardcoded for now, but simulating an API fetch
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          throw new Error('Failed to fetch');
        }
      } catch (err) {
        console.error(err);
        setProducts([
          { id: 1, name: 'Interior Eco Paint', description: 'Smooth finish for homes and offices', category: 'Paint', price: 250, imgUrl: 'https://namamigaiya.com/static/media/pro1.d16812839b2cd48c4ae8.jpg' },
          { id: 2, name: 'Exterior Eco Paint', description: 'Weather-resistant natural paint', category: 'Paint', price: 280, imgUrl: 'https://namamigaiya.com/static/media/pro3.32dbfa31f9d50ad75db2.png' },
          { id: 3, name: 'Distemper', description: 'Economical and breathable wall finish', category: 'Paint', price: 150, imgUrl: 'https://namamigaiya.com/static/media/pro2.53503a73c0f209700329.png' },
          { id: 4, name: 'Primer & Base Coats', description: 'For better adhesion and durability', category: 'Primer', price: 200, imgUrl: 'https://namamigaiya.com/static/media/pro1.d16812839b2cd48c4ae8.jpg' }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="shop-page section-padding">
      <div className="container">

        <div className="shop-header text-center mb-5">
          <h1 className="section-title">Buy Paint Online</h1>
          <p className="section-subtitle">Browse and select Eco Green Paints products based on your requirement.</p>
        </div>

        {loading ? (
          <div className="text-center py-5">Loading products...</div>
        ) : (
          <div className="products-grid">
            {products.map(product => (
              <div key={product.id} className="shop-product-card">
                <div className="product-image-placeholder">
                  <img src={product.imgUrl || 'https://namamigaiya.com/static/media/pro1.d16812839b2cd48c4ae8.jpg'} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="product-details">
                  <h3>{product.name}</h3>
                  <p className="desc">{product.description}</p>
                  <p className="price">₹{product.price} / Litre</p>
                  <Link to={`/product/${product.id}`} className="btn-outline view-btn">View Details</Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Shop;
