/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { TBorrowing } from './borrow.interface';
import { Borrowing } from './borrow.model';
import AppError from '../../errors/appError';
import { Book } from '../book/book.model';
import mongoose from 'mongoose';

// Create a borrowing
const createBorrowing = async (borrowingData: TBorrowing) => {
  // Check for an existing borrowing record
  const existingBorrowing = await Borrowing.findOne({
    user: borrowingData.user,
    book: borrowingData.book,
    isDeleted: false,
  });

  if (existingBorrowing) {
    throw new AppError(httpStatus.CONFLICT, 'This book is already borrowed');
  }

  // Start session
  const session = await mongoose.startSession();
  try {
    // Start transaction
    session.startTransaction();

    // Proceed to create a new borrowing record if no duplicates
    const [savedBorrowing] = await Borrowing.create([borrowingData], { session });

    // Reduce the quantity of the book by 1
    await Book.findByIdAndUpdate(
      borrowingData.book,
      { $inc: { quantity: -1 } }, // Decrease quantity by 1
      { new: true, session }, // Return the updated document and include session in the update
    );

    // Commit the transaction
    await session.commitTransaction();

    return savedBorrowing;
  } catch (error: any) {
    // Abort the transaction in case of an error
    await session.abortTransaction();
    throw new AppError(httpStatus.BAD_REQUEST, `Failed to create borrowing: ${error?.message}`);
  } finally {
    // End the session
    session.endSession();
  }
};


// Get all borrowings
const getAllBorrowings = async (userId:string): Promise<TBorrowing[]> => {
  const result = await Borrowing.find({ user: userId }).populate('book').populate('user');
  return result;
};

// Get a borrowing by ID
const getSingleBorrowingFromDB = async (borrowId: string): Promise<TBorrowing | null> => {
  const result = await Borrowing.findById(borrowId).populate('book').populate('user');
  return result;
};

// Update a borrowing
const updateBorrowing = async (
  borrowingId: string,
  updateData: Partial<TBorrowing>,
): Promise<TBorrowing | null> => {
  const updatedBorrowing = await Borrowing.findByIdAndUpdate(borrowingId, updateData, {
    new: true,
  });
  return updatedBorrowing;
};

// Delete a borrowing
const deleteBorrowing = async (borrowingId: string) => {
  const deleteBorrowing = await Borrowing.findByIdAndUpdate(borrowingId, { isDeleted: true });
  return deleteBorrowing;
};

export const BorrowingServices = {
  createBorrowing,
  getAllBorrowings,
  getSingleBorrowingFromDB,
  updateBorrowing,
  deleteBorrowing,
};
