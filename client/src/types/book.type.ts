import { TCategory } from "./category.type";

// Define the interface for the product prop
export type Product =  {
  id: number;
  name: string;
  color: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  price: string;
}

// Define the props for the Book component
export type BookProps =  {
  product: Product;
}

export type TUser = {
  _id: string;
  id: string;
  email: string;
  name: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type TBook = {
  _id: string;
  name: string;
  author: TUser;
  category: TCategory;
  quantity: number;
  shortDescription: string;
  image: string;
  createdBy: TUser;
};

export type TBooksProps = {
  book: TBook;
};



export type AddToBorrowProps = {
  book: string;
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
};
