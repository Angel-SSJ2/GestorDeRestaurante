'use strict';

import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true,
    trim: true,
    maxLength: [100, 'El nombre no puede tener mas de 100 caracteres'],
  },
  date: {
    type: Date,
    required: [true, 'La fecha es requerida'],
  },
  people: {
    type: Number,
    required: [true, 'La cantidad de personas es requerida'],
    min: [1, 'Cantidad invalida'],
  },
  photo: {
    type: String,
    default: 'reservations/default_reservation',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

reservationSchema.index({ isActive: 1 });
reservationSchema.index({ clientName: 1 });
reservationSchema.index({ clientName: 1, isActive: 1 });

export default mongoose.model('Reservation', reservationSchema);
