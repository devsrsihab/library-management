import BestBorrowings from "../components/home/BestBorrowed/BestBorrowings";
import Categories from "../components/home/Category/Categories";
import HeroSection from "../components/home/HeroSection";

const Home = () => {
  return (
    <>
      <HeroSection />
      <Categories />
      <BestBorrowings />
    </>
  );
};

export default Home;
