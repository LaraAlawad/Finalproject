import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import {
  FaUser,
  FaClipboardList,
  FaMapMarkerAlt,
  FaCreditCard,
  FaBell,
  FaSignOutAlt,
  FaEdit,
  FaSave,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import defaultAvatar from "../../assets/images/default-avatar.jpg";

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    setUserData(storedUser);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(userData));
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <div className={styles.profileContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.userInfo}>
          <img
            src={defaultAvatar}
            alt="User Avatar"
            className={styles.avatar}
          />
          <h3>
            {userData.firstName || "User"} {userData.lastName || ""}
          </h3>
          <p>Bethlehem, Palestine</p>
        </div>

        <nav className={styles.navMenu}>
          <ul>
            <li className={styles.active}>
              <FaUser /> My Profile
            </li>
            <li onClick={() => navigate("/myorders")}>
              <FaClipboardList /> My Orders
            </li>
            <li onClick={() => navigate("/addresses")}>
              <FaMapMarkerAlt /> Addresses
            </li>
            <li>
              <FaCreditCard /> Cards
            </li>
            <li>
              <FaBell /> Notifications
            </li>
          </ul>
        </nav>

        <button className={styles.logoutBtn} onClick={handleLogout}>
          <FaSignOutAlt /> Log out
        </button>
      </aside>

      <main className={styles.profileContent}>
        <h2>My Profile</h2>

        <div className={styles.formGroup}>
          <div>
            <label>First Name</label>
            <input
              name="firstName"
              value={userData.firstName}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div>
            <label>Last Name</label>
            <input
              name="lastName"
              value={userData.lastName}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.fullWidth}>
            <label>Email</label>
            <input
              name="email"
              value={userData.email}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.fullWidth}>
            <label>Phone Number</label>
            <input
              name="phone"
              value={userData.phone}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="+970 59-000-0000"
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.fullWidth}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>
        </div>

        <div className={styles.buttons}>
          <button
            className={styles.editBtn}
            onClick={() => setIsEditing(true)}
            disabled={isEditing}
          >
            <FaEdit /> Edit
          </button>

          <button
            className={styles.saveBtn}
            onClick={handleSave}
            disabled={!isEditing}
          >
            <FaSave /> Save Changes
          </button>
        </div>
      </main>
    </div>
  );
};

export default Profile;
