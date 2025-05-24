import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import ProductCard from "../ui/CategoryPage/ProductCard";
import { Link } from "react-router-dom";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();

  const query = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    if (query) {
      axios
        .get(`http://localhost:5000/manageproducts/search?q=${query}`)
        .then((res) => setResults(res.data))
        .catch((err) => console.error("Search failed:", err));
    }
  }, [query]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Search Results for "{query}"</h2>
      {results.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul>
          {results.map((item) => (
            <Link to={`/product/${item._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <ProductCard
                key={item._id}
                id={item._id}
                name={item.prodName}
                img={item.prodImg}
                price={`$${item.prodPrice}`}
              />
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;
