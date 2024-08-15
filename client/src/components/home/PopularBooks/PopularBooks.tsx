import { useGetAllBookQuery } from "../../../redux/features/book/bookApi";
import { TBook } from "../../../types";
import PulsLoader from "../../shared/PulsLoader";
import Book from "./PopularBook";
import { Carousel } from "antd";
import '../../../App.css'


const PopularBooks = () => {
  const { data, isLoading } = useGetAllBookQuery(undefined);
  const books = data?.data || [];
  console.log(books);

  return (
    <div className="bg-blue-d py-8  lg:py-5">
      <h2 className="text-xl ml-4 font-bold text-gray-900">Popular Books</h2>

      <div className="mx-auto max-w-7xl overflow-hidden ">
        <div className="-mx-px  border-l border-gray-200  mt-6  sm:mx-0 ">
          <Carousel
            className="custom-carousel"
            slidesToShow={5}
            slidesToScroll={1}
            arrows
            infinite={true}
            // autoplay
          >
            {isLoading ? (
              <PulsLoader />
            ) : (
              books.map((book: TBook) => <Book key={book._id} book={book} />)
            )}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default PopularBooks;
