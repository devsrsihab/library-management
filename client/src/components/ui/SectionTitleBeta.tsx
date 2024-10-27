const SectionTitleBeta = ({ title }: { title: string }) => {
  return (
    <div className="text-center my-12 sm:my-16 md:my-20 lg:my-24">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#125662] mb-4">
        {title}
      </h2>
      <div className="w-24 h-1 bg-[#125662] mx-auto"></div>
    </div>
  );
};

export default SectionTitleBeta;
