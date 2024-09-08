const FormSkeletonLoader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6 space-y-6 animate-pulse">
        <div className="space-y-4">
          <div className="h-6 bg-gray-300 rounded w-1/3"></div>
          <div className="h-10 bg-gray-300 rounded"></div>
        </div>
        <div className="space-y-4">
          <div className="h-6 bg-gray-300 rounded w-1/3"></div>
          <div className="h-10 bg-gray-300 rounded"></div>
        </div>
        <div className="space-y-4">
          <div className="h-6 bg-gray-300 rounded w-1/3"></div>
          <div className="h-24 bg-gray-300 rounded"></div>
        </div>
        <div className="space-y-4">
          <div className="h-6 bg-gray-300 rounded w-1/3"></div>
          <div className="h-10 bg-gray-300 rounded"></div>
        </div>
        <div className="space-y-4">
          <div className="h-6 bg-gray-300 rounded w-1/3"></div>
          <div className="h-10 bg-gray-300 rounded"></div>
        </div>
        <div className="space-y-4">
          <div className="h-64 bg-gray-300 rounded"></div>
        </div>
        <div>
          <div className="h-12 bg-blue-300 rounded w-full"></div>
        </div>
      </div>
    </div>
  );
};

export default FormSkeletonLoader;
