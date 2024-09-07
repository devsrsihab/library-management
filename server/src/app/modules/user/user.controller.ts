import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

// viewer create controller
const createAuthor = catchAsync(async (req, res) => {
  const { password, author: authorData } = req.body;
  const result = await UserServices.createAuthorToDB(password, authorData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Author created successfully',
    data: result,
  });
});

// get all users
const getAllUser = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await UserServices.getAllUserFromDB(query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get All users successfully',
    meta: result.meta,
    data: result.result,
  });
});

// viewer create controller
const createUser = catchAsync(async (req, res) => {
  const userData = req.body;
  const result = await UserServices.createUserToDB(userData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully',
    data: result,
  });
});

// create admin controller
const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: studetnData } = req.body;
  const result = await UserServices.createAdminToDB(password, studetnData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin created successfully',
    data: result,
  });
});

// get me controller
const getMe = catchAsync(async (req, res) => {
  const { email, role } = req.user;
  const result = await UserServices.getMeFromDB(email, role);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get me retived successfully',
    data: result,
  });
});

// change status
const changeStatus = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await UserServices.changeStatus(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Status change successfully',
    data: result,
  });
});

export const UserController = {
  createUser,
  createAuthor,
  createAdmin,
  getMe,
  changeStatus,
  getAllUser,
};
