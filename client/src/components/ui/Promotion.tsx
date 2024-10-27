import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

const Promotion = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-gray-50 my-12 sm:my-16 md:my-20 lg:my-24 ">
      <div>
        <div
          className={`transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="relative overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-[#125662] rounded-full opacity-10"></div>
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-[#1a7d8c] rounded-full opacity-10" />
            <div className="relative px-8 py-12 sm:px-12 sm:py-16 flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#125662] mb-4 leading-tight">
                  Dive into Summer Reading Adventure
                </h2>
                <p className="text-lg sm:text-xl text-gray-600 mb-6">
                  Challenge yourself to read 5 books and unlock a world of
                  rewards!
                </p>
                <a
                  href="#"
                  className="inline-flex items-center px-6 py-3 text-lg font-semibold rounded-full text-white bg-gradient-to-r from-[#125662] to-[#1a7d8c] hover:from-[#0d3f48] hover:to-[#125662] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Join the Challenge
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </a>
              </div>
              <div className="md:w-1/2 relative">
                <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <img
                    src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                    alt="Summer Reading"
                    className="w-full h-full object-center object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promotion;
