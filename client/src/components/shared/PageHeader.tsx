const PageHeader = ({title, description}: {title: string, description: string}) => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl py-16 px-6 sm:py-8 ">
        <div className="text-center">
          <p className="mt-1 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            {title}
          </p>
          <p className="mx-auto mt-5 max-w-xl text-xl text-gray-500">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
