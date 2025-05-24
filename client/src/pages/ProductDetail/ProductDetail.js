import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TopNavBar from '../ui/TopNavBar/TopNavBar';
import axios from 'axios';
import Footer from '../ui/Footer/Footer';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleAddToCart = async (productId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user._id) {
      alert("Please log in to add items to cart.");
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/cart/add`, {
        userId: user._id,
        productId,
      });

      alert("Item added to cart!");
    } catch (err) {
      console.error("Add to cart failed", err);
      alert("Failed to add item to cart.");
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/manageproducts/getAll`);
        const found = res.data.find(p => p._id === id);
        setProduct(found || null);
      } catch (err) {
        console.error("Error fetching product", err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div style={styles.centered}><TopNavBar /><p>Loading...</p></div>;
  }

  if (!product) {
    return (
      <div style={styles.centered}>
        <TopNavBar />
        <h2>Product not found</h2>
      </div>
    );
  }

  return (
    <div>
      <TopNavBar />
      <main style={styles.container}>
        <div style={styles.card}>
          <div style={styles.imageWrapper}>
            <img src={product.prodImg} alt={product.prodName} style={styles.image} />
          </div>
          <div style={styles.details}>
            <h1 style={styles.title}>{product.prodName}</h1>
            <p style={styles.description}>{product.prodDesc}</p>
            <h2 style={styles.price}>${product.prodPrice}</h2>
            <button
              onClick={() => handleAddToCart(id)}
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
        </div>
      </main>
      <Footer/>
    </div>
  );
};

const styles = {
  centered: {
    textAlign: 'center',
    padding: '100px 20px',
    fontSize: '20px',
  },
  container: {
    padding: '40px 20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    minHeight: '90vh',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    maxWidth: '900px',
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    padding: '20px',
  },
  imageWrapper: {
    width: '100%',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    maxHeight: '400px',
    objectFit: 'contain',
    borderRadius: '10px',
  },
  details: {
    padding: '0 10px',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  description: {
    fontSize: '18px',
    color: '#555',
    marginBottom: '20px',
  },
  price: {
    fontSize: '24px',
    color: '#ff4c00',
    fontWeight: '600',
    marginBottom: '20px',
  },
  button: {
    padding: '14px 30px',
    fontSize: '16px',
    backgroundColor: '#ff4c00',
    color: '#fff',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  }
};

export default ProductDetail;
