import { TUser } from "./book.type";
import { TCategory } from "./category.type";

export type TTableData = {
  _id: string;
  name: string;
  email: string;
  image: string;
  role: string;
};

export type TBookingTableData = {
  _id: string;
  name: string;
  author: TUser["name"];
  category: TCategory["name"];
  quantity: number;
  image: string;
};

export type TCategoryTableData = {
  _id: string;
  name: string;
  image: string;
};
