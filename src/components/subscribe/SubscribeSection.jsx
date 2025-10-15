import React from "react";
import styles from "./SubscribeSection.module.css";
import bgImage from "../../assets/images/SubscribeSection.png";


const SubscribeSection = () => {
  return (
    <section
      className={styles.subscribe}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className={styles.content}>
        <h2>Subscribe Don't Miss a Deal</h2>
        <p>Sign up for the latest discounts, offers, and shopping trends.</p>
        <div className={styles.form}>
          <input type="email" placeholder="email@example.com" />
          <button>Submit</button>
        </div>
      </div>
    </section>
  );
};

export default SubscribeSection;
