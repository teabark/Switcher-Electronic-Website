import React from "react";
import smartphoneImg from '../../../assets/CategoryLinks/smartphone.png';
import smartwatchImg from '../../../assets/CategoryLinks/smartwatch.png';
import headphonesImg from '../../../assets/CategoryLinks/Headphones.png';
import laptopImg from '../../../assets/CategoryLinks/Laptop.png';

const categoryBackgrounds = {
  smartphone: smartphoneImg,
  smartwatch: smartwatchImg,
  headphones: headphonesImg,
  laptops: laptopImg,
};

export default function Hero({ title }) {
  // Normalize category name to lowercase and no spaces for key matching
  const key = title.toLowerCase().replace(/\s+/g, "");

  // Pick the background based on the category or fallback image
  const backgroundImage = categoryBackgrounds[key];

  const containerStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "60px 40px",
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    color: "#fff",
    flexWrap: "wrap",
    minHeight: "80vh",
    position: "relative",
  };

  const overlayStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: "60px 40px",
    borderRadius: "10px",
    width: "100%",
    maxWidth: "700px",
  };

  const headlineStyle = {
    fontSize: "48px",
    fontWeight: "bold",
    marginBottom: "20px",
    textTransform: "capitalize",
  };

  const descriptionStyle = {
    fontSize: "18px",
    marginBottom: "30px",
  };

  const buttonStyle = {
    padding: "12px 24px",
    backgroundColor: "#ff4c00",
    color: "#fff",
    border: "none",
    borderRadius: "30px",
    fontSize: "16px",
    cursor: "pointer",
  };

  return (
    <section style={containerStyle}>
      <div style={overlayStyle}>
        <h1 style={headlineStyle}>{title}</h1>
        <p style={descriptionStyle}>Discover top {title.toLowerCase()} handpicked for you.</p>
        <button style={buttonStyle}>Shop Now</button>
      </div>
    </section>
  );
}
