import { useParams } from "react-router-dom";
import { useGetSingleBookQuery } from "../redux/features/book/bookApi";
import { useState } from "react";
import SinglePageLoader from "../components/shared/loader/SinglePageLoader";
import AddToBorrow from "../components/shared/AddToBorrow";

const BookDetails = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const { id } = useParams();
  const { data, isLoading } = useGetSingleBookQuery(id);
  const book = data?.data;

  return (
    <div className="bg-[#f1f2f4]">
      <div className="bg-white max-w-5xl mx-auto flex justify-center">
        <div className="max-w-3xl py-8 px-7 md:py-20 sm:px-6 lg:px-8 w-full">
          {isLoading ? (
            <SinglePageLoader />
          ) : (
            <div className="flex flex-col sm:flex-row sm:items-start  sm:gap-x-8">
              <div className="flex md:justify-center lg:justify-start">
                <div className="w-[240px] border-2 border-gray-200 overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={book.image}
                    className="object-cover object-center w-full h-full"
                  />
                </div>
              </div>

              <div className="mt-10 lg:mt-0">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {book.name}
                </h1>
                <p className="mt-4 text-gray-500">{book.shortDescription}</p>

                <div className="mt-8">
                  <button
                    onClick={() => setModalOpen(true)}
                    type="button"
                    className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                  >
                    Add To Borrow
                  </button>
                </div>
                <AddToBorrow
                  book={book._id}
                  modalOpen={modalOpen}
                  setModalOpen={setModalOpen}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
