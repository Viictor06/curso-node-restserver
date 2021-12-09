const { Router } = require("express");
const { check } = require("express-validator");
const { obtenerCategorias, crearCategoria, obtenerCategoriaPorID, actualizarCategoria, borrarCategoria } = require("../controllers/categoriasController");
const { existeCategoriaPorId } = require("../database/db-validators");
const { validarJWT, validarCampos, esAdminRole } = require("../middlewares");

const router = Router();

// Obtener categorias
router.get("/", obtenerCategorias);


// Obtener categoria por id
router.get("/:id", [
    check('id', 'No es un id de mongo valida').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], obtenerCategoriaPorID);

// Crear categoria (privado) - usuario con token valido
router.post("/", [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

// Actualizar categoria (privado) - usuario con token valido
router.put("/:id", [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
], actualizarCategoria);

// Actualizar categoria (privado) - administrador
router.delete("/:id", [
    validarJWT,
    esAdminRole,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    validarCampos
], borrarCategoria);

module.exports = router;