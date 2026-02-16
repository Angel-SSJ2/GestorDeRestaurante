import { Router } from 'express';
import {
  getReservations,
  getReservationById,
  createReservation,
  updateReservation,
  changeReservationStatus,
} from './reservation.controller.js';

import {
  validateCreateReservation,
  validateUpdateReservationRequest,
  validateReservationStatusChange,
  validateGetReservationById,
} from '../../middlewares/reservation-validators.js';

import { uploadReservationImage } from '../../middlewares/file-uploader.js';
import { cleanupUploadedFileOnFinish } from '../../middlewares/delete-file-on-error.js';

const router = Router();

router.get('/', getReservations);
router.get('/:id', validateGetReservationById, getReservationById);

router.post(
  '/',
  uploadReservationImage.single('image'),
  cleanupUploadedFileOnFinish,
  validateCreateReservation,
  createReservation
);

router.put(
  '/:id',
  uploadReservationImage.single('image'),
  validateUpdateReservationRequest,
  updateReservation
);

router.put('/:id/activate', validateReservationStatusChange, changeReservationStatus);
router.put('/:id/deactivate', validateReservationStatusChange, changeReservationStatus);

export default router;
