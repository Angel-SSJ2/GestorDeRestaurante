<<<<<<< Updated upstream
'use stirct'
=======
'use strict';
>>>>>>> Stashed changes

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
<<<<<<< Updated upstream

    name:{
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true,
        maxLength: [50, 'El nombre no puede exeder los 50 caracteres']
    },

    surname: {
        type: String,
        required: [true, 'El apellido es obligatorio'],
        trim: true,
        maxLength: [50, 'El apellido no puede exceder los 50 caracteres']
    },

    username: {
        type: String,
        required: [true, 'El nombre de usuario es obligatorio'],
        unique: true,
        trim: true,
        lowercase: true,
        maxLength: [20, 'El nombre de usuario no puede exceder los 20 caracteres']
    },
    
    email: {
        type: String,
        required: [true, 'El correo electrónico es obligatorio'],
        unique: true,
        trim: true,
        lowercase: true,
        // Validación básica de formato de email
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Por favor, ingrese un correo válido']
    },

    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        minLength: [8, 'La contraseña debe tener al menos 8 caracteres']
    },

    role: {
        type: String,
        required: [true, 'El rol es obligatorio'],
        uppercase: true,
        enum: {
            values: ['ADMIN_ROLE', 'CHEF_ROLE', 'MESERO_ROLE', 'CLIENTE_ROLE'],
            message: 'El rol {VALUE} no es válido'
        },
        default: 'CLIENTE_ROLE'
    },

    phone: {
        type: String,
        required: [true, 'El número de teléfono es obligatorio'],
        minLength: [8, 'El teléfono debe tener al menos 8 dígitos'],
    },

    status:{
        type:Boolean,
        default:true

    }
},{
    // Añade automáticamente createdAt y updatedAt
    timestamps: true

});

// Índices para optimizar las búsquedas 
userSchema.index({ status: 1 });
userSchema.index({ username: 1 });
userSchema.index({ email: 1 });
userSchema.index({ role: 1, status: 1 });

// Método para omitir la contraseña cuando se convierte a JSON
userSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id; 
    return user;
};

export default mongoose.model('User', userSchema);


=======
  name: {
    type: String,
    required: true,
    trim: true,
    maxLength: [100, 'El nombre no puede tener mas de 100 caracteres'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: {
      values: ['ADMIN', 'CLIENT'],
      message: 'Rol no valido',
    },
  },
  photo: {
    type: String,
    default: 'users/default_user',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

userSchema.index({ isActive: 1 });
userSchema.index({ email: 1 });
userSchema.index({ email: 1, isActive: 1 });

export default mongoose.model('User', userSchema);
>>>>>>> Stashed changes
