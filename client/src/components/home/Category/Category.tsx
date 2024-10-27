import { TypeCategory } from "../../../types";
import { Link } from "react-router-dom";
import { nameShorter } from "../../../utils/nameShorter";

export default function Category({ category }: { category: TypeCategory }) {
  return (
    <Link to={`/category/${category?._id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg">
        <div className="aspect-w-16 aspect-h-9">
          <img
            className="w-full h-full object-cover"
            src={category.image}
            alt={category.name}
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-[#125662] mb-2">
            {nameShorter(category.name)}
          </h3>
          <p className="text-sm text-gray-600">
            Explore books in this category
          </p>
        </div>
      </div>
    </Link>
  );
}
