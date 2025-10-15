import React, { useEffect, useState } from "react";
import styles from "./FlashSale.module.css";

const FlashSale = () => {
  const [products, setProducts] = useState([]);
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products?limit=4");
        const data = await res.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching flash sale products:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={styles.flashSale}>
      <div className={styles.header}>
        <div className={styles.left}>
          <h2>Flash Sale</h2>
          <div className={styles.timer}>
            <div>
              <span>{timeLeft.hours.toString().padStart(2, "0")}</span>
              <p>Hour</p>
            </div>
            <div>
              <span>{timeLeft.minutes.toString().padStart(2, "0")}</span>
              <p>Minute</p>
            </div>
            <div>
              <span>{timeLeft.seconds.toString().padStart(2, "0")}</span>
              <p>Seconds</p>
            </div>
          </div>
        </div>
        <a href="#" className={styles.seeAll}>See all</a>
      </div>

      <div className={styles.productsGrid}>
        {products.map((product) => {
          const discountPrice = Math.max(product.price - 10, 0).toFixed(2);
          return (
            <div key={product.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <img src={product.thumbnail} alt={product.title} />
                <button className={styles.favoriteBtn}>♡</button>
              </div>
              <div className={styles.info}>
                <h3 className={styles.name}>{product.title}</h3>
                <p className={styles.desc}>{product.category}</p>
                <p>
                  <span className={styles.discountPrice}>{discountPrice}$</span>
                  <span className={styles.originalPrice}>
                    {product.price.toFixed(2)}$
                  </span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FlashSale;
