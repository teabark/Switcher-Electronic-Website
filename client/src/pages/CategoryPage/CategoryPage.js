// CategoryPage.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TopNavBar from "../ui/TopNavBar/TopNavBar";
import Hero from "../ui/CategoryPage/Hero";
import ProductCard from "../ui/CategoryPage/ProductCard";
import Footer from "../ui/Footer/Footer";
import { Link } from "react-router-dom";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/manageproducts/getAll"
        );
        const allProducts = res.data;
        const filtered = allProducts.filter(
          (p) => p.category.toLowerCase() === categoryName.toLowerCase()
        );
        setFilteredProducts(filtered);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [categoryName]);

  return (
    <div>
      <TopNavBar />
      <Hero
        title={capitalize(categoryName)}
        subtitle={`Explore the latest in ${capitalize(categoryName)}`}
      />
      <div
        style={{
          padding: "2rem",
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {loading ? (
          <p>Loading...</p>
        ) : filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <ProductCard
                key={product._id}
                name={product.prodName}
                img={product.prodImg}
                price={`$${product.prodPrice}`}
              />
            </Link>
          ))
        ) : (
          <p>No products found for this category.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CategoryPage;
