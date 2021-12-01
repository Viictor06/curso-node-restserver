const validaCampos = require("../middlewares/validar-campos");
const validarJWT = require("../middlewares/validar-jwt");
const validaRoles = require("../middlewares/validar-roles");
const googleVerify = require("../middlewares/google-verify");
const generarJWT = require("../middlewares/generarJWT");

module.exports = {
    ...validaCampos,
    ...validarJWT,
    ...validaRoles,
    ...googleVerify,
    ...generarJWT
}