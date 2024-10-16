const BookSkeltoneLoader = () => {
  return (
    <div className="grid grid-cols-5 gap-3">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="group mx-2 relative rounded-lg border border-gray-200 p-2 pb-0 sm:p-3 sm:pb-0 transition-all duration-300 hover:border-primary animate-pulse"
        >
          {/* Skeleton for the book image */}
          <div className="h-52 aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-200"></div>

          {/* Skeleton for the book name */}
          <div className="pt-2 pb-4 text-center">
            <div className="h-4 w-3/4 bg-gray-300 mx-auto rounded"></div>

            {/* Skeleton for the button */}
            <div className="mx-auto relative my-3 h-8 w-1/2 bg-gray-300 rounded-md"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookSkeltoneLoader;
