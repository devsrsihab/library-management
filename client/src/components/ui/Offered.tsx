import { useState, useEffect } from "react";
import { Book, Clock, CreditCard } from "lucide-react";
import SectionTitleBeta from "./SectionTitleBeta";

const offers = [
  {
    icon: <Book className="w-12 h-12 text-white" />,
    title: "New Releases",
    description: "50% off on all new titles",
    color: "from-[#125662] to-[#1a7d8c]",
  },
  {
    icon: <Clock className="w-12 h-12 text-white" />,
    title: "Extended Borrowing",
    description: "6 weeks for premium members",
    color: "from-[#125662] to-[#1a7d8c]",
  },
  {
    icon: <CreditCard className="w-12 h-12 text-white" />,
    title: "Student Discount",
    description: "20% off with valid ID",
    color: "from-[#125662] to-[#1a7d8c]",
  },
];

const Offered = () => {
  const [activeOffer, setActiveOffer] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveOffer((prev) => (prev + 1) % offers.length);
        setIsTransitioning(false);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className=" bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitleBeta title="Discover Our Offers" />
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#125662] to-[#1a7d8c] opacity-10 transform -skew-y-6"></div>
          <div className="relative z-10">
            <div className="relative h-96">
              {offers.map((offer, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                    index === activeOffer
                      ? "opacity-100 transform scale-100"
                      : "opacity-0 transform scale-95"
                  } ${isTransitioning ? "blur-sm" : ""}`}
                >
                  <div className="bg-white rounded-2xl p-8 w-full max-w-md transform hover:scale-105 transition-transform duration-300 shadow-lg">
                    <div
                      className={`w-20 h-20 rounded-full bg-gradient-to-r ${offer.color} flex items-center justify-center mb-6 mx-auto`}
                    >
                      {offer.icon}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#125662] text-center mb-4">
                      {offer.title}
                    </h3>
                    <p className="text-lg sm:text-xl text-gray-600 text-center mb-8">
                      {offer.description}
                    </p>
                    <button
                      className={`w-full py-3 rounded-full bg-gradient-to-r ${offer.color} text-white text-lg font-semibold hover:opacity-90 transition-opacity duration-300`}
                    >
                      Claim Offer
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-8 space-x-2">
              {offers.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index === activeOffer ? "bg-[#125662]" : "bg-gray-300"
                  }`}
                  onClick={() => setActiveOffer(index)}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Offered;
