'use strict';

import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxLength: [100, 'El nombre no puede tener mas de 100 caracteres'],
  },
  price: {
    type: Number,
    required: [true, 'El precio es requerido'],
    min: [0, 'El precio debe ser mayor o igual a 0'],
  },
  category: {
    type: String,
    required: true,
    enum: {
      values: ['ENTRADA', 'PLATO_PRINCIPAL', 'BEBIDA', 'POSTRE'],
      message: 'Categoria no valida',
    },
  },
  description: {
    type: String,
    trim: true,
    maxLength: [500, 'La descripción no puede exceder 500 caracteres'],
  },
  photo: {
    type: String,
    default: 'menus/default_menu',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

menuSchema.index({ isActive: 1 });
menuSchema.index({ name: 1 });
menuSchema.index({ name: 1, isActive: 1 });

export default mongoose.model('Menu', menuSchema);
