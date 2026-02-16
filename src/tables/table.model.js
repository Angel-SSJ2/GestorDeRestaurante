'use strict';

import mongoose from 'mongoose';

const tableSchema = new mongoose.Schema({
  tableNumber: {
    type: Number,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
    min: [1, 'Capacidad invalida'],
  },
  status: {
    type: String,
    enum: {
      values: ['DISPONIBLE', 'OCUPADA', 'RESERVADA'],
      message: 'Estado no valido',
    },
    default: 'DISPONIBLE',
  },
  photo: {
    type: String,
    default: 'tables/default_table',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

tableSchema.index({ isActive: 1 });
tableSchema.index({ tableNumber: 1 });
tableSchema.index({ tableNumber: 1, isActive: 1 });

export default mongoose.model('Table', tableSchema);
