const BorrowdCardLoader = () => {
  return (
    <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
      {[...Array(4)].map(() => (
        <div className="animate-pulse" key="skeleton">
          <div className="relative">
            <div className="relative h-72 w-full overflow-hidden rounded-lg bg-gray-300"></div>

            <div className="absolute inset-x-0 top-0 flex flex-col justify-end gap-3 h-72 overflow-hidden rounded-lg p-4">
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-gray-500 opacity-50"
              ></div>

              <div className="w-1/2 h-4 bg-gray-400 rounded-md"></div>
            </div>
          </div>

          <div className="mt-6">
            <div className="relative flex bg-gray-400 h-10 w-32 rounded-md"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BorrowdCardLoader;
