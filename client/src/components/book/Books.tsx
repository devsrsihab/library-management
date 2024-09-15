import { useState } from "react";
import { useGetAllBookQuery } from "../../redux/features/book/bookApi";
import { TBook } from "../../types";
import PageHeader from "../shared/PageHeader";
import Book from "./Book";
import { Pagination } from "antd";
import BorrowdCardLoader from "../shared/loader/BorrowdCardLoader";
import NotFound404 from "../shared/result/NotFound404";

export default function Books() {
  const [page, setPage] = useState(1);
  const { data: booksData, isLoading } = useGetAllBookQuery([
    { name: "limit", value: 10 },
    { name: "page", value: page },
  ]);
  const books = booksData?.data || [];
  const metaData = booksData?.meta;

  return (
    <div className="bg-white min-h-screen">
      <PageHeader title="Books" description="All Books will be shown here" />
      <div className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8">
        <div>
          {isLoading ? (
            <BorrowdCardLoader />
          ) : books.length === 0 ? (
            <NotFound404 />
          ) : (
            <>
              <div className="-mx-px grid gap-4 grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-5">
                {books?.map((book: TBook) => (
                  <Book key={book._id} book={book} />
                ))}
              </div>
            </>
          )}
        </div>
        <div className="mt-8 flex justify-center">
          <Pagination
            onChange={(value) => setPage(value)}
            current={page}
            pageSize={metaData?.limit}
            total={metaData?.total}
          />
        </div>
      </div>
    </div>
  );
}
