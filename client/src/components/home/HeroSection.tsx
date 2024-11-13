import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Container from "../shared/Container";

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-br from-[#15616d] to-[#001e29] text-white overflow-hidden">
      <Container>
        <div>
          <div className="relative z-10 py-5 md:py-12 lg:py-16 flex flex-col md:gap-6 sm:gap-3 lg:flex-row items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 text-center lg:text-left"
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                Your Gateway to
                <span className="block text-[#78cad2] mt-2">
                  Endless Learning
                </span>
              </h1>
              <p className="mt-8 text-xl leading-8 text-gray-300 max-w-2xl">
                Access thousands of books, journals, and digital resources.
                Embark on a journey of knowledge and discovery with our
                comprehensive library.
              </p>
              <div className="mt-12 flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6">
                <Link
                  to="/books"
                  className="px-8 py-4 rounded-full bg-white text-[#15616d] font-bold text-lg hover:bg-[#78cad2] hover:text-white transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                >
                  Start Exploring
                </Link>
                <Link
                  to="/register"
                  className="px-8 py-4 rounded-full bg-transparent border-2 border-white text-white font-bold text-lg hover:bg-white hover:text-[#15616d] transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:w-1/2 w-full mt-16 lg:mt-0"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-[#15616d] rounded-full filter blur-3xl opacity-30"></div>
                <img
                  className="relative rounded-2xl shadow-2xl w-full object-cover object-center h-[500px]"
                  src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80"
                  alt="Library Interior"
                />
              </div>
            </motion.div>
          </div>
        </div>
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </Container>
    </div>
  );
};

export default HeroSection;
