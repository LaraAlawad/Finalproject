import React, { useState } from "react";
import styles from "./HeroSection.module.css";
import speakerImg from "../../assets/images/speaker.png";

const HeroSection = () => {
  const cards = [
    { id: 1, color: "#4FC4CA" },
    { id: 2, color: "#9E97E1" },
    { id: 3, color: "#4FC4CA" },
    { id: 4, color: "#9E97E1" },
  ];

  const [index, setIndex] = useState(0);

  const next = () => {
    if (index < cards.length - 2) setIndex(index + 1);
  };

  const prev = () => {
    if (index > 0) setIndex(index - 1);
  };

  return (
    <section className={styles.hero}>
      <button className={styles.arrowLeft} onClick={prev}>
        &#10094;
      </button>

      <div className={styles.sliderWrapper}>
        <div
          className={styles.slider}
          style={{ transform: `translateX(-${index * 50}%)` }}
        >
          {cards.map((card) => (
            <div
              key={card.id}
              className={styles.card}
              style={{ backgroundColor: card.color }}
            >
              <div className={styles.heroContent}>
                <span className={styles.badge}>30% OFF</span>
                <h2>
                  Feel Every Beat.
                  <br />
                  Hear the Difference.
                </h2>
                <p>
                  Experience immersive sound with our premium speaker collection
                </p>
                <button className={styles.buyBtn}>Buy now</button>
              </div>
              <div className={styles.heroImage}>
                <img src={speakerImg} alt="Speakers" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className={styles.arrowRight} onClick={next}>
        &#10095;
      </button>
    </section>
  );
};

export default HeroSection;
