import { motion } from "framer-motion";

import Categories from "../components/home/Category/Categories";
import HeroSection from "../components/home/HeroSection";
import NewArrivals from "../components/home/NewArrivals/NewArrivals";
import Container from "../components/shared/Container";
import Offered from "../components/ui/Offered";
import Promotion from "../components/ui/Promotion";
import Reviews from "../components/ui/Reviews";

const Home = () => {
  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
        duration: 0.6,
      },
    },
  };

  return (
    <>
      <HeroSection />
      <Container>
        <motion.div variants={itemVariants}>
          <Categories />
        </motion.div>
        <motion.div variants={itemVariants}>
          <NewArrivals />
        </motion.div>
        <motion.div variants={itemVariants}>
          <Offered />
        </motion.div>
        <motion.div variants={itemVariants}>
          <Promotion />
        </motion.div>
        <motion.div variants={itemVariants}>
          <Reviews />
        </motion.div>
      </Container>
    </>
  );
};

export default Home;
