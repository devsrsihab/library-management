import Categories from "../components/home/Category/Categories";
import HeroSection from "../components/home/HeroSection";
import NewArrivals from "../components/home/NewArrivals/NewArrivals";
import PopularBooks from "../components/home/PopularBooks/PopularBooks";
import RecentlyViews from "../components/home/RecentlyViewed/RecentlyViews";
import Container from "../components/shared/Container";

const Home = () => {
  return (
    <>
      <Container>
        <HeroSection />
        <NewArrivals />
        <Categories />
        <PopularBooks/>
        <RecentlyViews/>
      </Container>
    </>
  );
};

export default Home;
