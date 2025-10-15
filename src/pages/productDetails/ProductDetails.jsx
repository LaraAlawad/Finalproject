import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./ProductDetails.module.css";
import Footer from "../../components/footer/Footer";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  useEffect(() => {
    window.scrollTo(0, 0);

    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));

    fetch("https://dummyjson.com/products?limit=8&skip=10")
      .then((res) => res.json())
      .then((data) => setRecommended(data.products));
  }, [id]);

  if (!product) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  const stars = Array.from({ length: 5 }, (_, index) => (
    <span
      key={index}
      className={
        index < Math.round(product.rating)
          ? styles.starFilled
          : styles.starEmpty
      }
    >
      ★
    </span>
  ));

  const colors = ["#ffffff", "#000000", "#e63946", "#f4a261", "#264653"];

  return (
    <>
      <div className={styles.container}>
        <div className={styles.productSection}>
          <div className={styles.images}>
            <div className={styles.thumbnails}>
              {product.images?.slice(0, 4).map((img, i) => (
                <img key={i} src={img} alt="thumb" />
              ))}
            </div>
            <div className={styles.mainImage}>
              <img src={product.thumbnail} alt={product.title} />
            </div>
          </div>

          <div className={styles.details}>
            <h2>{product.title}</h2>
            <p className={styles.category}>{product.category}</p>
            <p className={styles.description}>{product.description}</p>

            <div className={styles.ratingSection}>
              <p className={styles.rateTitle}>Rate</p>
              <div className={styles.stars}>{stars}</div>
              <span className={styles.rateValue}>
                {product.rating.toFixed(2)}
              </span>
              <span className={styles.reviews}>(Reviews 100)</span>
            </div>

            <div className={styles.colorsSection}>
              <p className={styles.colorTitle}>Colours</p>
              <div className={styles.colors}>
                {colors.map((color, i) => (
                  <span
                    key={i}
                    className={styles.colorCircle}
                    style={{ backgroundColor: color }}
                  ></span>
                ))}
              </div>
            </div>

            <div className={styles.price}>${product.price}</div>

            <div className={styles.quantity}>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                -
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>

            <div className={styles.actions}>
              <button className={styles.buyBtn}>Buy Now</button>

              {isLoggedIn && (
                <button className={styles.cartBtn}>Add to Cart</button>
              )}
            </div>
          </div>
        </div>

        <div className={styles.recommended}>
          <h3>Recommended for you</h3>
          <div className={styles.recommendedGrid}>
            {recommended.map((item) => (
              <Link
                to={`/product/${item.id}`}
                key={item.id}
                className={styles.recommendCard}
              >
                <img src={item.thumbnail} alt={item.title} />
                <h4>{item.title}</h4>
                <p>${item.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProductDetails;
