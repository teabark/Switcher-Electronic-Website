import React from 'react';

const HeroSection = ({ scrollToCategory }) => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '60px 40px',
    backgroundImage: 'url("/assets/yellowbackground.jpeg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    color: '#fff', // Change text color for contrast
    flexWrap: 'wrap',
    minHeight: '80vh', // Ensure enough height for background to show
  };

  const overlayStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional dark overlay for readability
    padding: '60px 40px',
    borderRadius: '10px',
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const textContainerStyle = {
    flex: 1,
    minWidth: '300px',
  };

  const headlineStyle = {
    fontSize: '48px',
    fontWeight: 'bold',
    marginBottom: '20px',
  };

  const descriptionStyle = {
    fontSize: '18px',
    marginBottom: '30px',
  };

  const buttonStyle = {
    padding: '12px 24px',
    backgroundColor: '#ff4c00',
    color: '#fff',
    border: 'none',
    borderRadius: '30px',
    fontSize: '16px',
    cursor: 'pointer',
  };

  return (
    <section style={containerStyle}>
      <div style={overlayStyle}>
        <div style={textContainerStyle}>
          <h1 style={headlineStyle}>Experience Sound Like Never Before</h1>
          <p style={descriptionStyle}>
            Discover premium audio with our latest headphones. Designed for comfort, engineered for clarity.
          </p>
          <button style={buttonStyle} onClick={scrollToCategory}>Shop Now</button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
