import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Authentication/Login";
import Register from "./pages/Authentication/Register";
import Home from "./pages/Home/Home";
import { Fragment, useState, useEffect } from "react";
import "./assets/styles/styles.css";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import ContactPage from "./pages/ContactPage/ContactPage";
import Users from "./pages/admin/Users";
import Products from "./pages/admin/Products";
import AdminRoute from "./pages/ui/AdminRoute/AdminRoute";
import CartPage from "./pages/CartPage/CartPage";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import SearchResults from "./pages/SearchResults/SearchResults";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function setAuth(boolean) {
    setIsAuthenticated(boolean);
  }

  async function isAuth() {
    try {
      const response = await fetch("http://localhost:5000/auth/is-verify", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseResponse = await response.json();
      parseResponse === true
        ? setIsAuthenticated(true)
        : setIsAuthenticated(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    isAuth();
  });

  return (
    <Fragment>
      <PayPalScriptProvider
        options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}
      >
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Home setAuth={setAuth} />
                ) : (
                  <Login setAuth={setAuth} />
                )
              }
            />
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/" />
                ) : (
                  <Login setAuth={setAuth} />
                )
              }
            />
            <Route
              path="/register"
              element={
                isAuthenticated ? (
                  <Navigate to="/" />
                ) : (
                  <Register setAuth={setAuth} />
                )
              }
            />
            <Route
              path="/category/:categoryName"
              element={
                isAuthenticated ? <CategoryPage /> : <Login setAuth={setAuth} />
              }
            />
            <Route
              path="/product/:id"
              element={
                isAuthenticated ? (
                  <ProductDetail />
                ) : (
                  <Login setAuth={setAuth} />
                )
              }
            />
            <Route
              path="/contact"
              element={
                isAuthenticated ? <ContactPage /> : <Login setAuth={setAuth} />
              }
            />
            <Route
              path="/admin/users"
              element={
                <AdminRoute isAuthenticated={isAuthenticated}>
                  <Users />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/products"
              element={
                <AdminRoute isAuthenticated={isAuthenticated}>
                  <Products />
                </AdminRoute>
              }
            />
            <Route
              path="/cart"
              element={
                isAuthenticated ? <CartPage /> : <Login setAuth={setAuth} />
              }
            />
            <Route
              path="/checkout"
              element={
                isAuthenticated ? <CheckoutPage /> : <Login setAuth={setAuth} />
              }
            />
            <Route
              path="/search"
              element={
                isAuthenticated ? (
                  <SearchResults />
                ) : (
                  <Login setAuth={setAuth} />
                )
              }
            />
          </Routes>
        </Router>
      </PayPalScriptProvider>
    </Fragment>
  );
}

export default App;
