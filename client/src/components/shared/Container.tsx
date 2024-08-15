const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full max-w-full lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
};

export default Container;
