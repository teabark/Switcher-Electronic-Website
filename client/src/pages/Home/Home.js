import React, { useRef } from 'react';
import TopNavBar from '../ui/TopNavBar/TopNavBar';
import HeroSection from '../ui/HeroSection/HeroSection';
import CategoryLinks from '../ui/CategoryLinks/CategoryLinks';
import FeaturedProducts from '../ui/FeaturedProducts/FeaturedProducts';
import Footer from '../ui/Footer/Footer';

const Home = ({ setAuth }) => {
  const categoryRef = useRef(null);

  return (
    <div>
      <TopNavBar />
      <HeroSection scrollToCategory={() => categoryRef.current?.scrollIntoView({ behavior: 'smooth' })} />
      <div ref={categoryRef}>
        <CategoryLinks />
      </div>
      <FeaturedProducts />
      <Footer />
    </div>
  );
};

export default Home;
