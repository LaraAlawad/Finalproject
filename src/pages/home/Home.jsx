import React from "react";
import HeroSection from "../../components/hero/HeroSection";
import CategoriesSection from "../../components/categories/CategoriesSection";
import BestSellers from "../../components/bestsellers/BestSellers";
import PromoSection from "../../components/promo/PromoSection";
import FeaturedProducts from "../../components/featured/FeaturedProducts";
import FlashSale from "../../components/flashsale/FlashSale";
import HighlightSection from "../../components/highlight/HighlightSection";
import SubscribeSection from "../../components/subscribe/SubscribeSection";
import Footer from "../../components/footer/Footer";

const Home = () => {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <BestSellers />
      <PromoSection />
      <FeaturedProducts />
      <FlashSale />
      <HighlightSection />
      <SubscribeSection />
      <Footer />
    </>
  );
};

export default Home;
