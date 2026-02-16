'use strict';

import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true,
    trim: true,
    maxLength: [100, 'El nombre no puede tener mas de 100 caracteres'],
  },
  total: {
    type: Number,
    required: [true, 'El total es requerido'],
    min: [0, 'El total debe ser mayor o igual a 0'],
  },
  status: {
    type: String,
    enum: {
      values: ['PENDIENTE', 'PREPARANDO', 'ENTREGADO'],
      message: 'Estado no valido',
    },
    default: 'PENDIENTE',
  },
  photo: {
    type: String,
    default: 'orders/default_order',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

orderSchema.index({ isActive: 1 });
orderSchema.index({ clientName: 1 });
orderSchema.index({ clientName: 1, isActive: 1 });

export default mongoose.model('Order', orderSchema);
