import { BookProps } from "../../types";

const Borrowed: React.FC<BookProps> = ({ product }) => {
  return (
    <>
      {
        <div key={product.id}>
          <div className="relative">
            <div className="relative h-72 w-full overflow-hidden rounded-lg">
              <img
                src={product.imageSrc}
                alt={product.imageAlt}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="relative mt-4">
              <h3 className="text-sm font-medium text-gray-900">
                {product.name}
              </h3>
            </div>
            <div className="absolute inset-x-0 top-0 flex flex-col justify-end gap-3 h-72  overflow-hidden rounded-lg p-4">
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
              />
              <div className="flex items-center gap-3">
                <p className="relative text-lg font-semibold text-white">
                  {product.price}
                </p>
                <div className="relative text-lg font-semibold text-white">
                  <div className="user flex gap-2 items-center">
                    <img
                      className="h-6 w-6 rounded-full"
                      src={product.imageSrc}
                      alt=""
                    />
                    <p className="text-xs">By {product.name}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <a
              href={product.href}
              className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 py-2 px-8 text-sm font-medium text-gray-900 hover:bg-gray-200"
            >
              Add to Borrow
            </a>
          </div>
        </div>
      }
    </>
  );
};

export default Borrowed;
