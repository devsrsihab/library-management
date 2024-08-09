import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookServices } from './book.service';
import { User } from '../user/user.model';

// Create
const createBook = catchAsync(async (req, res) => {
  const bookData = req.body;
  const userId = req?.user?.userId;
  const user = await User.findOne({ id: userId }, { _id: 1 });
  bookData.createdBy = user?._id;
  const result = await BookServices.createBook(bookData);
  // const result = 'none';
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Book created successfully',
    data: result,
  });
});

// Read All
const getAllBooks = catchAsync(async (req, res) => {
  const result = await BookServices.getAllBooks();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books retrieved successfully',
    data: result,
  });
});

// Read One
const getBookById = catchAsync(async (req, res) => {
  const bookId = req.params.bookId;
  const result = await BookServices.getBookById(bookId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book retrieved successfully',
    data: result,
  });
});

// Update
const updateBook = catchAsync(async (req, res) => {
  const bookId = req.params.bookId;
  const updateData = req.body;
  const result = await BookServices.updateBook(bookId, updateData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book updated successfully',
    data: result,
  });
});

// Delete
const deleteBook = catchAsync(async (req, res) => {
  const bookId = req.params.bookId;
  const result = await BookServices.deleteBook(bookId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book deleted successfully',
    data: result,
  });
});

export const BookControllers = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};
