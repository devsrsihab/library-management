const PulsLoader = () => {
  return (
    <>
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col overflow-hidden rounded-lg shadow-lg animate-pulse"
        >
          <div className="flex-shrink-0 h-48 bg-gray-300" />
          <div className="flex-1 flex flex-col justify-between bg-white p-6">
            <div className="flex-1 space-y-4">
              <div className="h-6 bg-gray-300 rounded w-3/4"></div>
              <div className="h-6 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default PulsLoader;
