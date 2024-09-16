import { useGetAllCategoryQuery } from "../../../redux/features/category/categoryApi";
import Category from "./Category";
import { TypeCategory } from "../../../types";
import { Carousel } from "antd";
import CategorySkeltoneLoader from "../../shared/loader/CategorySkeltoneLoader";
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
        <div className=" mt-6  gap-5 lg:max-w-none ">
          {isLoading ? (
            <CategorySkeltoneLoader />
          ) : (
            <>
              <Carousel
                className="custom-carousel"
                slidesToScroll={1}
                arrows
                infinite={true}
                slidesToShow={5}
                responsive={[
                  {
                    breakpoint: 1280, // large screens
                    settings: {
                      slidesToShow: 4,
                    },
                  },
                  {
                    breakpoint: 992, // medium screens
                    settings: {
                      slidesToShow: 3,
                    },
                  },
                  {
                    breakpoint: 768, // small screens (tablets)
                    settings: {
                      slidesToShow: 2,
                    },
                  },
                  {
                    breakpoint: 443, // extra small screens (mobile)
                    settings: {
                      slidesToShow: 1,
                    },
                  },
                ]}
              >
                {categories.map((category: TypeCategory) => (
                  <Category key={category.name} category={category} />
                ))}
              </Carousel>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
