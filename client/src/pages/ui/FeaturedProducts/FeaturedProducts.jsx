import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const FeaturedProducts = () => {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const fetchAndFilter = async () => {
      try {
        const res = await axios.get('http://localhost:5000/manageproducts/getAll');
        const products = res.data;

        const categoryMap = {};
        for (const prod of products) {
          if (!categoryMap[prod.category]) {
            categoryMap[prod.category] = [];
          }
          categoryMap[prod.category].push(prod);
        }

        const selected = [];
        for (const cat in categoryMap) {
          const items = categoryMap[cat];
          selected.push(items[0]);
          if (selected.length === 5) break;
        }

        setFeatured(selected);
      } catch (err) {
        console.error('Error fetching featured products', err);
      }
    };

    fetchAndFilter();
  }, []);

  const handleAddToCart = async (productId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user._id) {
      alert("Please log in to add items to cart.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/cart/add", {
        userId: user._id,
        productId,
      });

      alert("Item added to cart!");
    } catch (err) {
      console.error("Add to cart failed", err);
      alert("Failed to add item to cart.");
    }
  };

  return (
    <section style={{ padding: '50px 30px', backgroundColor: '#fff' }}>
      <h2 style={{ fontSize: '28px', fontWeight: '700', textAlign: 'center', marginBottom: '40px' }}>
        Featured Products
      </h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
        {featured.map((product) => (
          <div
            key={product._id}
            style={{
              textDecoration: 'none',
              color: 'inherit',
              width: '180px',
              backgroundColor: '#f9f9f9',
              borderRadius: '10px',
              padding: '20px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
              textAlign: 'center',
              transition: 'transform 0.3s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <img
                src={product.prodImg}
                alt={product.prodName}
                style={{
                  width: '100px',
                  height: '100px',
                  objectFit: 'contain',
                  marginBottom: '10px',
                }}
              />
              <div style={{ fontSize: '16px', fontWeight: '600' }}>{product.prodName}</div>
              <div style={{ fontSize: '14px', fontWeight: '500', color: '#ff4c00' }}>
                ${product.prodPrice}
              </div>
            </Link>
            <button
              onClick={() => handleAddToCart(product._id)}
              style={{
                marginTop: '10px',
                padding: '6px 12px',
                backgroundColor: '#ff4c00',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
