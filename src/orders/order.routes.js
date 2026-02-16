import { Router } from 'express';
import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  changeOrderStatus,
} from './order.controller.js';

import {
  validateCreateOrder,
  validateUpdateOrderRequest,
  validateOrderStatusChange,
  validateGetOrderById,
} from '../../middlewares/order-validators.js';

import { uploadOrderImage } from '../../middlewares/file-uploader.js';
import { cleanupUploadedFileOnFinish } from '../../middlewares/delete-file-on-error.js';

const router = Router();

router.get('/', getOrders);
router.get('/:id', validateGetOrderById, getOrderById);

router.post(
  '/',
  uploadOrderImage.single('image'),
  cleanupUploadedFileOnFinish,
  validateCreateOrder,
  createOrder
);

router.put(
  '/:id',
  uploadOrderImage.single('image'),
  validateUpdateOrderRequest,
  updateOrder
);

router.put('/:id/activate', validateOrderStatusChange, changeOrderStatus);
router.put('/:id/deactivate', validateOrderStatusChange, changeOrderStatus);

export default router;
