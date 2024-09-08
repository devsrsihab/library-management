import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AdminValidations } from '../admin/admin.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';
import { UserValidations } from './user.validation';
import { AuthorValidations } from '../author/author.validation';

const router = express.Router();

// create viewer
router.post(
  '/create-user',
  auth(USER_ROLE.admin),
  validateRequest(UserValidations.UserSchemaValidation),
  UserController.createUser,
);

// create viewer
router.post(
  '/create-author',
  auth(USER_ROLE.admin),
  validateRequest(AuthorValidations.createAuthorValidationSchema),
  UserController.createAuthor,
);

// admin create
router.post(
  '/create-admin',
  auth(USER_ROLE.admin),
  validateRequest(AdminValidations.createAdminValidationSchema),
  UserController.createAdmin,
);

// get all users
router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.viewer, USER_ROLE.author),
  UserController.getAllUser,
);
// get me
router.get('/me', auth(USER_ROLE.admin, USER_ROLE.viewer, USER_ROLE.author), UserController.getMe);

// change status
router.patch(
  '/change-status/:id',
  auth(USER_ROLE.admin),
  validateRequest(UserValidations.changeStatusValidationSchema),
  UserController.changeStatus,
);

export const UserRoute = router;
