import { TCategoryProps } from "../../../types";
import { nameShorter } from "../../../utils/nameShorter";

const Category: React.FC<TCategoryProps> = ({ category }) => {

  return (
    <div
      key={category.name}
      className="flex mx-4 flex-col overflow-hidden rounded-lg shadow-lg"
    >
      <div className="flex-shrink-0">
        <img
          className="h-full w-full object-cover"
          src={category.image}
          alt={category.name}
        />
      </div>
      <div className="flex-1  flex flex-col justify-between bg-white p-6">
        <div className="flex-1">
          <span className="mt-2 block">
            <p className="text-sm capitalize font-semibold text-gray-900">
              {nameShorter(category.name)}
            </p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Category;
