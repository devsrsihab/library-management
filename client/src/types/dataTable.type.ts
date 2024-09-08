import { TUser } from "./book.type";
import { TCategory } from "./category.type";

export type TTableData = {
  _id: string;
  name: string;
  email: string;
  image: string;
  role: "admin" | "viewer" | "author";
};

export type TBookingTableData = {
  _id: string;
  name: string;
  author: TUser["name"];
  category: TCategory["name"];
  quantity: number;
  image: string;
};
