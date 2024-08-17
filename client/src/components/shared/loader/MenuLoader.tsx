const MenuLoader = () => {
  return (
    <div className="flex flex-col justify-center  space-y-2 w-full">
      <div className="w-full h-1 bg-gray-300 animate-pulse"></div>
      <div className="w-5/6 h-1 bg-gray-300 animate-pulse delay-100"></div>
      <div className="w-4/6 h-1 bg-gray-300 animate-pulse delay-200"></div>
      <div className="w-3/6 h-1 bg-gray-300 animate-pulse delay-200"></div>
    </div>
  );
};

export default MenuLoader;
