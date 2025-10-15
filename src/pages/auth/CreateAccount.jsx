import React, { useState } from "react";
import styles from "./CreateAccount.module.css";
import { FaFacebookF, FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import leftImage from "../../assets/images/Frame3.png";
import logo from "../../assets/images/logo.png";

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Must be at least 8 characters long";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      localStorage.setItem("user", JSON.stringify(formData));
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        window.location.href = "/login";
      }, 2500);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img src={logo} alt="Logo" className={styles.logo} />
        <img src={leftImage} alt="Showcase" className={styles.leftImage} />
      </div>

      <div className={styles.right}>
        <h2>Create New Account</h2>
        <p>Join us to track orders, save favorites, and get special offers.</p>

        <div className={styles.socialButtons}>
          <button><FaFacebookF /> Facebook</button>
          <button><FcGoogle /> Google</button>
          <button><FaApple /> Apple ID</button>
        </div>

        <div className={styles.separator}>
          <span>or</span>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.row}>
            <div className={styles.field}>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className={errors.firstName ? styles.errorInput : ""}
              />
              {errors.firstName && <p className={styles.error}>{errors.firstName}</p>}
            </div>
            <div className={styles.field}>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className={errors.lastName ? styles.errorInput : ""}
              />
              {errors.lastName && <p className={styles.error}>{errors.lastName}</p>}
            </div>
          </div>

          <div className={styles.field}>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? styles.errorInput : ""}
            />
            {errors.email && <p className={styles.error}>{errors.email}</p>}
          </div>

          <div className={styles.field}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? styles.errorInput : ""}
            />
            {errors.password && <p className={styles.error}>{errors.password}</p>}
          </div>

          <button type="submit" className={styles.submitBtn}>
            Create New Account
          </button>
        </form>

        <p className={styles.loginText}>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>

      {showPopup && (
        <div className={styles.popup}>
          <div className={styles.popupBox}>
            <h3>🎉 Account Created Successfully!</h3>
            <p>Your account has been saved. Redirecting to login...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateAccount;
