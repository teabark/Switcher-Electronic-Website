import React from 'react';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  const footerStyle = {
    backgroundColor: '#2c2c2b',
    color: '#fff',
    padding: '30px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  };

  const nameStyle = {
    fontSize: '14px',
    marginTop: '10px',
    color: '#ccc',
  };

  const iconContainerStyle = {
    display: 'flex',
    gap: '20px',
    marginTop: '15px',
  };

  const iconStyle = {
    fontSize: '24px',
    color: '#fff',
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
  };

  return (
    <footer style={footerStyle}>
      <h3 style={{ fontSize: '20px', fontWeight: '600' }}>Switcher</h3>
      <p style={nameStyle}>Designed & Built by Denzel Jones</p>

      <div style={iconContainerStyle}>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebookF style={iconStyle} />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram style={iconStyle} />
        </a>
        <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
          <FaWhatsapp style={iconStyle} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
