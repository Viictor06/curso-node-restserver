const { Schema, model } = require('mongoose');

const usuariosSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password : {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img : {
        type: String
    },
    rol : {
        type: String,
        required: [true, 'El rol es obligatorio'],
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado : {
        type: Boolean,
        default: true,

    },
    google : {
        type: Boolean,
        default: false
    },
})

usuariosSchema.methods.toJSON = function(){
    const { __v, password, ...user} = this.toObject();
    return user;
}

module.exports = model( 'Usuario', usuariosSchema);