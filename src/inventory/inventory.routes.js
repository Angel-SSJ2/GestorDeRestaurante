import { Router } from 'express';
import {
  getInventoryItems,
  getInventoryItemById,
  createInventoryItem,
  updateInventoryItem,
  changeInventoryStatus,
} from './inventory.controller.js';

import {
  validateCreateInventory,
  validateUpdateInventoryRequest,
  validateInventoryStatusChange,
  validateGetInventoryById,
} from '../../middlewares/inventory-validators.js';

import { uploadInventoryImage } from '../../middlewares/file-uploader.js';
import { cleanupUploadedFileOnFinish } from '../../middlewares/delete-file-on-error.js';

const router = Router();

router.get('/', getInventoryItems);
router.get('/:id', validateGetInventoryById, getInventoryItemById);

router.post(
  '/',
  uploadInventoryImage.single('image'),
  cleanupUploadedFileOnFinish,
  validateCreateInventory,
  createInventoryItem
);

router.put(
  '/:id',
  uploadInventoryImage.single('image'),
  validateUpdateInventoryRequest,
  updateInventoryItem
);

router.put('/:id/activate', validateInventoryStatusChange, changeInventoryStatus);
router.put('/:id/deactivate', validateInventoryStatusChange, changeInventoryStatus);

export default router;
