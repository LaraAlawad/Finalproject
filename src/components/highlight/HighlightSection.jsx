import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./HighlightSection.module.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const HighlightSection = () => {
  const [products, setProducts] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const smartphones = await axios.get(
          "https://dummyjson.com/products/category/smartphones"
        );
        const laptops = await axios.get(
          "https://dummyjson.com/products/category/laptops"
        );

        const selected = [
          ...smartphones.data.products.slice(0, 2),
          ...laptops.data.products.slice(0, 2),
        ];
        setProducts(selected);
      } catch (error) {
        console.error("Error fetching highlight products:", error);
      }
    };

    fetchProducts();
  }, []);

  const nextSlide = () => {
    if (index < products.length - 2) setIndex(index + 1);
  };

  const prevSlide = () => {
    if (index > 0) setIndex(index - 1);
  };

  return (
    <section className={styles.highlightSection}>
      <button onClick={prevSlide} className={`${styles.arrow} ${styles.left}`}>
        <FaChevronLeft />
      </button>

      <div className={styles.slider}>
        {products.slice(index, index + 2).map((item) => (
          <div key={item.id} className={styles.card}>
            <img
              src="/Frame 2085664238.png"
              alt="card background"
              className={styles.bg}
            />
            <div className={styles.content}>
              <div className={styles.text}>
                <h3>{item.title}</h3>
                <p>{item.description.slice(0, 90)}...</p>
                <button className={styles.buyBtn}>Buy Now</button>
              </div>
              <div className={styles.image}>
                <img src={item.thumbnail} alt={item.title} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button onClick={nextSlide} className={`${styles.arrow} ${styles.right}`}>
        <FaChevronRight />
      </button>
    </section>
  );
};

export default HighlightSection;
