import { useGetAllCategoryQuery } from "../../../redux/features/category/categoryApi";
import Category from "./Category";
import { TypeCategory } from "../../../types";
import PulsLoader from "../../shared/loader/PulsLoader";
import { Carousel } from "antd";
export default function Categories() {
  const { data, isLoading } = useGetAllCategoryQuery(undefined);
  const categories = data?.data || [];

  return (
    <div className="relative mx-auto bg-gray-50  py-8  lg:py-5 max-w-7xl">
      <div className="absolute inset-0">
        <div className="h-1/3 bg-white sm:h-2/3" />
      </div>
      <div className="relative mx-auto">
        <h2 className="text-xl font-bold ml-4 text-gray-900">All Categories</h2>
        <div className="mx-auto mt-6  max-w-lg gap-5 lg:max-w-none ">
          <Carousel
            className="custom-carousel"
            slidesToShow={5}
            slidesToScroll={1}
            arrows
            infinite={true}
          >
            {isLoading ? (
              <PulsLoader />
            ) : (
              categories.map((category: TypeCategory) => (
                <Category key={category.name} category={category} />
              ))
            )}
          </Carousel>
        </div>
      </div>
    </div>
  );
}
