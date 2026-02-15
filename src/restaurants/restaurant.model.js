'use strict';

import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
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