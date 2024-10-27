import { useState } from "react";
import { Star, ChevronRight, ChevronLeft } from "lucide-react";
import SectionTitleBeta from "./SectionTitleBeta";

const reviews = [
  {
    id: 1,
    name: "Alice Johnson",
    rating: 5,
    text: "This library has transformed my reading habits. The staff is incredibly helpful!",
    image:
      "https://images.unsplash.com/photo-1524578271613-d550eacf6090?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 2,
    name: "Bob Smith",
    rating: 4,
    text: "I love the quiet atmosphere and the wide range of books available.",
    image:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 3,
    name: "Carol Davis",
    rating: 5,
    text: "The children's section is fantastic! My kids always look forward to our visits.",
    image:
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
  },
];

const Reviews = () => {
  const [activeReview, setActiveReview] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextReview = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setActiveReview((prev) => (prev + 1) % reviews.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const prevReview = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setActiveReview((prev) => (prev - 1 + reviews.length) % reviews.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  return (
    <section className=" mb-12 sm:mb-16 md:mb-20 lg:mb-24 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitleBeta title="Reader Experiences" />
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-[#125662] via-[#1a7d8c] to-[#2194a7] opacity-10 blur-3xl"></div>
          <div className="relative h-[70vh] sm:h-[60vh] w-full">
            {reviews.map((review, index) => (
              <div
                key={review.id}
                className={`absolute inset-0 transition-all duration-500 ${
                  index === activeReview
                    ? "opacity-100 scale-100 z-20"
                    : "opacity-0 scale-95 z-10"
                }`}
              >
                <div
                  className="w-full h-full rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl overflow-hidden relative bg-white"
                  style={{
                    boxShadow: `0 0 50px rgba(18, 86, 98, 0.2), inset 0 0 30px rgba(18, 86, 98, 0.1)`,
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8">
                    <div className="w-full max-w-2xl">
                      <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 mx-auto mb-4 sm:mb-6 rounded-full overflow-hidden border-2 sm:border-4 border-[#125662] shadow-md sm:shadow-lg">
                        <img
                          src={review.image}
                          alt={review.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-2xl sm:text-3xl md:text-4xl text-center font-bold text-[#125662] mb-2 sm:mb-4">
                        {review.name}
                      </h3>
                      <div className="flex justify-center mb-2 sm:mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            fill={i < review.rating ? "#125662" : "none"}
                            stroke="#125662"
                            className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8"
                          />
                        ))}
                      </div>
                      <p className="text-gray-600 text-sm sm:text-base md:text-xl italic leading-relaxed text-center">
                        "{review.text}"
                      </p>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-white to-transparent"></div>
                </div>
              </div>
            ))}
            <button
              onClick={prevReview}
              className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 transition-all duration-300 rounded-full p-1 sm:p-2 z-30"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 text-[#125662]" />
            </button>
            <button
              onClick={nextReview}
              className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 transition-all duration-300 rounded-full p-1 sm:p-2 z-30"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 text-[#125662]" />
            </button>
          </div>
          <div className="flex justify-center mt-4 sm:mt-6 md:mt-8 space-x-2 sm:space-x-4">
            {reviews.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${
                  index === activeReview
                    ? "bg-[#125662] scale-125"
                    : "bg-gray-300"
                }`}
                onClick={() => setActiveReview(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
