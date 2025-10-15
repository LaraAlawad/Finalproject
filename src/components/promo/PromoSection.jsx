import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./PromoSection.module.css";

const PromoSection = () => {
  const [smartphones, setSmartphones] = useState([]);
  const [decor, setDecor] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const smartphonesRes = await axios.get(
          "https://dummyjson.com/products/category/smartphones"
        );
        const decorRes = await axios.get(
          "https://dummyjson.com/products/category/home-decoration"
        );

        setSmartphones(smartphonesRes.data.products.slice(0, 2));
        setDecor(decorRes.data.products.slice(0, 1));
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <section className={styles.promo}>
      <div className={styles.container}>
        <div className={styles.left}>
          {smartphones.map((item) => (
            <div key={item.id} className={styles.smallCard}>
              <img src={item.thumbnail} alt={item.title} />
              <div className={styles.textOverlay}>
                <h3>{item.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {decor[0] && (
          <div className={styles.right}>
            <img src={decor[0].thumbnail} alt={decor[0].title} />
            <div className={styles.textOverlay}>
              <h2>{decor[0].title}</h2>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PromoSection;
