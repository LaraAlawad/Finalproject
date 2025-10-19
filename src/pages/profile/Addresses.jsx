import React, { useEffect, useState } from "react";
import styles from "./Addresses.module.css";
import {
  FaUser,
  FaClipboardList,
  FaMapMarkerAlt,
  FaCreditCard,
  FaBell,
  FaSignOutAlt,
  FaEdit,
  FaTrash,
  FaPlus,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Addresses = () => {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    city: "",
    street: "",
    phone: "",
  });
  const [alert, setAlert] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("addresses")) || [];
    setAddresses(stored);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrEdit = (e) => {
    e.preventDefault();
    if (!formData.city || !formData.street || !formData.phone) {
      setAlert("⚠️ Please fill all fields");
      setTimeout(() => setAlert(""), 2000);
      return;
    }

    let updated;
    if (editIndex !== null) {
      updated = [...addresses];
      updated[editIndex] = formData;
      setAlert("✅ Address updated successfully!");
    } else {
      updated = [...addresses, formData];
      setAlert("✅ Address added successfully!");
    }

    localStorage.setItem("addresses", JSON.stringify(updated));
    setAddresses(updated);
    setFormData({ city: "", street: "", phone: "" });
    setEditIndex(null);
    setShowForm(false);

    setTimeout(() => setAlert(""), 2500);
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      const updated = addresses.filter((_, i) => i !== index);
      localStorage.setItem("addresses", JSON.stringify(updated));
      setAddresses(updated);
      setAlert("🗑️ Address deleted!");
      setTimeout(() => setAlert(""), 2500);
    }
  };

  const handleEdit = (index) => {
    setFormData(addresses[index]);
    setEditIndex(index);
    setShowForm(true);
  };

  return (
    <div className={styles.profileContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.userInfo}>
          <img
            src="https://i.ibb.co/0q8K3sZ/default-avatar.jpg"
            alt="User"
            className={styles.avatar}
          />
          <h3>Lara Hasasneh</h3>
          <p>Bethlehem, Palestine</p>
        </div>

        <nav className={styles.navMenu}>
          <ul>
            <li onClick={() => navigate("/profile")}>
              <FaUser /> My Profile
            </li>
            <li onClick={() => navigate("/myorders")}>
              <FaClipboardList /> My Orders
            </li>
            <li className={styles.active}>
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
        <div className={styles.header}>
          <h2>Addresses</h2>
          <button
            className={styles.addBtn}
            onClick={() => {
              setFormData({ city: "", street: "", phone: "" });
              setShowForm(true);
              setEditIndex(null);
            }}
          >
            <FaPlus /> Add New Address
          </button>
        </div>

        {addresses.length === 0 && !showForm ? (
          <div className={styles.empty}>
            <p>No addresses saved yet.</p>
            <button
              className={styles.addAddressBtn}
              onClick={() => setShowForm(true)}
            >
              Add Address
            </button>
          </div>
        ) : null}

        {showForm && (
          <form className={styles.form} onSubmit={handleAddOrEdit}>
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="street"
              placeholder="Street / Neighborhood"
              value={formData.street}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone number"
              value={formData.phone}
              onChange={handleInputChange}
            />
            <div className={styles.formButtons}>
              <button type="submit" className={styles.saveBtn}>
                {editIndex !== null ? "Save Changes" : "Add Address"}
              </button>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {!showForm && addresses.length > 0 && (
          <div className={styles.addressList}>
            {addresses.map((addr, i) => (
              <div key={i} className={styles.addressCard}>
                <h4>{addr.city}</h4>
                <p>{addr.street}</p>
                <p>{addr.phone}</p>
                <div className={styles.actions}>
                  <button
                    className={styles.editBtn}
                    onClick={() => handleEdit(i)}
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDelete(i)}
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {alert && <div className={styles.alert}>{alert}</div>}
    </div>
  );
};

export default Addresses;
