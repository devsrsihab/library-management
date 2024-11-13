import { Types } from 'mongoose';

export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TViewer = {
  id: string;
  name: TUserName;
  borrowedBooks: Types.ObjectId[];
  user: Types.ObjectId;
  image: string;
  gender: 'male' | 'female' | 'other';
  email: string;
  role: string;
  status: 'FREE' | 'PAID';
  paidStatusValidDate: Date;
  dateOfBirth: string;
  isDeleted: boolean;
};
