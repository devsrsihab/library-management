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
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        {isLoading ? (
          <SinglePageLoader />
        ) : (
          <div className="md:flex">
            <div className="md:flex-shrink-0 md:w-1/3">
              <img
                className="h-64 w-full object-cover md:h-full md:w-full"
                src={book?.image}
                alt={book?.name}
              />
            </div>
            <div className="p-8 md:w-2/3">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                {book?.category?.name}
              </div>
              <h1 className="block mt-1 text-3xl leading-tight font-bold text-black">
                {book?.name}
              </h1>
              <p className="mt-2 text-gray-500">by {book?.author?.name}</p>
              <p className="mt-4 text-gray-600">{book?.shortDescription}</p>

              <div className="mt-6 flex items-center">
                <img
                  className="h-10 w-10 rounded-full mr-4"
                  src={book?.createdBy?.image}
                  alt={book?.createdBy?.name}
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Added by {book?.createdBy.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(book?.createdAt as Date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">
                    Available: {book?.quantity}
                  </p>
                  <p className="text-sm text-gray-600">
                    Borrowed: {book?.borrowedCount} times
                  </p>
                </div>
                <button
                  onClick={() => setModalOpen(true)}
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Add To Borrow
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <AddToBorrow
        book={book?._id}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
    </div>
  );
};

export default BookDetails;
