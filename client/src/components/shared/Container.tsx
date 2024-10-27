const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="border-l border-r border-red-500 w-full max-w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-[1280px] mx-auto px-2 sm:px-2 lg:px-3">
      {children}
    </div>
  );
};

export default Container;
