const { response} = require ('express');
const Usuario = require ('../models/users');
const bcryptjs = require('bcryptjs');
const { googleVerify, generarJWT } = require('../helpers');
const { DefaultTransporter } = require('google-auth-library');

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


const googleSignIn = async (req, res = response) => {

    const { id_token } = req.body;

    try {

        const {nombre, img, correo } = await googleVerify( id_token );
        
        let usuario = await Usuario.findOne( {correo});

        if(!usuario){
            const data = {
                nombre,
                correo,
                rol: DefaultTransporter,
                password: ':P',
                img,
                google: true
            };

            usuario = new Usuario(data);
            await usuario.save();
        }

        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Hable con el admin, usuario bloqueado'
            });
        }

        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        });
        
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        })
    }

}

module.exports = {
    login,
    googleSignIn
}