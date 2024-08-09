import { CategoryProps } from "../../../types";

const Category: React.FC<CategoryProps> = ({ category }) => {
  return (
    <>
      <div
        key={category.name}
        className="flex flex-col overflow-hidden rounded-lg shadow-lg"
      >
        <div className="flex-shrink-0">
          <img
            className="h-48 w-full object-cover"
            src={category.image}
            alt=""
          />
        </div>
        <div className="flex flex-1 flex-col justify-between bg-white p-6">
          <div className="flex-1">
            <a className="mt-2 block">
              <p className="text-xl font-semibold text-gray-900">
                {category.name}
              </p>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
