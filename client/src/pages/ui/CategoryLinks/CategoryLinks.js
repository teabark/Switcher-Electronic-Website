import React from 'react';
import { Link } from 'react-router-dom';
import smartphoneImg from '../../../assets/CategoryLinks/smartphone.png';
import smartwatchImg from '../../../assets/CategoryLinks/smartwatch.png';
import headphonesImg from '../../../assets/CategoryLinks/Headphones.png';
import laptopImg from '../../../assets/CategoryLinks/Laptop.png';

const CategoryLinks = () => {
  const categories = [
    { name: 'Smart Phone', value: 'smartphone', img: smartphoneImg },
    { name: 'Smart Watch', value: 'smartwatch', img: smartwatchImg },
    { name: 'Headphones', value: 'headphones', img: headphonesImg },
    { name: 'Laptops', value: 'laptops', img: laptopImg },
  ];


  return (
    <section
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: '40px 20px',
        backgroundColor: '#fff',
        gap: '20px',
      }}
    >
      {categories.map((category, index) => (
        <Link
          key={index}
          to={`/category/${category.value}`}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            textAlign: 'center',
            padding: '30px 20px',
            width: '220px',
            height: '260px',
            borderRadius: '12px',
            backgroundColor: '#f5f5f5',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
            textDecoration: 'none',
            color: 'inherit',
            transition: 'transform 0.3s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
        >
          <img
            src={category.img}
            alt={`${category.name} category`}
            style={{
              width: '70px',
              height: '70px',
              objectFit: 'contain',
              marginBottom: '15px',
            }}
          />
          <div
            style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#333',
              marginBottom: '10px',
            }}
          >
            {category.name}
          </div>
          <div
            style={{
              marginTop: 'auto',
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#ff4c00',
            }}
          >
            Shop Now &gt;&gt;
          </div>
        </Link>
      ))}
    </section>
  );
};

export default CategoryLinks;
