import React, { useEffect, useState } from "react";
import styles from "./FeaturedProducts.module.css";
import axios from "axios";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4;

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products/category/smartphones")
      .then((res) => setProducts(res.data.products))
      .catch((err) => console.error(err));
  }, []);

  const nextSlide = () => {
    if (currentIndex + itemsPerPage < products.length) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const prevSlide = () => {
    if (currentIndex - itemsPerPage >= 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  return (
    <section className={styles.featured}>
      <div className={styles.header}>
        <h2>Apple Products</h2>
        <a href="#" className={styles.seeAll}>See all</a>
      </div>

      <div className={styles.sliderContainer}>
        <button onClick={prevSlide} className={styles.arrowLeft} disabled={currentIndex === 0}>
          &#10094;
        </button>

        <div className={styles.productsGrid}>
          {products.slice(currentIndex, currentIndex + itemsPerPage).map((product) => (
            <div key={product.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <img src={product.thumbnail} alt={product.title} />
                <button className={styles.favoriteBtn}>♡</button>
              </div>
              <div className={styles.info}>
                <p className={styles.name}>{product.title}</p>
                <p className={styles.desc}>{product.description.slice(0, 40)}...</p>
                <p className={styles.price}>{product.price.toFixed(2)}$</p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={nextSlide}
          className={styles.arrowRight}
          disabled={currentIndex + itemsPerPage >= products.length}
        >
          &#10095;
        </button>
      </div>
    </section>
  );
};

export default FeaturedProducts;
