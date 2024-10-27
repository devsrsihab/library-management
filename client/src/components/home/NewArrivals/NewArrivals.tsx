import { useGetAllBookQuery } from "../../../redux/features/book/bookApi";
import { TBook } from "../../../types";
import Book from "./NewArrival";
import { Carousel } from "antd";
import "../../../App.css";
import BookSkeltoneLoader from "../../shared/loader/BookSkeltoneLoader";
import SectionTitleBeta from "../../ui/SectionTitleBeta";

const NewArrivals = () => {
  const { data, isLoading } = useGetAllBookQuery([
    { name: "sort", value: "-createdAt" },
  ]);
  const books = data?.data || [];

  return (
    <section className=" bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="">
        <SectionTitleBeta title="New Arrivals" />
        <div className="relative">
          {isLoading ? (
            <BookSkeltoneLoader />
          ) : (
            <Carousel
              className="custom-carousel"
              slidesToScroll={1}
              infinite={true}
              arrows
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
              {books.map((book: TBook) => (
                <div key={book._id} className="px-2">
                  <Book book={book} />
                </div>
              ))}
            </Carousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
