const { response } = require ('express');
const Usuario = require ('../models/users');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../middlewares/generarJWT');

const login = async (req, res = response) => {

    const { correo, password } = req.body;

    try{

        // Verificar si email existe
        const usuario = await Usuario.findOne({ correo });
        if(!usuario){
            return res.status(400).json({
                msg: 'Usuario o contraseña incorrecta'
            });
        }

        // Si el usuario esta activo
        if(!usuario.estado){
            return res.status(400).json({
                msg: 'Usuario o contraseña incorrecta - estado: false'
            })
        }

        // Verificar contraseña
        const validPass = bcryptjs.compareSync(password, usuario.password);
        if(!validPass){
            return res.status(400).json({
                msg: 'Usuario o contraseña incorrecta - password'
            })
        }


        // Generar JWT
        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
    
}

module.exports = {
    login
}