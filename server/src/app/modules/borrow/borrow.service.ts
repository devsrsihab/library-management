import { TBorrowing } from './borrow.interface';
import { Borrowing } from './borrow.model';

// Create a borrowing
const createBorrowing = async (borrowingData: TBorrowing) => {
  const newBorrowing = new Borrowing(borrowingData);
  const savedBorrowing = await newBorrowing.save();
  return savedBorrowing;
};

// Get all borrowings
const getAllBorrowings = async (): Promise<TBorrowing[]> => {
  const result = await Borrowing.find().populate('book').populate('user');
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
