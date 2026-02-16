'use strict';

import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
<<<<<<< Updated upstream
    name: {
        type: String,
        required: [true, 'El nombre del restaurante es obligatorio'],
        trim: true,
        maxLength: [100, 'El nombre no puede exceder 100 caracteres']
    },
    address: {
        type: String,
        required: [true, 'La dirección es obligatoria'],
        trim: true
    },
    category: {
        type: String,
        required: [true, 'La categoría es obligatoria'],
        enum: {
            values: ['GOURMET', 'CASUAL', 'CAFETERIA', 'CADENA'],
            message: '{VALUE} no es una categoría válida'
        }
    },
    openingHours: {
        type: String, 
        required: [true, 'El horario de atención es requerido']
    },
    phone: {
        type: String,
        required: [true, 'El teléfono de contacto es obligatorio'],
        maxLength: [15, 'El teléfono no puede exceder 15 dígitos']
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    versionKey: false,
    timestamps: true
});

restaurantSchema.index({ category: 1 });
restaurantSchema.index({ status: 1 });

export default mongoose.model('Restaurant', restaurantSchema);
=======
  name: {
    type: String,
    required: true,
    trim: true,
    maxLength: [100, 'El nombre no puede tener mas de 100 caracteres'],
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    maxLength: [500, 'La descripción no puede exceder 500 caracteres'],
  },
  photo: {
    type: String,
    default: 'restaurants/default_restaurant',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

restaurantSchema.index({ isActive: 1 });
restaurantSchema.index({ name: 1 });
restaurantSchema.index({ name: 1, isActive: 1 });

export default mongoose.model('Restaurant', restaurantSchema);
>>>>>>> Stashed changes
