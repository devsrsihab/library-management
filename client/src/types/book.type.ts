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
  needPasswordChange: boolean;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type TBook = {
  _id: string;
  name: string;
  authorName: string;
  category: string;
  quantity: number;
  shortDescription: string;
  rating: number;
  image: string;
  createdBy: TUser;
};

export type TBooksProps = {
  book: TBook;
};

