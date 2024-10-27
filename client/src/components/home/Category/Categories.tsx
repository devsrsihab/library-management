import { useGetAllCategoryQuery } from "../../../redux/features/category/categoryApi";
import Category from "./Category";
import { TypeCategory } from "../../../types";
import { Carousel } from "antd";
import CategorySkeltoneLoader from "../../shared/loader/CategorySkeltoneLoader";
import SectionTitleBeta from "../../ui/SectionTitleBeta";

export default function Categories() {
  const { data, isLoading } = useGetAllCategoryQuery(undefined);
  const categories = data?.data || [];

  return (
    <section className=" bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="mx-auto ">
        <SectionTitleBeta title="Explore Categories" />
        <div className="relative">
          {isLoading ? (
            <CategorySkeltoneLoader />
          ) : (
            <Carousel
              className="custom-carousel"
              slidesToScroll={1}
              arrows
              infinite={true}
              slidesToShow={5}
              responsive={[
                {
                  breakpoint: 1280,
                  settings: {
                    slidesToShow: 4,
                  },
                },
                {
                  breakpoint: 992,
                  settings: {
                    slidesToShow: 3,
                  },
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 2,
                  },
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1,
                  },
                },
              ]}
            >
              {categories.map((category: TypeCategory) => (
                <div key={category.name} className="px-2">
                  <Category category={category} />
                </div>
              ))}
            </Carousel>
          )}
        </div>
      </div>
    </section>
  );
}
