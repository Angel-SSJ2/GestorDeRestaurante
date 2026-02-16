import { Router } from 'express';
import {
  getRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  changeRestaurantStatus,
} from './restaurant.controller.js';

import {
  validateCreateRestaurant,
  validateUpdateRestaurantRequest,
  validateRestaurantStatusChange,
  validateGetRestaurantById,
} from '../../middlewares/restaurant-validators.js';

import { uploadRestaurantImage } from '../../middlewares/file-uploader.js';
import { cleanupUploadedFileOnFinish } from '../../middlewares/delete-file-on-error.js';

const router = Router();

router.get('/', getRestaurants);
router.get('/:id', validateGetRestaurantById, getRestaurantById);

router.post(
  '/',
  uploadRestaurantImage.single('image'),
  cleanupUploadedFileOnFinish,
  validateCreateRestaurant,
  createRestaurant
);

router.put(
  '/:id',
  uploadRestaurantImage.single('image'),
  validateUpdateRestaurantRequest,
  updateRestaurant
);

router.put('/:id/activate', validateRestaurantStatusChange, changeRestaurantStatus);
router.put('/:id/deactivate', validateRestaurantStatusChange, changeRestaurantStatus);

export default router;
