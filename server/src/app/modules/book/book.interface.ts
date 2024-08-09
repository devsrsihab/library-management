import { Types } from 'mongoose';

export type TBook = {
  name: string;
  authorName: string;
  category: string;
  quantity: number;
  shortDescription: string;
  rating: string;
  image: string;
  createdBy: Types.ObjectId;
  isDeleted: boolean;
};
