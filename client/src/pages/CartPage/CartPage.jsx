import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TopNavBar from "../ui/TopNavBar/TopNavBar";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user?._id) return; // just in case

    const fetchCartItems = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/cart/${user._id}`);
        setCartItems(res.data);
      } catch (err) {
        console.error("Failed to fetch cart items:", err);
      }
    };

    fetchCartItems();
  }, [user?._id]);

  const handleDelete = async (cartItemId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/cart/${cartItemId}`);
      setCartItems((prev) => prev.filter((item) => item._id !== cartItemId));
    } catch (err) {
      console.error("Error deleting cart item:", err);
    }
  };

  const totalPrice = cartItems.reduce((sum, item) => {
    const price = item.productId?.prodPrice || 0;
    const quantity = item.quantity || 1;
    return sum + price * quantity;
  }, 0);

  return (
    <>
      <TopNavBar />
      <div style={{ padding: "30px" }}>
        <h2>Your Cart</h2>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {cartItems.map((item) => (
                <li
                  key={item._id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px 0",
                    borderBottom: "1px solid #ccc",
                  }}
                >
                  <div>
                    <strong>{item.productId?.prodName}</strong>
                    <br />${item.productId?.prodPrice?.toFixed(2)}
                  </div>

                  <div style={{ display: "flex", gap: "10px" }}>
                    <Link to={`/product/${item.productId?._id}`}>
                      <button>View</button>
                    </Link>
                    <button onClick={() => handleDelete(item._id)}>
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div style={{ marginTop: "20px", textAlign: "right" }}>
              <h3>Total: ${totalPrice.toFixed(2)}</h3>
              <Link to="/checkout">
                <button
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#ff4c00",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartPage;
