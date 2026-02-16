'use strict';

import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
    trim: true,
    maxLength: [100, 'El nombre no puede tener mas de 100 caracteres'],
  },
  eventDate: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  photo: {
    type: String,
    default: 'events/default_event',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

eventSchema.index({ isActive: 1 });
eventSchema.index({ eventName: 1 });
eventSchema.index({ eventName: 1, isActive: 1 });

export default mongoose.model('Event', eventSchema);
