import { Link } from "react-router-dom";
import { useState } from "react";
import { TBooksProps } from "../../../types";
import { nameShorter } from "../../../utils/nameShorter";
import AddToBorrow from "../../shared/AddToBorrow";

const PopularBook: React.FC<TBooksProps> = ({ book }) => {
  const [modalOpen, setModalOpen] = useState(false);


  return (
    <>
      <div
        key={book._id}
        className="group mx-2 relative rounded duration-300  hover:border-2 border-gray-200 p-2 pb-0 sm:p-3 sm:pb-0"
      >
        <AddToBorrow
          book={book._id}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        />

        <div className="h-52 aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-white group-hover:opacity-75">
          <img
            src={book.image}
            className="h-full  w-full object-contain object-center"
          />
        </div>
        <div className="pt-2 pb-4 text-center">
          <h3 className="text-sm font-medium text-gray-900 capitalize">
            <Link to={`/books/${book._id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {nameShorter(book.name)}
            </Link>
          </h3>

          <a
            onClick={() => setModalOpen(true)}
            className="mx-auto relative my-3 flex items-center justify-center rounded-md border border-transparent bg-primary py-2 px-8 text-sm font-medium text-white hover:text-white hover:bg-primary"
          >
            Add to Borrow
          </a>
        </div>
      </div>
    </>
  );
};

export default PopularBook;
