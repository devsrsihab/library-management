import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="relative z-10 lg:w-full lg:max-w-2xl">
          <svg
            className="absolute inset-y-0 right-8 hidden h-full w-80 translate-x-1/2 transform fill-white lg:block"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="0,0 90,0 50,100 0,100" />
          </svg>

          <div className="relative py-32 px-6 sm:py-40 lg:py-56 lg:px-8 lg:pr-0">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
              <div className="hidden sm:mb-10 sm:flex">
                <div className="relative rounded-full py-1 px-3 text-sm leading-6 text-gray-500 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                  Discover a world of knowledge at your fingertips.{" "}
                  <a
                    href="#"
                    className="whitespace-nowrap font-semibold text-primary"
                  >
                    <span className="absolute inset-0" aria-hidden="true" />
                    Explore Now <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Your Gateway to Endless Learning
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Access thousands of books, journals, and digital resources.
                Whether you're researching, reading for pleasure, or seeking
                knowledge, our library is here to support your journey.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <Link
                  to="/books"
                  className="rounded-md bg-primary hover:text-white hover:bg-primary px-3.5 py-1.5 text-base font-semibold leading-7 text-white shadow-sm  "
                >
                  Start Exploring
                </Link>
                <Link
                  to="/register"
                  className="text-base font-semibold leading-7 text-primary hover:text-secondary"
                >
                  Learn More <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="aspect-[3/2] object-cover lg:aspect-auto lg:h-full lg:w-full"
          src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80"
          alt="Library Image"
        />
      </div>
    </div>
  );
};

export default HeroSection;
