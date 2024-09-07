const DashboardLoader = () => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md animate-pulse">
      {/* User Info Loader */}
      <div className="flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gray-300 rounded-full" />
          <div>
            <div className="w-32 h-6 bg-gray-300 rounded mb-2" />
            <div className="w-48 h-4 bg-gray-300 rounded" />
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="w-32 h-10 bg-gray-300 rounded" />
          <div className="w-32 h-10 bg-gray-300 rounded" />
        </div>
      </div>
      {/* Stats or Quick Links Loader */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-300 p-4 rounded-lg shadow-sm flex items-center justify-between space-x-4">
          <div className="w-1/2 h-6 bg-gray-400 rounded" />
          <div className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-gray-400 rounded-full" />
          </div>
        </div>
        <div className="bg-gray-300 p-4 rounded-lg shadow-sm flex items-center justify-between space-x-4">
          <div className="w-1/2 h-6 bg-gray-400 rounded" />
          <div className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-gray-400 rounded-full" />
          </div>
        </div>
        <div className="bg-gray-300 p-4 rounded-lg shadow-sm flex items-center justify-between space-x-4">
          <div className="w-1/2 h-6 bg-gray-400 rounded" />
          <div className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-gray-400 rounded-full" />
          </div>
        </div>
        <div className="bg-gray-300 p-4 rounded-lg shadow-sm flex items-center justify-between space-x-4">
          <div className="w-1/2 h-6 bg-gray-400 rounded" />
          <div className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-gray-400 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLoader;
