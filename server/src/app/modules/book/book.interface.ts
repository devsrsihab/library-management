import { Types } from 'mongoose';

export type TBook = {
  name: string;
  author: Types.ObjectId;
  category: Types.ObjectId;
  quantity: number;
  shortDescription: string;
  image: string;
  borrowedCount: number;
  createdBy: Types.ObjectId;
  isDeleted: boolean;
};
