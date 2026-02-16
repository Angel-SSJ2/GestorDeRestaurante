import { Router } from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  changeUserStatus,
} from './user.controller.js';

import {
  validateCreateUser,
  validateUpdateUserRequest,
  validateUserStatusChange,
  validateGetUserById,
} from '../../middlewares/user-validators.js';

import { uploadUserImage } from '../../middlewares/file-uploader.js';
import { cleanupUploadedFileOnFinish } from '../../middlewares/delete-file-on-error.js';

const router = Router();

router.get('/', getUsers);
router.get('/:id', validateGetUserById, getUserById);

router.post(
  '/',
  uploadUserImage.single('image'),
  cleanupUploadedFileOnFinish,
  validateCreateUser,
  createUser
);

router.put(
  '/:id',
  uploadUserImage.single('image'),
  validateUpdateUserRequest,
  updateUser
);

router.put('/:id/activate', validateUserStatusChange, changeUserStatus);
router.put('/:id/deactivate', validateUserStatusChange, changeUserStatus);

export default router;
