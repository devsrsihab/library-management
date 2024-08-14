import { Link } from "react-router-dom";
import { TCategoryProps } from "../../../types";

const Category: React.FC<TCategoryProps> = ({ category }) => {
  // cat name to slug
  const formatCategoryName = (name: string) => {
    return name.trim().toLowerCase().replace(/ /g, "-");
  };

  return (
    <Link to={`/category/${formatCategoryName(category.name)}`}>
      <div
        key={category.name}
        className="flex flex-col overflow-hidden rounded-lg shadow-lg"
      >
        <div className="flex-shrink-0">
          <img
            className="h-48 w-full object-cover"
            src={category.image}
            alt={category.name}
          />
        </div>
        <div className="flex-1 flex flex-col justify-between bg-white p-6">
          <div className="flex-1">
            <span className="mt-2 block">
              <p className="text-xl capitalize font-semibold text-gray-900">
                {category.name}
              </p>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Category;
