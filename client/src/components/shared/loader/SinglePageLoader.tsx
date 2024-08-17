const SinglePageLoader = () => {
  return (
    <div className="p-5 sm:p-10 lg:grid lg:grid-cols-5 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16 animate-pulse">
      {/* Simulate the product image */}
      <div className="lg:col-span-2">
        <div className="w-full h-[372px] overflow-hidden rounded-lg bg-gray-300 mx-auto relative">
          {/* Line inside the image div */}
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-indigo-600"></div>
        </div>
      </div>

      {/* Simulate the product details */}
      <div className="mt-10 max-w-full lg:col-span-3 lg:mt-0">
        <div className="flex flex-col-reverse">
          <div className="mt-4">
            <div className="h-8 bg-gray-300 rounded w-full"></div>
            <div className="h-6 bg-gray-300 rounded w-3/4 mt-4"></div>
          </div>
          <div className="flex items-center mt-6">
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          </div>
        </div>

        <div className="mt-6">
          <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        </div>

        <div className="mt-10">
          <div className="h-12 bg-gray-300 rounded w-full"></div>
        </div>
      </div>
    </div>
  );
};

export default SinglePageLoader;
