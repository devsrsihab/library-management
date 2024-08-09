import { FaStar } from "react-icons/fa";
import { TBooksProps } from "../../types";
import { Link } from "react-router-dom";
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
const Book: React.FC<TBooksProps> = ({ book }) => {
  return (
    <div
      key={book._id}
      className="group relative border-r border-b border-gray-200 p-4 sm:p-6"
    >
      <Link to={`/books/${book._id}`}>
        <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
          <img
            src={book.image}
            className="h-full w-full object-cover object-center"
          />
        </div>
      </Link>
      <div className="pt-10 pb-4 text-center">
        <h3 className="text-sm font-medium text-gray-900">
          <Link to={`/books/${book._id}`}>
            <span aria-hidden="true" className="absolute inset-0" />
            {book.name}
          </Link>
        </h3>
        <div className="mt-3 flex flex-col items-center">
          <p className="sr-only">{book.rating} out of 5 stars</p>
          <div className="flex items-center">
            {[0, 1, 2, 3, 4].map((rating) => (
              <FaStar
                key={rating}
                className={classNames(
                  book.rating > rating ? "text-yellow-400" : "text-gray-200",
                  "flex-shrink-0 h-5 w-5"
                )}
                aria-hidden="true"
              />
            ))}
          </div>
          <p className="mt-1 text-sm text-gray-500">{11} reviews</p>
        </div>

        <a className="relative my-3 flex items-center justify-center rounded-md border border-transparent bg-gray-100 py-2 px-8 text-sm font-medium text-gray-900 hover:bg-gray-200">
          Add to Borrow
        </a>
      </div>
    </div>
  );
};

export default Book;
