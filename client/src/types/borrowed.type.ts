

export type TBorrowBook = {
  _id: string;
  book: TBook;
  user: TUser;
  borrowedDate: string;
  returnDate: string;
}

export type TBook = {
  name: string;
  authorName: string;
  category: string;
  quantity: number;
  shortDescription: string;
  rating: string;
  image: string;
  createdBy: string;
}

export type TUser = {
  id: string;
  email: string;
  needPasswordChange: boolean;
  role: string;
  status: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}


export type TBorrowProps = {
  borrowed: TBorrowBook;
};