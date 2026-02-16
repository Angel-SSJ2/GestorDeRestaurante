import { Router } from 'express';
import {
  getTables,
  getTableById,
  createTable,
  updateTable,
  changeTableStatus,
} from './table.controller.js';

import {
  validateCreateTable,
  validateUpdateTableRequest,
  validateTableStatusChange,
  validateGetTableById,
} from '../../middlewares/table-validators.js';

import { uploadTableImage } from '../../middlewares/file-uploader.js';
import { cleanupUploadedFileOnFinish } from '../../middlewares/delete-file-on-error.js';

const router = Router();

router.get('/', getTables);
router.get('/:id', validateGetTableById, getTableById);

router.post(
  '/',
  uploadTableImage.single('image'),
  cleanupUploadedFileOnFinish,
  validateCreateTable,
  createTable
);

router.put(
  '/:id',
  uploadTableImage.single('image'),
  validateUpdateTableRequest,
  updateTable
);

router.put('/:id/activate', validateTableStatusChange, changeTableStatus);
router.put('/:id/deactivate', validateTableStatusChange, changeTableStatus);

export default router;
