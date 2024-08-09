import express from 'express';
import { BookValidation } from './book.validation'; // Assuming BookValidation exists with validation schemas
import validateRequest from '../../middlewares/validateRequest';
import { BookControllers } from './book.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

// Create Book (POST)
router.post(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.author),
  validateRequest(BookValidation.createBookValidationSchema),
  BookControllers.createBook,
);

// Read All Books (GET)
router.get('/', BookControllers.getAllBooks);

// Read Single Book (GET)
router.get('/:bookId', BookControllers.getBookById);

// Update Book (PUT)
router.put(
  '/:bookId',
  auth(USER_ROLE.admin, USER_ROLE.author),
  validateRequest(BookValidation.updateBookValidationSchema),
  BookControllers.updateBook,
);

// Delete Book (DELETE)
router.delete('/:bookId', auth(USER_ROLE.admin, USER_ROLE.author), BookControllers.deleteBook);

export const BookRoute = router;
