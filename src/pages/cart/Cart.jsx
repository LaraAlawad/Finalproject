import React, { useState, useEffect } from "react";
import styles from "./Cart.module.css";
import Footer from "../../components/footer/Footer";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [stage, setStage] = useState("empty");
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    card: "",
    payment: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showRemoveAlert, setShowRemoveAlert] = useState(false);
  const [showPurchaseAlert, setShowPurchaseAlert] = useState(false);

  // تحميل الكارت
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(stored);
    setStage(stored.length > 0 ? "filled" : "empty");

    // تسجيل جميع منتجات الكارت كـ Pending في MyOrders
    if (stored.length > 0) {
      const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
      const pendingOrders = stored.map((item) => ({
        ...item,
        status: "Pending",
        date: new Date().toLocaleDateString(),
      }));

      // دمج دون تكرار
      const mergedOrders = [
        ...existingOrders.filter(
          (o) => !stored.some((c) => c.id === o.id && o.status === "Pending")
        ),
        ...pendingOrders,
      ];

      localStorage.setItem("orders", JSON.stringify(mergedOrders));
    }
  }, []);

  const updateOrders = (product, status) => {
    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const updatedOrders = [
      ...existingOrders.filter((o) => o.id !== product.id),
      { ...product, status, date: new Date().toLocaleDateString() },
    ];
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  const removeItem = (id) => {
    const confirmed = window.confirm("Are you sure you want to remove this product?");
    if (!confirmed) return;

    const item = cart.find((i) => i.id === id);
    updateOrders(item, "Cancelled");

    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    if (updated.length === 0) setStage("empty");

    setShowRemoveAlert(true);
    setTimeout(() => setShowRemoveAlert(false), 2500);
  };

  const clearCart = () => {
    const confirmed = window.confirm("Are you sure you want to clear your cart?");
    if (!confirmed) return;

    cart.forEach((item) => updateOrders(item, "Cancelled"));
    setCart([]);
    localStorage.removeItem("cart");
    setStage("empty");
  };

  const handleCheckout = () => setStage("checkout");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handlePayment = (e) => {
    e.preventDefault();
    const { name, address, card, payment } = formData;

    if (!name || !address || !card || !payment) {
      setError("Please fill all fields and select a payment method.");
      return;
    }

    setError("");
    setShowPurchaseAlert(true);

    setTimeout(() => {
      // تحديث الطلبات إلى Completed
      cart.forEach((item) => updateOrders(item, "Completed"));

      setShowPurchaseAlert(false);
      setSuccess(true);
      localStorage.removeItem("cart");
      setCart([]);

      setTimeout(() => {
        setStage("empty");
        setSuccess(false);
      }, 3000);
    }, 2000);
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

              <div className={styles.paymentSection}>
                <label className={styles.paymentLabel}>Card</label>
                <div className={styles.paymentOptions}>
                  <label
                    className={`${styles.paymentOption} ${
                      formData.payment === "visa" ? styles.selected : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="visa"
                      checked={formData.payment === "visa"}
                      onChange={handleChange}
                    />
                    <div className={`${styles.cardBox} ${styles.visa}`}>
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
                        alt="Visa"
                      />
                    </div>
                  </label>

                  <label
                    className={`${styles.paymentOption} ${
                      formData.payment === "applepay" ? styles.selected : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="applepay"
                      checked={formData.payment === "applepay"}
                      onChange={handleChange}
                    />
                    <div className={styles.cardBox}>
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                        alt="Apple Pay"
                      />
                      <span>Apple Pay</span>
                    </div>
                  </label>

                  <label
                    className={`${styles.paymentOption} ${
                      formData.payment === "mastercard" ? styles.selected : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="mastercard"
                      checked={formData.payment === "mastercard"}
                      onChange={handleChange}
                    />
                    <div className={styles.cardBox}>
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/512px-Mastercard-logo.svg.png"
                        alt="MasterCard"
                      />
                    </div>
                  </label>
                </div>
              </div>

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

        {showPurchaseAlert && (
          <div className={styles.purchaseAlert}>
            <h2>💳 Confirming Purchase...</h2>
            <p>Your payment is being processed, please wait.</p>
          </div>
        )}

        {showRemoveAlert && (
          <div className={styles.bigRemoveAlert}>
            <h2>🗑️ Product Removed!</h2>
            <p>The item has been successfully removed from your cart.</p>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Cart;
