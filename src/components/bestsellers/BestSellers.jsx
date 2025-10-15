import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./BestSellers.module.css";

const BestSellers = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://dummyjson.com/products?limit=8");
        setProducts(res.data.products);
      } catch (err) {
        console.error("Error fetching best sellers:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className={styles.bestSellers}>
      <div className={styles.header}>
        <h2>Best Sellers</h2>
        <a href="#" className={styles.seeAll}>See all</a>
      </div>

      <div className={styles.productsGrid}>
        {products.slice(0, 8).map((product) => (
          <div key={product.id} className={styles.card}>
            <div className={styles.imageWrapper}>
              <img src={product.thumbnail} alt={product.title} />
              <button className={styles.favoriteBtn}>♡</button>
            </div>
            <div className={styles.info}>
              <p className={styles.name}>{product.title}</p>
              <p className={styles.desc}>{product.description.slice(0, 30)}...</p>
              <p className={styles.price}>{product.price.toFixed(2)}$</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestSellers;
