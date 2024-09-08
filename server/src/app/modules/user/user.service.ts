/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import config from '../../config';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generatAdminId, generatAuthorId, generatViewerId } from './user.utils';
import AppError from '../../errors/appError';
import httpStatus from 'http-status';
import { TAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';
import { TAuthor } from '../author/author.interface';
import { Author } from '../author/author.model';
import QueryBuilder from '../../builder/QueryBuilder';

// Get all books
const getAllUserFromDB = async (query: Record<string, unknown>) => {
  const bookQuery = new QueryBuilder(User.find(), query).filter().sort().paginate().fields();

  const result = await bookQuery.modelQuery;
  const meta = await bookQuery.countTotal();
  return {
    result,
    meta,
  };
};

// regsister user
const registerUserToDB = async (payload: TUser) => {
  // if the password empty
  payload.password = payload.password || (config.user_default_password as string);

  try {
    payload.id = await generatViewerId();
    payload.role = 'viewer';
    // create a user transaction 01
    const result = await User.create(payload);
    return result;
  } catch (error: any) {
    throw new AppError(httpStatus.BAD_REQUEST, `Failed to register User: ${error?.message}`);
  }
};

// create viewer
const createUserToDB = async (payload: TUser) => {
  // if the password empty
  payload.password = payload.password || (config.user_default_password as string);

  try {
    // if admin then generate admin id
    if (payload.role === 'admin') {
      payload.id = await generatAdminId();
    } else if (payload.role === 'author') {
      payload.id = await generatAuthorId();
    } else {
      payload.id = await generatViewerId();
    }

    // create a user transaction 01
    const result = await User.create(payload);

    return result;
  } catch (error: any) {
    throw new AppError(httpStatus.BAD_REQUEST, `Failed to create User: ${error?.message}`);
  }
};

// create author
const createAuthorToDB = async (password: string, payload: TAuthor) => {
  // create a user object
  const userData: Partial<TUser> = {};

  // if the password empty
  userData.password = password || (config.user_default_password as string);

  // set user role
  userData.role = 'author';
  // email
  userData.email = payload.email;
  // image
  userData.image = payload.image;
  // start session
  const session = await mongoose.startSession();

  try {
    // start session
    session.startTransaction();
    userData.id = await generatAuthorId();

    // create a user transaction 01
    const newUser = await User.create([userData], { session });

    // if created the user successfully then create the viewer
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create author');
    }

    // set viewer user field data
    payload.id = newUser[0].id; // embating id
    payload.user = newUser[0]._id; // reference id
    const newViewer = await Author.create([payload], { session });
    if (!newViewer.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create author');
    }
    await session.commitTransaction();
    await session.endSession();

    return newViewer;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, `Failed to create author: ${error?.message}`);
  }
};

// create Admin
const createAdminToDB = async (password: string, payload: TAdmin) => {
  // create a user object
  const userData: Partial<TUser> = {};

  // if the password empty
  userData.password = password || (config.user_default_password as string);
  // set user role
  userData.role = 'admin';
  // create admin email
  userData.email = payload.email;
  // image
  userData.image = payload.image;
  // start session
  const session = await mongoose.startSession();

  try {
    // start session
    session.startTransaction();

    userData.id = await generatAdminId();
    // create a user transaction 01
    const newUser = await User.create([userData], { session }); // transaction return array
    // if created the user successfully then create the user
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    // set user id in viewer id field
    payload.id = newUser[0].id; // embating id

    // set viewer user field data
    payload.user = newUser[0]._id; // reference id
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (error: unknown) {
    await session.abortTransaction();
    await session.endSession();
    if (error instanceof Error) {
      throw new AppError(httpStatus.BAD_REQUEST, error.message);
    } else {
      throw new AppError(httpStatus.BAD_REQUEST, 'Unknown error occurred');
    }
  }
};

// get me servcies
const getMeFromDB = async (email: string) => {
  const result = await User.findOne({ email });
  return result;
};

// change status
const changeStatus = async (id: string, payload: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

export const UserServices = {
  registerUserToDB,
  createUserToDB,
  createAuthorToDB,
  createAdminToDB,
  getMeFromDB,
  changeStatus,
  getAllUserFromDB,
};
