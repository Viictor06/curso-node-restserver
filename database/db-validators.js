const Role = require('../models/role');
const { Usuario, Categoria, Producto } = require('../models');

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

// Categoria existente
const existeCategoriaPorId = async (id) => {

    const existeCategoria = await Categoria.findById(id);

    if(!existeCategoria){
        throw new Error(`Esta categoria no existe`)
    }
}

// Producto existente
const existeProductoPorId = async (id) => {

    const existeProducto = await Producto.findById(id);

    if(!existeProducto){
        throw new Error(`Esta producto no existe`)
    }
}

module.exports = {
    existeUsuarioPorId,
    esRoleValido,
    emailExiste,
    existeCategoriaPorId,
    existeProductoPorId
}