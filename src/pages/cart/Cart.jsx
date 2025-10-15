import React, { useState, useEffect } from "react";
import styles from "./Cart.module.css";
import Footer from "../../components/footer/Footer";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [stage, setStage] = useState("empty"); // empty | filled | checkout
  const [formData, setFormData] = useState({ name: "", address: "", card: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // load cart
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(stored);
    setStage(stored.length > 0 ? "filled" : "empty");
  }, []);

  const removeItem = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    if (updated.length === 0) setStage("empty");
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
    setStage("empty");
  };

  const handleCheckout = () => setStage("checkout");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handlePayment = (e) => {
    e.preventDefault();
    const { name, address, card } = formData;
    if (!name || !address || !card) {
      setError("Please fill all fields correctly.");
      return;
    }
    setError("");
    setSuccess(true);
    clearCart();
    setTimeout(() => {
      setStage("empty");
      setSuccess(false);
    }, 4000);
  };

  return (
    <>
      <div className={styles.cartContainer}>
        {stage === "empty" && (
          <div className={styles.emptyState}>
            <h2>Your Cart is Empty</h2>
            <p>Looks like you haven’t added anything yet.</p>
            <button onClick={() => (window.location.href = "/products")}>
              Shop Now
            </button>
          </div>
        )}

        {stage === "filled" && (
          <div className={styles.filledState}>
            <h2>Your Cart</h2>
            <div className={styles.cartItems}>
              {cart.map((item) => (
                <div className={styles.cartItem} key={item.id}>
                  <img src={item.thumbnail} alt={item.title} />
                  <div>
                    <h4>{item.title}</h4>
                    <p>${item.price}</p>
                  </div>
                  <button
                    className={styles.removeBtn}
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className={styles.summary}>
              <p>
                Total:{" "}
                <strong>
                  $
                  {cart
                    .reduce((sum, i) => sum + Number(i.price), 0)
                    .toFixed(2)}
                </strong>
              </p>
              <div className={styles.actions}>
                <button className={styles.clearBtn} onClick={clearCart}>
                  Clear Cart
                </button>
                <button
                  className={styles.checkoutBtn}
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}

        {stage === "checkout" && (
          <div className={styles.checkoutState}>
            <h2>Checkout</h2>
            <form onSubmit={handlePayment}>
              <input
                name="name"
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
              />
              <input
                name="address"
                type="text"
                placeholder="Shipping Address"
                value={formData.address}
                onChange={handleChange}
              />
              <input
                name="card"
                type="text"
                placeholder="Card Number"
                value={formData.card}
                onChange={handleChange}
              />
              {error && <p className={styles.error}>{error}</p>}
              <button type="submit" className={styles.payBtn}>
                Pay Now
              </button>
            </form>
          </div>
        )}

        {success && (
          <div className={styles.successMsg}>
            <h2>🎉 Purchase Completed Successfully!</h2>
            <p>Thank you for shopping with us.</p>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Cart;
