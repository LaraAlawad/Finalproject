import React, { useState, useEffect } from "react";
import styles from "./Checkout.module.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { Button, TextField, Snackbar, Alert } from "@mui/material";

const Checkout = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    phone: "",
    email: "",
    payment: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("checkoutData"));
    if (saved) setFormData(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("checkoutData", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^[0-9]{6,15}$/.test(formData.phone))
      newErrors.phone = "Invalid phone number";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email address";
    if (!formData.payment) newErrors.payment = "Select a payment method";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSuccess(true);
      localStorage.removeItem("cartItems");
    } else {
      setAlertOpen(true);
    }
  };

  return (
    <>
      <Navbar />

      <div className={styles.checkoutContainer}>
        {!success ? (
          <div className={styles.formWrapper}>
            <h2>Checkout</h2>
            <p>Please fill in your details to complete your purchase.</p>

            <form onSubmit={handleSubmit} className={styles.form}>
              <TextField
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                error={!!errors.fullName}
                helperText={errors.fullName}
                fullWidth
                className={styles.input}
              />
              <TextField
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                error={!!errors.address}
                helperText={errors.address}
                fullWidth
                className={styles.input}
              />
              <TextField
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                error={!!errors.city}
                helperText={errors.city}
                fullWidth
                className={styles.input}
              />
              <TextField
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                error={!!errors.phone}
                helperText={errors.phone}
                fullWidth
                className={styles.input}
              />
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                fullWidth
                className={styles.input}
              />

              <div className={styles.paymentSection}>
                <label className={styles.paymentLabel}>Payment Method</label>
                <div className={styles.paymentOptions}>
                  <label>
                    <input
                      type="radio"
                      name="payment"
                      value="Credit Card"
                      checked={formData.payment === "Credit Card"}
                      onChange={handleChange}
                    />
                    Credit Card
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="payment"
                      value="Cash on Delivery"
                      checked={formData.payment === "Cash on Delivery"}
                      onChange={handleChange}
                    />
                    Cash on Delivery
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="payment"
                      value="PayPal"
                      checked={formData.payment === "PayPal"}
                      onChange={handleChange}
                    />
                    PayPal
                  </label>
                </div>
                {errors.payment && (
                  <p className={styles.errorText}>{errors.payment}</p>
                )}
              </div>

              <Button
                variant="contained"
                type="submit"
                className={styles.payBtn}
              >
                Pay Now
              </Button>
            </form>
          </div>
        ) : (
          <div className={styles.successContainer}>
            <div className={styles.successBox}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/845/845646.png"
                alt="success"
                className={styles.successIcon}
              />
              <h2>Payment Successful!</h2>
              <p>Your order has been placed successfully 🎉</p>
              <Button
                variant="contained"
                onClick={() => (window.location.href = "/products")}
                className={styles.continueBtn}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        )}
      </div>

      <Footer />

      <Snackbar
        open={alertOpen}
        autoHideDuration={3000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="error" variant="filled" onClose={() => setAlertOpen(false)}>
          Please fill in all required fields correctly.
        </Alert>
      </Snackbar>
    </>
  );
};

export default Checkout;
