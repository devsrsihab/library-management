import Categories from "../components/home/Category/Categories";
import HeroSection from "../components/home/HeroSection";
import NewArrivals from "../components/home/NewArrivals/NewArrivals";
import PopularBooks from "../components/home/PopularBooks/PopularBooks";
import Container from "../components/shared/Container";

const Home = () => {
  return (
    <>
      <Container>
        <HeroSection />
        <NewArrivals />
        <Categories />
        <PopularBooks/>
      </Container>
    </>
  );
};

export default Home;
