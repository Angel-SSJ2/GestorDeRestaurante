import { Router } from 'express';
import {
  getBillings,
  getBillingById,
  createBilling,
  updateBilling,
  changeBillingStatus,
} from './billing.controller.js';

import {
  validateCreateBilling,
  validateUpdateBillingRequest,
  validateBillingStatusChange,
  validateGetBillingById,
} from '../../middlewares/billing-validators.js';

import { uploadBillingImage } from '../../middlewares/file-uploader.js';
import { cleanupUploadedFileOnFinish } from '../../middlewares/delete-file-on-error.js';

const router = Router();

router.get('/', getBillings);
router.get('/:id', validateGetBillingById, getBillingById);

router.post(
  '/',
  uploadBillingImage.single('image'),
  cleanupUploadedFileOnFinish,
  validateCreateBilling,
  createBilling
);

router.put(
  '/:id',
  uploadBillingImage.single('image'),
  validateUpdateBillingRequest,
  updateBilling
);

router.put('/:id/activate', validateBillingStatusChange, changeBillingStatus);
router.put('/:id/deactivate', validateBillingStatusChange, changeBillingStatus);

export default router;
