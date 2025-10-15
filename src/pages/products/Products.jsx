import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Products.module.css";
import Footer from "../../components/footer/Footer";
import { FaHeart } from "react-icons/fa";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching products:", err));

    const savedFav = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFav);
  }, []);

  const handleLoadMore = () => setVisibleCount((prev) => prev + 8);

  const handleBuyNow = (product) => {
    const stored = JSON.parse(localStorage.getItem("cart")) || [];
    stored.push(product);
    localStorage.setItem("cart", JSON.stringify(stored));
    navigate("/cart");
  };

  const handleToggleFavorite = (product) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      alert("Please login to add favorites!");
      navigate("/login");
      return;
    }

    let updatedFavorites;
    if (favorites.some((fav) => fav.id === product.id)) {
      updatedFavorites = favorites.filter((fav) => fav.id !== product.id);
    } else {
      updatedFavorites = [...favorites, product];
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const isFavorite = (productId) =>
    favorites.some((fav) => fav.id === productId);

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className={styles.productsPage}>
        <div className={styles.header}>
          <h2>Products</h2>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className={styles.filterBtn}>Filters</button>
          </div>
        </div>

        {loading ? (
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <p>Loading products...</p>
          </div>
        ) : (
          <>
            <div className={styles.productsGrid}>
              {filteredProducts.slice(0, visibleCount).map((product) => (
                <div className={styles.card} key={product.id}>
                  <div className={styles.imageWrapper}>
                    <Link to={`/product/${product.id}`}>
                      <img src={product.thumbnail} alt={product.title} />
                    </Link>
                    <FaHeart
                      className={`${styles.favoriteIcon} ${
                        isFavorite(product.id) ? styles.activeHeart : ""
                      }`}
                      onClick={() => handleToggleFavorite(product)}
                    />
                  </div>
                  <div className={styles.details}>
                    <h4>{product.title}</h4>
                    <p>{product.category}</p>
                    <span className={styles.price}>${product.price}</span>
                    <div className={styles.cardActions}>
                      <button
                        className={styles.buyBtn}
                        onClick={() => handleBuyNow(product)}
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {visibleCount < filteredProducts.length && (
              <div className={styles.loadMoreContainer}>
                <button onClick={handleLoadMore} className={styles.loadMoreBtn}>
                  Load more
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Products;
