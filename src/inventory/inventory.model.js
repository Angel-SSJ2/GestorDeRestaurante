'use strict';

import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
<<<<<<< Updated upstream
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
=======
  productName: {
    type: String,
    required: true,
    trim: true,
    maxLength: [100, 'El nombre no puede tener mas de 100 caracteres'],
  },
  quantity: {
    type: Number,
    required: [true, 'La cantidad es requerida'],
    min: [0, 'La cantidad debe ser mayor o igual a 0'],
  },
  unit: {
    type: String,
    required: true,
    enum: {
      values: ['UNIDAD', 'KG', 'LITRO'],
      message: 'Unidad no valida',
    },
  },
  photo: {
    type: String,
    default: 'inventory/default_item',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

inventorySchema.index({ isActive: 1 });
inventorySchema.index({ productName: 1 });
inventorySchema.index({ productName: 1, isActive: 1 });

export default mongoose.model('Inventory', inventorySchema);
>>>>>>> Stashed changes
