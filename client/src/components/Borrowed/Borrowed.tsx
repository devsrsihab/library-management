import { TBorrowProps } from "../../types/borrowed.type";

const Borrowed: React.FC<TBorrowProps> = ({ borrowed }) => {
  return (
    <>
      {
        <div key={borrowed._id}>
          <div className="relative">
            <div className="relative h-72 w-full overflow-hidden rounded-lg">
              <img
                src={borrowed.book.image}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="relative mt-4">
              <h3 className="text-sm font-medium text-gray-900">
                {borrowed.book.name}
              </h3>
            </div>
            <div className="absolute inset-x-0 top-0 flex flex-col justify-end gap-3 h-72  overflow-hidden rounded-lg p-4">
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
              />
              <div className="flex items-center gap-3">
                <p className="relative text-lg font-semibold text-white">23</p>
                <div className="relative text-lg font-semibold text-white">
                  <div className="user flex gap-2 items-center">
                    <img
                      className="h-6 w-6 rounded-full"
                      src={borrowed.book.image}
                    />
                    <p className="text-xs">By {borrowed.book.name}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <a className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 py-2 px-8 text-sm font-medium text-gray-900 hover:bg-gray-200">
              Return Book
            </a>
          </div>
        </div>
      }
    </>
  );
};

export default Borrowed;
