'use strict';

import mongoose from 'mongoose';

const billingSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true,
    trim: true,
    maxLength: [100, 'El nombre no puede tener mas de 100 caracteres'],
  },
  amount: {
    type: Number,
    required: [true, 'El monto es requerido'],
    min: [0, 'El monto debe ser mayor o igual a 0'],
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: {
      values: ['EFECTIVO', 'TARJETA', 'TRANSFERENCIA'],
      message: 'Metodo de pago no valido',
    },
  },
  photo: {
    type: String,
    default: 'billing/default_billing',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

billingSchema.index({ isActive: 1 });
billingSchema.index({ clientName: 1 });
billingSchema.index({ clientName: 1, isActive: 1 });

export default mongoose.model('Billing', billingSchema);
