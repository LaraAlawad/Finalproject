import React, { useState } from "react";
import styles from "./Contact.module.css";
import Footer from "../../components/footer/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <>
      <section className={styles.contactSection}>
        <div className={styles.container}>
          <h1>Contact Us</h1>
          <p>
            Have questions or feedback? We'd love to hear from you!
            Send us a message using the form below and we’ll get back to you shortly.
          </p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <button type="submit" className={styles.submitBtn}>
              Send Message
            </button>
          </form>

          <div className={styles.infoBox}>
            <h3>Our Office</h3>
            <p>📍 Beit Sahour, Palestine</p>
            <p>📧 support@kastore.com</p>
            <p>📞 +970 59 000 0000</p>
          </div>
        </div>

        {showSuccess && (
          <div className={styles.successOverlay}>
            <div className={styles.successBox}>
              ✅ Message Sent Successfully!
            </div>
          </div>
        )}
      </section>

      <Footer />
    </>
  );
};

export default Contact;
