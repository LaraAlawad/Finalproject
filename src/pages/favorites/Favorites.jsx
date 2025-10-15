import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Favorites.module.css";
import Footer from "../../components/footer/Footer";
import { FaHeart } from "react-icons/fa";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedFav = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFav);
  }, []);

  const handleShopNow = () => {
    navigate("/products");
  };

  const handleRemoveFavorite = (id) => {
    const updatedFav = favorites.filter((item) => item.id !== id);
    setFavorites(updatedFav);
    localStorage.setItem("favorites", JSON.stringify(updatedFav));
  };

  return (
    <>
      <div className={styles.favoritesPage}>
        <h2>Favorites</h2>
        {favorites.length === 0 ? (
          <div className={styles.emptyState}>
            <FaHeart className={styles.emptyIcon} />
            <h3>Nothing here yet!</h3>
            <p>Add items to your favorites to find them easily later.</p>
            <button onClick={handleShopNow} className={styles.shopNowBtn}>
              Shop Now
            </button>
          </div>
        ) : (
          <div className={styles.grid}>
            {favorites.map((product) => (
              <div key={product.id} className={styles.card}>
                <img src={product.thumbnail} alt={product.title} />
                <h4>{product.title}</h4>
                <p>{product.category}</p>
                <span>${product.price}</span>
                <FaHeart
                  className={styles.activeHeart}
                  onClick={() => handleRemoveFavorite(product.id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Favorites; 
