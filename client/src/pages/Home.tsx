import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Categories from "../components/home/Category/Categories";
import HeroSection from "../components/home/HeroSection";
import NewArrivals from "../components/home/NewArrivals/NewArrivals";
import PopularBooks from "../components/home/PopularBooks/PopularBooks";
import Container from "../components/shared/Container";

const Home = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

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
        <motion.div
          ref={containerRef}
          style={{ opacity, scale }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div variants={itemVariants}>
            <NewArrivals />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Categories />
          </motion.div>
          <motion.div variants={itemVariants}>
            <PopularBooks />
          </motion.div>
        </motion.div>
      </Container>
    </>
  );
};

export default Home;
