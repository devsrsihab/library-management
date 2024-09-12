import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { BorrowBookValidation } from './borrow.validation';
import { BorrowingControllers } from './borrow.controller';

const router = express.Router();

// Create Borrowing (POST)
router.post(
  '/',
  auth(USER_ROLE.viewer),
  validateRequest(BorrowBookValidation.createBorrowvalidationSchema),
  BorrowingControllers.createBorrowing,
);

// Read All borrowed (GET)
router.get(
  '/',
  auth(USER_ROLE.viewer, USER_ROLE.admin, USER_ROLE.author),
  BorrowingControllers.getAllBorrowings,
);


// Read All borrowed for admin (GET)
router.get('/admin', auth(USER_ROLE.author), BorrowingControllers.getAllBorrowingForAdmin);

// Read Single Borrowing (GET)
router.get('/:borrowId', auth(USER_ROLE.viewer), BorrowingControllers.getBorrowingSingle);

// Delete Borrowing (DELETE)
router.delete('/:borrowId', auth(USER_ROLE.viewer), BorrowingControllers.deleteBorrowing);

export const BorrowRoute = router;
