import { TBook } from "../../types";
import PageHeader from "../shared/PageHeader";
import Book from "./Book";

const books: TBook[] = [
  {
    _id: "1a2b3c4d5e6f7g8h9i0j",
    name: "Organize Basic Set (Walnut)",
    authorName: "John Doe",
    category: "Office Supplies",
    quantity: 38,
    shortDescription:
      "A complete organizing set with a sleek walnut finish, perfect for office or home use.",
    rating: 5,
    image:
      "https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-01.jpg",
    createdBy: {
      _id: "1234567890abcdef",
      id: "U-0001",
      email: "johndoe@example.com",
      needPasswordChange: false,
      role: "admin",
      status: "active",
      createdAt: "2024-08-04T02:34:58.998Z",
      updatedAt: "2024-08-04T02:34:58.998Z",
    },
  },
  {
    _id: "1b2c3d4e5f6g7h8i9j0k",
    name: "Organize Pen Holder",
    authorName: "Jane Smith",
    category: "Office Supplies",
    quantity: 18,
    shortDescription:
      "A stylish pen holder to keep your desk neat and organized.",
    rating: 5,
    image:
      "https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-02.jpg",
    createdBy: {
      _id: "abcdef1234567890",
      id: "U-0002",
      email: "janesmith@example.com",
      needPasswordChange: false,
      role: "admin",
      status: "active",
      createdAt: "2024-08-04T02:34:58.998Z",
      updatedAt: "2024-08-04T02:34:58.998Z",
    },
  },
  {
    _id: "2a3b4c5d6e7f8g9h0i1j",
    name: "Organize Sticky Note Holder",
    authorName: "Alice Johnson",
    category: "Office Supplies",
    quantity: 14,
    shortDescription:
      "Keep your sticky notes in one place with this elegant holder.",
    rating: 5,
    image:
      "https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-03.jpg",
    createdBy: {
      _id: "fedcba0987654321",
      id: "U-0003",
      email: "alicejohnson@example.com",
      needPasswordChange: false,
      role: "admin",
      status: "active",
      createdAt: "2024-08-04T02:34:58.998Z",
      updatedAt: "2024-08-04T02:34:58.998Z",
    },
  },
  {
    _id: "2b3c4d5e6f7g8h9i0j1k",
    name: "Organize Phone Holder",
    authorName: "Michael Brown",
    category: "Office Supplies",
    quantity: 21,
    shortDescription:
      "A convenient holder to keep your phone within reach on your desk.",
    rating: 4,
    image:
      "https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-04.jpg",
    createdBy: {
      _id: "0987654321fedcba",
      id: "U-0004",
      email: "michaelbrown@example.com",
      needPasswordChange: false,
      role: "admin",
      status: "active",
      createdAt: "2024-08-04T02:34:58.998Z",
      updatedAt: "2024-08-04T02:34:58.998Z",
    },
  },
  {
    _id: "3a4b5c6d7e8f9g0h1i2j",
    name: "Organize Document Tray",
    authorName: "Emily Davis",
    category: "Office Supplies",
    quantity: 25,
    shortDescription:
      "A sleek document tray to keep your papers organized and accessible.",
    rating: 4.5,
    image:
      "https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-05.jpg",
    createdBy: {
      _id: "0123456789abcdef",
      id: "U-0005",
      email: "emilydavis@example.com",
      needPasswordChange: false,
      role: "admin",
      status: "active",
      createdAt: "2024-08-04T02:34:58.998Z",
      updatedAt: "2024-08-04T02:34:58.998Z",
    },
  },
];

export default function Books() {
  return (
    <div className="bg-white">
      <PageHeader title="Category Books" description="All the Related Category Books" />
      <div className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8">
        <div className="-mx-px grid grid-cols-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
          {/* Render the books */}
          {books.map((book) => (
            <Book key={book._id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
}
