import BestBorrowings from "../components/home/BestBorrowed/BestBorrowings";
import Categories from "../components/home/Category/Categories";
import HeroSection from "../components/home/HeroSection";
import NewArrivals from "../components/home/NewArrivals/NewArrivals";
import Container from "../components/shared/Container";

const Home = () => {
  return (
    <>
      <Container>
        <HeroSection />
        <NewArrivals />
        <Categories />
        <BestBorrowings />
      </Container>
    </>
  );
};

export default Home;
