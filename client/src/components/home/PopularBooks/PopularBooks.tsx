import { useGetAllBookQuery } from "../../../redux/features/book/bookApi";
import { TBook } from "../../../types";
import Book from "./PopularBook";
import { Carousel } from "antd";
import "../../../App.css";
import BookSkeltoneLoader from "../../shared/loader/BookSkeltoneLoader";

const PopularBooks = () => {
  const { data, isLoading } = useGetAllBookQuery([
    { name: "sort", value: "createdAt" },
  ]);
  const books = data?.data || [];

  return (
    <div className="bg-blue-d py-8  lg:py-5">
      <h2 className="text-xl ml-4 font-bold text-gray-900">Popular Books</h2>

      <div className="mx-auto max-w-7xl overflow-hidden ">
        <div className="-mx-px  border-l border-gray-200  mt-6  sm:mx-0 ">
          {isLoading ? (
            <BookSkeltoneLoader />
          ) : (
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
              {" "}
              {books?.slice(0, 8).map((book: TBook) => (
                <Book key={book._id} book={book} />
              ))}
            </Carousel>
          )}
        </div>
      </div>
    </div>
  );
};

export default PopularBooks;
