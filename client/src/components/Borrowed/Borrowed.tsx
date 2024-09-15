import { useState } from "react";
import { TBorrowProps } from "../../types/borrowed.type";
import ConfirmModal from "./ConfirmModal";

const Borrowed: React.FC<TBorrowProps> = ({ borrowed }) => {
  const [openReturn, setOpenReturn] = useState(false);

  return (
    <>
      <div key={borrowed?._id}>
        <ConfirmModal
          id={borrowed?._id}
          openReturn={openReturn}
          setOpenReturn={setOpenReturn}
        />

        <div className="relative">
          <div className="relative h-72 w-full overflow-hidden rounded-lg">
            <img
              src={borrowed?.book?.image}
              className="h-full w-full object-contain object-center"
            />
          </div>

          <div className="absolute inset-x-0 top-0 flex flex-col justify-end gap-3 h-72  overflow-hidden rounded-lg p-4">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
            />
            <div className="flex items-center gap-3">
              <div className="relative text-lg font-semibold text-white">
                <p className="text-xs">{borrowed?.book?.name}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <a
            onClick={() => setOpenReturn(true)}
            className="relative flex bg-[#15616d] text-white hover:text-black transition duration-300 hover:bg-gray-200 items-center justify-center rounded-md border border-transparent  py-2 px-8 text-sm font-medium "
          >
            Return Book
          </a>
        </div>
      </div>
    </>
  );
};

export default Borrowed;
