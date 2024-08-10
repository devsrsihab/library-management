import { TBook } from './book.interface';
import { Book } from './book.model';

// Create a book
const createBook = async (bookData: TBook) => {
  const newBook = new Book(bookData);
  const savedBook = await newBook.save();
  return savedBook;
};

// Get all books
const getAllBooks = async (): Promise<TBook[]> => {
  const result = await Book.find().populate('createdBy').populate('category');
  return result;
};

// Get a book by ID
const getSingleBook = async (bookId: string): Promise<TBook | null> => {
  const result = await Book.findById(bookId).populate('createdBy').populate('category');
  return result;
};

// Update a book
const updateBook = async (bookId: string, updateData: Partial<TBook>): Promise<TBook | null> => {
  const updatedBook = await Book.findByIdAndUpdate(bookId, updateData, { new: true });
  return updatedBook;
};

// Delete a book
const deleteBook = async (bookId: string) => {
  const deleteBook = await Book.findByIdAndUpdate(bookId, { isDeleted: true });
  console.log(deleteBook);
  return deleteBook;
};

export const BookServices = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
