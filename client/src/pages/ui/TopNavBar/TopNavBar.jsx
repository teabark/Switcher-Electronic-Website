import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";
import axios from "axios";
import { FaUsers, FaBoxOpen, FaSignOutAlt } from "react-icons/fa";

const TopNavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const adminEmail = "denzel@gmail.com";
  const [isAdmin, setIsAdmin] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserName(user.f_name || user.email);
      if (user.email === adminEmail) {
        setIsAdmin(true);
      }
    }
  }, []);

  const fetchCartCount = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user._id) return;

    try {
      const res = await axios.get(`http://localhost:5000/cart/${user._id}`);
      setCartCount(res.data.length);
    } catch (err) {
      console.error("Failed to fetch cart count", err);
    }
  };

  useEffect(() => {
    fetchCartCount();

    // Optional: refresh every 30 seconds
    const interval = setInterval(fetchCartCount, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) return;

    // Navigate to a search results page or trigger a fetch
    window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`;
  };

  const navStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 20px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  };

  const logoStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#ff4c00",
    textDecoration: "none",
  };

  const linksStyle = {
    display: isMobile ? (menuOpen ? "flex" : "none") : "flex",
    flexDirection: isMobile ? "column" : "row",
    gap: isMobile ? "10px" : "20px",
    position: isMobile ? "absolute" : "static",
    top: "60px",
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: isMobile ? "10px 20px" : "0",
    boxShadow: isMobile ? "0 4px 6px rgba(0,0,0,0.1)" : "none",
    zIndex: 999,
  };

  const linkStyle = {
    color: "#333",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "4px",
    position: "relative",
  };

  const dropdownMenuStyle = {
    position: "absolute",
    top: "100%",
    left: 0,
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    overflow: "hidden",
    zIndex: 1000,
    minWidth: "160px",
  };

  const dropdownItemStyle = {
    padding: "10px 16px",
    textDecoration: "none",
    display: "block",
    color: "#333",
    whiteSpace: "nowrap",
  };

  const searchContainerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  };

  const inputStyle = {
    padding: "6px 12px",
    borderRadius: "20px",
    border: "1px solid #ccc",
    fontSize: "14px",
  };

  const iconStyle = {
    fontSize: "18px",
    cursor: "pointer",
  };

  const hamburgerStyle = {
    display: isMobile ? "block" : "none",
    fontSize: "22px",
    cursor: "pointer",
    marginLeft: "15px",
  };

  return (
    <nav style={navStyle}>
      {/* Logo */}
      <Link to="/" style={logoStyle}>
        Switcher
      </Link>

      {/* Hamburger Icon */}
      <div style={hamburgerStyle} onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      {/* Nav Links */}
      <div style={linksStyle}>
        <Link to="/" style={linkStyle}>
          Home
        </Link>

        {/* Categories Dropdown */}
        <div
          style={linkStyle}
          onMouseEnter={() => !isMobile && setCategoryOpen(true)}
          onMouseLeave={() => !isMobile && setCategoryOpen(false)}
          onClick={() => isMobile && setCategoryOpen(!categoryOpen)}
        >
          Categories <FiChevronDown size={14} />
          {categoryOpen && (
            <div style={dropdownMenuStyle}>
              <Link to="/category/Smart%20Phone" style={dropdownItemStyle}>
                Smart Phone
              </Link>
              <Link to="/category/Smart%20Watch" style={dropdownItemStyle}>
                Smart Watch
              </Link>
              <Link to="/category/Headphones" style={dropdownItemStyle}>
                Headphones
              </Link>
              <Link to="/category/Laptops" style={dropdownItemStyle}>
                Laptops
              </Link>
            </div>
          )}
        </div>

        <Link to="/contact" style={linkStyle}>
          Contact
        </Link>
      </div>

      {/* Search + Icons */}
      <div style={searchContainerStyle}>
        <input
          type="text"
          placeholder="Search..."
          style={inputStyle}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />

        {/* Profile Icon with Dropdown */}
        <div style={{ position: "relative" }}>
          <span style={iconStyle} onClick={() => setProfileOpen(!profileOpen)}>
            👤
          </span>
          {profileOpen && (
            <div
              style={{
                position: "absolute",
                top: "30px",
                right: "0",
                background: "#fff",
                border: "1px solid #ccc",
                boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
                borderRadius: "6px",
                zIndex: 1000,
                padding: "10px",
                minWidth: "170px",
              }}
            >
              <p
                style={{
                  margin: "0 0 10px 0",
                  fontWeight: "bold",
                  color: "#333",
                }}
              >
                Welcome {userName}! 🚀
              </p>

              {/* Admin Only Links */}
              {isAdmin && (
                <>
                  <Link to="/admin/users" style={dropdownItemStyle}>
                    <FaUsers style={{ marginRight: "8px" }} />
                    Manage Users
                  </Link>
                  <Link to="/admin/products" style={dropdownItemStyle}>
                    <FaBoxOpen style={{ marginRight: "8px" }} />
                    Manage Products
                  </Link>
                </>
              )}

              <button
                onClick={handleLogout}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#ff4c00",
                  cursor: "pointer",
                  textAlign: "left",
                  width: "100%",
                  padding: "5px 0",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <Link
            to="/cart"
            style={{
              position: "relative",
              textDecoration: "none",
              color: "#333",
            }}
          >
            <FaShoppingCart size={24} />
            {cartCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-6px",
                  right: "-8px",
                  background: "red",
                  color: "white",
                  borderRadius: "50%",
                  padding: "2px 6px",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                {cartCount}
              </span>
            )}
          </Link>
          {/* Add other nav links or logout button here */}
        </div>
      </div>
    </nav>
  );
};

export default TopNavBar;
