import { body, param } from 'express-validator';
import { checkValidators } from './check-validators.js';
 
// Validaciones para crear restaurante
export const validateCreateRestaurant = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('El nombre del restaurante es requerido')
        .isLength({ min: 2, max: 100 })
        .withMessage('El nombre debe tener entre 2 y 100 caracteres'),

    body('address')
        .notEmpty()
        .withMessage('La dirección es requerida')
        .isLength({ min: 5, max: 200 })
        .withMessage('La dirección debe tener entre 5 y 200 caracteres'),

    body('phone')
        .notEmpty()
        .withMessage('El teléfono es requerido')
        .isLength({ min: 8, max: 15 })
        .withMessage('Teléfono no válido'),

    body('email')
        .notEmpty()
        .withMessage('El correo es requerido')
        .isEmail()
        .withMessage('Correo electrónico no válido'),

    body('description')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('La descripción no puede exceder 500 caracteres'),

    checkValidators,
];
 
export const validateUpdateRestaurantRequest = [
    param('id')
        .isMongoId()
        .withMessage('ID debe ser un ObjectId válido de MongoDB'),

    body('name')
        .optional()
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('El nombre debe tener entre 2 y 100 caracteres'),

    body('address')
        .optional()
        .isLength({ min: 5, max: 200 })
        .withMessage('La dirección debe tener entre 5 y 200 caracteres'),

    body('phone')
        .optional()
        .isLength({ min: 8, max: 15 })
        .withMessage('Teléfono no válido'),

    body('email')
        .optional()
        .isEmail()
        .withMessage('Correo electrónico no válido'),

    body('description')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('La descripción no puede exceder 500 caracteres'),

    checkValidators,
];
 
// Validaciones para activar/desactivar restaurante
export const validateRestaurantStatusChange = [
    param('id')
        .isMongoId()
        .withMessage('ID debe ser un ObjectId válido de MongoDB'),
    checkValidators,
];
 
// Validación para obtener restaurante por ID
export const validateGetRestaurantById = [
    param('id')
        .isMongoId()
        .withMessage('ID debe ser un ObjectId válido de MongoDB'),
    checkValidators,
];
