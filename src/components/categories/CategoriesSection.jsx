import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./CategoriesSection.module.css";

const CategoriesSection = () => {
  const [products, setProducts] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://dummyjson.com/products?limit=100");
        setProducts(res.data.products);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  const nextSlide = () => {
    if (startIndex + itemsPerPage < products.length) {
      setStartIndex((prev) => prev + itemsPerPage);
    }
  };

  const prevSlide = () => {
    if (startIndex - itemsPerPage >= 0) {
      setStartIndex((prev) => prev - itemsPerPage);
    }
  };

  const visibleProducts = products.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section className={styles.categories}>
      <div className={styles.sliderContainer}>
        <button className={styles.arrowLeft} onClick={prevSlide} disabled={startIndex === 0}>
          &#10094;
        </button>

        <div className={styles.cardsWrapper}>
          {visibleProducts.map((product) => (
            <div key={product.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <img src={product.thumbnail} alt={product.title} />
              </div>
              <p className={styles.name}>{product.title}</p>
            </div>
          ))}
        </div>

        <button
          className={styles.arrowRight}
          onClick={nextSlide}
          disabled={startIndex + itemsPerPage >= products.length}
        >
          &#10095;
        </button>
      </div>
    </section>
  );
};

export default CategoriesSection;
