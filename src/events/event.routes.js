import { Router } from 'express';
import {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  changeEventStatus,
} from './event.controller.js';

import {
  validateCreateEvent,
  validateUpdateEventRequest,
  validateEventStatusChange,
  validateGetEventById,
} from '../../middlewares/event-validators.js';

import { uploadEventImage } from '../../middlewares/file-uploader.js';
import { cleanupUploadedFileOnFinish } from '../../middlewares/delete-file-on-error.js';

const router = Router();

router.get('/', getEvents);
router.get('/:id', validateGetEventById, getEventById);

router.post(
  '/',
  uploadEventImage.single('image'),
  cleanupUploadedFileOnFinish,
  validateCreateEvent,
  createEvent
);

router.put(
  '/:id',
  uploadEventImage.single('image'),
  validateUpdateEventRequest,
  updateEvent
);

router.put('/:id/activate', validateEventStatusChange, changeEventStatus);
router.put('/:id/deactivate', validateEventStatusChange, changeEventStatus);

export default router;
