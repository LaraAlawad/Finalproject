import React from "react";
import styles from "./Footer.module.css";
import { FaInstagram, FaPinterestP, FaTwitter, FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.topSection}>
        <div className={styles.column}>
          <h3>Follow Us</h3>
          <div className={styles.socialIcons}>
            <FaInstagram />
            <FaPinterestP />
            <FaTwitter />
            <FaEnvelope />
          </div>
        </div>

        <div className={styles.column}>
          <h3>Our Product</h3>
          <ul>
            <li>All Products</li>
            <li>Laptops</li>
            <li>Headphones</li>
            <li>Smartphones</li>
            <li>PlayStation</li>
            <li>Smartwatch</li>
          </ul>
        </div>

        <div className={styles.column}>
          <h3>Links</h3>
          <ul>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
            <li>Refund & Return Policy</li>
          </ul>
        </div>

        <div className={styles.column}>
          <h3>Site Pages</h3>
          <ul>
            <li>Homepage</li>
            <li>About KA Store</li>
            <li>Shop</li>
            <li>Contact Us</li>
          </ul>
        </div>
      </div>

      <hr className={styles.divider} />

      <div className={styles.bottomSection}>
        <div className={styles.info}>
          <p>Sunday to Thursday</p>
          <p>09 AM — 07 PM</p>
        </div>
        <div className={styles.contact}>
          <FaClock />
          <FaPhone />
          <FaMapMarkerAlt />
          <button className={styles.locationBtn}>Location</button>
        </div>
        <p className={styles.copy}>KA Store © 2025 | All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
