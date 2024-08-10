import { useGetAllCategoryQuery } from "../../../redux/features/category/categoryApi";
import Category from "./Category";
import { TypeCategory } from "../../../types";
import PulsLoader from "../../shared/PulsLoader";

export default function Categories() {
  const { data, isLoading } = useGetAllCategoryQuery(undefined);
  const categories = data?.data || [];
  console.log(categories);
  return (
    <div className="relative mx-auto bg-gray-50 px-6 pt-16 pb-20 lg:px-8 lg:pt-24 lg:pb-28 max-w-7xl">
      <div className="absolute inset-0">
        <div className="h-1/3 bg-white sm:h-2/3" />
      </div>
      <div className="relative mx-auto">
        <h2 className="text-xl font-bold text-gray-900">All Categories</h2>
        <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
          {isLoading ? (
            <PulsLoader />
          ) : (
            categories.map((category: TypeCategory) => (
              <Category key={category.name} category={category} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
