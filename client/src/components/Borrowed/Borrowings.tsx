import Pagination from "../shared/Pagination";
import Book from "./Borrowed";

// Array of product objects
const products = [
  {
    id: 1,
    name: "Zip Tote Basket",
    color: "White and black",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-01.jpg",
    imageAlt:
      "Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.",
    price: "$140",
  },
  {
    id: 2,
    name: "Another Product",
    color: "Blue",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-02.jpg",
    imageAlt: "Front of another product with blue canvas.",
    price: "$150",
  },
  // More products...
];

const Borrowings = () => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl pb-16 px-4 sm:pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <Book key={product.id} product={product} />
          ))}
        </div>
        <Pagination />
      </div>
    </div>
  );
};

export default Borrowings;
