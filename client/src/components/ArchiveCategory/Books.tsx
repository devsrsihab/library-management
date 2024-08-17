import { useParams } from "react-router-dom";
import { TBook } from "../../types";
import PageHeader from "../shared/PageHeader";
import Book from "./Book";
import { useGetAllBookByCategoryQuery } from "../../redux/features/book/bookApi";
import PulsLoader from "../shared/loader/PulsLoader";
import NotFound404 from "../shared/result/NotFound404";

export default function Books() {
  const { catname } = useParams();
  const categoryName = catname?.replace(/-/g, " ");
  const { data, isLoading } = useGetAllBookByCategoryQuery(categoryName);

  const books = data?.data || [];

  return (
    <div className="bg-white">
      <PageHeader
        title="Category Books"
        description="All the Related Category Books"
      />
      <div className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8">
        {isLoading ? (
          <PulsLoader />
        ) : books.length === 0 ? (
          <NotFound404 />
        ) : (
          <div className="-mx-px grid gap-4 grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-5">
            {books.map((book: TBook) => (
              <Book key={book._id} book={book} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
