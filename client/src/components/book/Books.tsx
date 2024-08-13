import { useGetAllBookQuery } from "../../redux/features/book/bookApi";
import { TBook } from "../../types";
import PageHeader from "../shared/PageHeader";
import PulsLoader from "../shared/PulsLoader";
import Book from "./Book";

export default function Books() {
  const { data, isLoading } = useGetAllBookQuery(undefined);
  const books = data?.data || [];
  console.log(books);

  return (
    <div className="bg-white">
      <PageHeader title="Books" description="All Books will be shown here" />
      <div className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8">
        <div className="-mx-px grid grid-cols-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
          {isLoading ? (
            <PulsLoader />
          ) : (
            books.map((book: TBook) => <Book key={book._id} book={book} />)
          )}
        </div>
      </div>
    </div>
  );
}
