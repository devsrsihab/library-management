import { useGetAllBorrowBooksQuery } from "../../redux/features/borrow/borrowApi";
import { TBorrowBook } from "../../types/borrowed.type";
import { SerializedError } from "@reduxjs/toolkit";
import Pagination from "../shared/Pagination";
import PulsLoader from "../shared/loader/PulsLoader";
import ServerError500 from "../shared/result/ServerError500";
import Borrowed from "./Borrowed";
import NotFound404 from "../shared/result/NotFound404";

interface CustomSerializedError extends SerializedError {
  status: string;
}

const Borrowings = () => {
  const { data, isLoading, error } = useGetAllBorrowBooksQuery(undefined);
  const borrowings = data?.data || [];


  // server error
  if (
    error !== undefined &&
    (error as CustomSerializedError).status === "FETCH_ERROR"
  ) {
    return <ServerError500 />;
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl pb-16 px-4 sm:pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
        {isLoading ? (
          <PulsLoader />
        ) : borrowings.length === 0 ? (
          <NotFound404 /> // Render NotFound component when no borrowings are found
        ) : (
          <>
            <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
              {borrowings.map((borrowed: TBorrowBook) => (
                <Borrowed key={borrowed._id} borrowed={borrowed} />
              ))}
            </div>
            <Pagination />
          </>
        )}
      </div>
    </div>
  );
};

export default Borrowings;
