import React from "react";
import styles from "./About.module.css";

const About = () => {
  return (
    <section className={styles.aboutSection}>
      <div className={styles.container}>
        <h1>About KA Store</h1>
        <p>
          Welcome to <strong>KA Store</strong> — your trusted destination for
          high-quality electronics and smart devices. Our mission is to make
          technology accessible, affordable, and inspiring for everyone.
        </p>
        <p>
          Founded in 2025, our goal is to offer a smooth and enjoyable
          shopping experience. Whether you’re looking for the latest gadgets,
          premium accessories, or great deals, we’ve got you covered.
        </p>
        <p className={styles.highlight}>
          “Innovation and simplicity are at the heart of what we do.”
        </p>
      </div>
    </section>
  );
};

export default About;
