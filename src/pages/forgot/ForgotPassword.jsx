import React, { useState, useEffect } from "react";
import styles from "./ForgotPassword.module.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import leftImage from "../../assets/images/Frame3.png";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [countdown, setCountdown] = useState(30);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let timer;
    if (step === 2 && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown, step]);

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (phone.trim() === "") {
      setError("Phone number is required");
      return;
    }
    setError("");
    localStorage.setItem("reset_phone", phone);
    setStep(2);
    setCountdown(30);
  };

  const handleOtpChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otp.join("").length < 4) {
      setError("Please enter the complete 4-digit code");
      return;
    }
    setError("");
    setStep(3);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      setError("Please fill all password fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    localStorage.setItem("reset_password", newPassword);

    Swal.fire({
      icon: "success",
      title: "Password Reset Successful",
      text: "You can now log in with your new password.",
      confirmButtonColor: "#48b8b5",
      timer: 3000,
      showConfirmButton: true,
    }).then(() => {
      navigate("/login");
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img src={logo} alt="Logo" className={styles.logo} />
        <img src={leftImage} alt="Illustration" className={styles.leftImage} />
      </div>

      <div className={styles.right}>
        {step === 1 && (
          <form className={styles.form} onSubmit={handlePhoneSubmit}>
            <h2>Forgot Password</h2>
            <p>Enter your phone number to receive a verification code.</p>
            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={error ? styles.errorInput : ""}
            />
            {error && <p className={styles.error}>{error}</p>}
            <button type="submit" className={styles.submitBtn}>
              Send Code
            </button>
          </form>
        )}

        {step === 2 && (
          <form className={styles.form} onSubmit={handleOtpSubmit}>
            <h2>Enter OTP</h2>
            <p>We’ve sent a verification code to your phone.</p>
            <div className={styles.otpContainer}>
              {otp.map((digit, i) => (
                <input
                  key={i}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, i)}
                />
              ))}
            </div>
            {error && <p className={styles.error}>{error}</p>}
            <button type="submit" className={styles.submitBtn}>
              Verify
            </button>
            <p className={styles.resend}>
              {countdown > 0
                ? `Resend code in ${countdown}s`
                : <button onClick={() => setCountdown(30)}>Resend Code</button>}
            </p>
          </form>
        )}

        {step === 3 && (
          <form className={styles.form} onSubmit={handlePasswordSubmit}>
            <h2>Reset Password</h2>
            <p>Enter your new password below.</p>
            <div className={styles.passwordField}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <span
                className={styles.eye}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {error && <p className={styles.error}>{error}</p>}
            <button type="submit" className={styles.submitBtn}>
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
