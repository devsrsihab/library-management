import { useState } from "react";
import { TBooksProps } from "../../../types";
import AddToBorrow from "../../shared/AddToBorrow";

const RecentlyView: React.FC<TBooksProps> = ({ book }) => {
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
      </div>
    </>
  );
};

export default RecentlyView;
