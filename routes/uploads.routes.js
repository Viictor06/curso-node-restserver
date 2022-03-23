const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos, validarArchivoSubida } = require("../middlewares");
const {loadFile, updateUserImage, mostrarImage} = require("../controllers/uploads");
const { coleccionesPermitidas } = require("../helpers");

const router = Router();

router.get('/:coleccion/:id', [
    check('id', 'No es un id de mongo valida').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios', 'productos'])),
    validarCampos
], mostrarImage);

router.post('/', validarArchivoSubida, loadFile);

router.put('/:coleccion/:id', [
    validarArchivoSubida,
    check('id', 'No es un id de mongo valida').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios', 'productos'])),
    validarCampos
], updateUserImage)


module.exports = router;