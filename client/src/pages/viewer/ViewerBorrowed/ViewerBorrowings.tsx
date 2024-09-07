import { SerializedError } from "@reduxjs/toolkit";
import Borrowed from "./ViewerBorrowed";
import ServerError500 from "../../../components/shared/result/ServerError500";
import { useGetAllBorrowBooksQuery } from "../../../redux/features/borrow/borrowApi";
import PulsLoader from "../../../components/shared/loader/PulsLoader";
import NotFound404 from "../../../components/shared/result/NotFound404";
import { TBorrowBook } from "../../../types/borrowed.type";

interface CustomSerializedError extends SerializedError {
  status: string;
}

const ViewerBorrowings = () => {
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
          </>
        )}
      </div>
    </div>
  );
};

export default ViewerBorrowings;
