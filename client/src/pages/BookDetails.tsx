import { useParams } from "react-router-dom";
import { useGetSingleBookQuery } from "../redux/features/book/bookApi";
import StarRating from "../components/shared/StarRating";
import AddToBorrow from "../components/book/AddToBorrow";
import { useState } from "react";
import SinglePageLoader from "../components/shared/SinglePageLoader";


const BookDetails = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const { id } = useParams();
  const { data, isLoading } = useGetSingleBookQuery(id);
  const book = data?.data;
  console.log(book);

  return (
    <div className="bg-white">
      <div className="mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        {isLoading ? (
          <SinglePageLoader />
        ) : (
          <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
            <AddToBorrow
              book={book._id}
              modalOpen={modalOpen}
              setModalOpen={setModalOpen}
            />
            <div className="lg:col-span-4 lg:row-end-1">
              <div className="w-[260px] h-[372px] overflow-hidden rounded-lg bg-gray-100 mx-auto">
                <img
                  src={book.image}
                  className="object-cover object-center w-full h-full"
                />
              </div>
            </div>

            <div className="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
              <div className="flex flex-col-reverse">
                <div className="mt-4">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    {book.name}
                  </h1>

                  <h2 id="information-heading" className="sr-only">
                    Product information
                  </h2>
                  <p className="mt-2 text-sm text-gray-500">
                    Version 22 July 2024
                  </p>
                </div>

                <div>
                  <h3 className="sr-only">Reviews</h3>
                  <div className="flex items-center">
                    <StarRating rating={book.rating} />
                  </div>
                </div>
              </div>

              <p className="mt-6 text-gray-500">{book.shortDescription}</p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                <button
                  onClick={() => setModalOpen(true)}
                  type="button"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Add To Borrow
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetails;
