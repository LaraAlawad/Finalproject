import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../../assets/images/logo.png";
import { FaUser, FaHeart, FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const updateCart = () => {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(storedCart.length);
    };

    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
      updateCart();
    };

    updateCart();
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.navbarLeft}>
          <img src={logo} alt="Logo" className={styles.logo} />
        </div>

        <ul className={styles.navbarLinks}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>

        <div className={styles.navbarActions}>
          {isLoggedIn ? (
            <>
              <Link to="/profile" className={styles.icon}><FaUser /></Link>
              <Link to="/favorites" className={styles.icon}><FaHeart /></Link>
              <div className={styles.cartIconWrapper}>
                <Link to="/cart" className={styles.icon}>
                  <FaShoppingCart />
                  {cartCount > 0 && (
                    <span className={styles.cartBadge}>{cartCount}</span>
                  )}
                </Link>
              </div>
              <button className={styles.btnLogout} onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className={styles.btnLogin}>Login</button>
              </Link>
              <Link to="/create-account">
                <button className={styles.btnRegister}>Register</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
