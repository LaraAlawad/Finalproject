import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import {
  FaUser,
  FaClipboardList,
  FaMapMarkerAlt,
  FaCreditCard,
  FaBell,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import defaultAvatar from "../../assets/images/default-avatar.jpg";

const MyOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  const filteredOrders =
    filter === "all" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div className={styles.profileContainer}>
      <aside className={styles.sidebar}>
        <div className={styles.userInfo}>
          <img src={defaultAvatar} alt="User Avatar" className={styles.avatar} />
          <h3>Lara Hasasneh</h3>
          <p>Bethlehem, Palestine</p>
        </div>

        <nav className={styles.navMenu}>
          <ul>
            <li onClick={() => navigate("/profile")}>
              <FaUser /> My Profile
            </li>
            <li className={styles.active}>
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
        <h2>My Orders</h2>

        <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
          {["all", "Pending", "Completed", "Cancelled"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "6px 14px",
                cursor: "pointer",
                backgroundColor:
                  filter === status ? "#4fc4ca" : "transparent",
                color: filter === status ? "#fff" : "#333",
                fontWeight: "500",
              }}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {filteredOrders.length === 0 ? (
          <p style={{ color: "#777" }}>No orders found for this category.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
            }}
          >
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "12px",
                  padding: "15px",
                  textAlign: "center",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                }}
              >
                <img
                  src={order.thumbnail}
                  alt={order.title}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginBottom: "10px",
                  }}
                />
                <h4 style={{ color: "#1a1b4b" }}>{order.title}</h4>
                <p style={{ color: "#777", fontSize: "0.9rem" }}>
                  ${order.price}
                </p>

                <span
                  style={{
                    fontWeight: "600",
                    fontSize: "0.9rem",
                    color:
                      order.status === "Completed"
                        ? "#28a745"
                        : order.status === "Pending"
                        ? "#eab308"
                        : "#dc3545",
                  }}
                >
                  {order.status}
                </span>

                <p
                  style={{
                    color: "#999",
                    fontSize: "0.8rem",
                    marginTop: "6px",
                  }}
                >
                  {order.date}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MyOrders;
