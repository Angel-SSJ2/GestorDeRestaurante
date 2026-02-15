'use strict';

import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
    ingredientName: {
        type: String,
        required: [true, 'El nombre del ingrediente es obligatorio'],
        trim: true
    },
    stock: {
        type: Number,
        required: [true, 'La cantidad en stock es obligatoria'],
        min: [0, 'El stock no puede ser menor a 0']
    },
    unit: {
        type: String,
        required: [true, 'La unidad de medida es obligatoria'],
        enum: {
            values: ['KG', 'LITRO', 'UNIDAD', 'GRAMO'],
            message: 'Unidad {VALUE} no válida'
        }
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: [true, 'El ingrediente debe pertenecer a un restaurante']
    },
    lastRestock: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false,
    timestamps: true
});

// indice para buscar ingredientes por restaurante 
inventorySchema.index({ restaurant: 1, ingredientName: 1 });

export default mongoose.model('Inventory', inventorySchema);