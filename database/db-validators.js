const Usuario = require('../models/users');
const Role = require('../models/role');

// Validar rol
const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no esta registrado en la BD`)
    }
}

// Verificar correo duplicado
const emailExiste = async (correo = '') => {

    const existsEmail = await Usuario.findOne({correo});

    if(existsEmail){
        throw new Error(`Este correo ya existe`)
    }
}

// Usuario existente
const existeUsuarioPorId = async (id) => {

    const existeUsuario = await Usuario.findById(id);

    if(!existeUsuario){
        throw new Error(`Este usuario no existe`)
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}