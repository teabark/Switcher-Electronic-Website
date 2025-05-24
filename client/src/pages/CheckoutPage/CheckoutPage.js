import React, { useEffect, useState } from "react";
import axios from "axios";
import { PayPalButtons } from "@paypal/react-paypal-js";
import TopNavBar from "../ui/TopNavBar/TopNavBar";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [paid, setPaid] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/cart/${user._id}`);
        setCartItems(res.data);
      } catch (err) {
        console.error("Failed to fetch cart items:", err);
      }
    };
    fetchCartItems();
  }, [user._id]);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + (item.productId?.prodPrice || 0),
    0
  );

  const handleApprove = async (details) => {
    try {
      setPaid(true);
      // Optional: clear cart here
      await axios.delete(`http://localhost:5000/cart/clear/${user._id}`);
    } catch (err) {
      console.error("Error processing payment:", err);
    }
  };

  return (
    <>
      <TopNavBar />
      <div
        style={{
          maxWidth: 600,
          margin: "40px auto",
          padding: 30,
          backgroundColor: "#f9f9f9",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          borderRadius: 12,
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          color: "#333",
        }}
      >
        <h2
          style={{
            marginBottom: 20,
            fontWeight: "700",
            fontSize: 28,
            textAlign: "center",
            color: "#0070ba",
          }}
        >
          Checkout
        </h2>

        {paid ? (
          <div
            style={{
              color: "green",
              fontWeight: "700",
              fontSize: 18,
              textAlign: "center",
              marginTop: 40,
              backgroundColor: "#e6f4ea",
              padding: 20,
              borderRadius: 8,
              boxShadow: "0 2px 6px rgba(0,128,0,0.15)",
            }}
          >
            ✅ Payment Successful! Thank you for your purchase.
          </div>
        ) : (
          <>
            <div
              style={{
                marginBottom: 30,
                fontSize: 20,
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              Total Amount:{" "}
              <span style={{ color: "#0070ba" }}>
                ${totalAmount.toFixed(2)}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <PayPalButtons
                style={{
                  layout: "vertical",
                  color: "blue",
                  shape: "pill",
                  label: "pay",
                }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: totalAmount.toFixed(2),
                        },
                      },
                    ],
                  });
                }}
                onApprove={async (data, actions) => {
                  const details = await actions.order.capture();
                  handleApprove(details);
                }}
                onError={(err) => {
                  console.error("PayPal Checkout error", err);
                }}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CheckoutPage;
