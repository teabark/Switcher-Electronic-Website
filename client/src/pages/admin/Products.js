import React, { useEffect, useState } from "react";
import axios from "axios";
import TopNavBar from "../ui/TopNavBar/TopNavBar";
import Footer from "../ui/Footer/Footer";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    prodName: "",
    prodDesc: "",
    prodPrice: "",
    prodImg: null,
    category: "",
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/manageproducts/getAll");
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle form input change (text fields and select)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image file change
  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, prodImg: e.target.files[0] }));
  };

  // Submit create or update product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("prodName", formData.prodName);
      data.append("prodDesc", formData.prodDesc);
      data.append("prodPrice", formData.prodPrice);
      data.append("category", formData.category.toLowerCase());

      if (formData.prodImg) data.append("prodImg", formData.prodImg);

      if (editingId) {
        // update product
        await axios.put(`http://localhost:5000/manageproducts/update/${editingId}`, data);
      } else {
        // create product
        await axios.post("http://localhost:5000/manageproducts/create", data);
      }

      setFormData({ prodName: "", prodDesc: "", prodPrice: "", prodImg: null, category: "" });
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      console.error("Error submitting product", err);
    }
  };

  // Edit button: load product info into form
  const handleEdit = (product) => {
    setFormData({
      prodName: product.prodName,
      prodDesc: product.prodDesc,
      prodPrice: product.prodPrice,
      prodImg: null, // user must select new image if updating
      category: product.category || "",
    });
    setEditingId(product._id);
  };

  // Delete product
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:5000/manageproducts/delete/${id}`);
        fetchProducts();
      } catch (err) {
        console.error("Failed to delete product", err);
      }
    }
  };

  return (
    <>
      <TopNavBar />
      <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
        <h2 style={{ marginBottom: 20 }}>Products</h2>

        <form onSubmit={handleSubmit} style={{ marginBottom: 40 }}>
          <input
            type="text"
            name="prodName"
            placeholder="Product Name"
            value={formData.prodName}
            onChange={handleInputChange}
            required
            style={{ display: "block", marginBottom: 10, padding: 8, width: 300 }}
          />
          <textarea
            name="prodDesc"
            placeholder="Description"
            value={formData.prodDesc}
            onChange={handleInputChange}
            required
            rows={3}
            style={{ display: "block", marginBottom: 10, padding: 8, width: 300 }}
          />
          <input
            type="number"
            name="prodPrice"
            placeholder="Price"
            value={formData.prodPrice}
            onChange={handleInputChange}
            required
            style={{ display: "block", marginBottom: 10, padding: 8, width: 300 }}
          />

          {/* Category dropdown */}
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
            style={{ display: "block", marginBottom: 10, padding: 8, width: 300 }}
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="smartphone">Smartphone</option>
            <option value="smartwatch">Smartwatch</option>
            <option value="headphones">Headphones</option>
            <option value="laptops">Laptops</option>
          </select>

          <input
            type="file"
            name="prodImg"
            accept="image/*"
            onChange={handleFileChange}
            style={{ marginBottom: 10 }}
          />
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            {editingId ? "Update Product" : "Add Product"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setFormData({ prodName: "", prodDesc: "", prodPrice: "", prodImg: null, category: "" });
                setEditingId(null);
              }}
              style={{
                marginLeft: 10,
                padding: "10px 20px",
                backgroundColor: "#6c757d",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          )}
        </form>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",         // space between items
            justifyContent: "flex-start", // align left (or center if you want)
          }}
        >
          {products.length === 0 ? (
            <p>No products available</p>
          ) : (
            products.map((product) => (
              <div
                key={product._id}
                style={{
                  border: "1px solid #ccc",
                  padding: 15,
                  borderRadius: 5,
                  maxWidth: 300,    // smaller width for multiple in a row
                  flex: "1 1 300px", // grow, shrink, basis for responsiveness
                  boxSizing: "border-box",
                }}
              >
                <img
                  src={product.prodImg}
                  alt={product.prodName}
                  style={{ width: "100%", height: "auto", marginBottom: 10, borderRadius: 4 }}
                />
                <h3 style={{ margin: "0 0 10px" }}>{product.prodName}</h3>
                <p style={{ margin: "0 0 10px" }}>{product.prodDesc}</p>
                <p style={{ margin: "0 0 5px" }}>
                  <strong>Price:</strong> ${product.prodPrice}
                </p>
                <p style={{ margin: "0 0 10px" }}>
                  <strong>Category:</strong> {product.category}
                </p>
                <button
                  onClick={() => handleEdit(product)}
                  style={{
                    marginRight: 10,
                    padding: "6px 12px",
                    backgroundColor: "#28a745",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  style={{
                    padding: "6px 12px",
                    backgroundColor: "#dc3545",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Products;
