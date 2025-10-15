import React, { useState } from "react";
import styles from "./Login.module.css";
import { FaFacebookF, FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import rightImage from "../../assets/images/Frame2085663879.png";
import logo from "../../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!formData.password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      localStorage.setItem("isLoggedIn", "true");
      alert("Welcome back!");
      navigate("/user-home"); 
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img src={logo} alt="Logo" className={styles.logo} />
        <img src={rightImage} alt="Showcase" className={styles.rightImage} />
      </div>

      <div className={styles.right}>
        <h2>Login</h2>
        <p>Good to see you again!</p>

        <div className={styles.socialButtons}>
          <button><FaFacebookF /> Facebook</button>
          <button><FcGoogle /> Google</button>
          <button><FaApple /> Apple ID</button>
        </div>

        <div className={styles.separator}><span>or</span></div>

        <form onSubmit={handleSubmit} className={styles.form}>
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
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? styles.errorInput : ""}
              />
              <span
                className={styles.toggleEye}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
            {errors.password && <p className={styles.error}>{errors.password}</p>}
          </div>

          <div className={styles.forgot}>
            <a href="#">Forgot Password?</a>
          </div>

          <button type="submit" className={styles.submitBtn}>
            Login
          </button>

          <Link to="/" className={`${styles.submitBtn} ${styles.asButton}`}>
            ← Back to Home
          </Link>
        </form>

        <p className={styles.signupText}>
          Don’t Have an Account? <Link to="/create-account">Create Account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
