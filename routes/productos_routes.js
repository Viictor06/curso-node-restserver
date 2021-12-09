const { Router } = require("express");
const { check } = require("express-validator");
const { obtenerProductos, crearProducto, obtenerProductoPorID, actualizarProducto, borrarProducto } = require("../controllers/productosController");
const { existeProductoPorId, existeCategoriaPorId } = require("../database/db-validators");
const { validarJWT, validarCampos, esAdminRole } = require("../middlewares");

const router = Router();

// Obtener Productos
router.get("/", obtenerProductos);


// Obtener Producto por id
router.get("/:id", [
    check('id', 'No es un id de mongo valida').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], obtenerProductoPorID);

// Crear Producto (privado) - usuario con token valido
router.post("/", [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check("categoria", "No es un ID valido").isMongoId(),
    check("categoria").custom(existeCategoriaPorId),
    validarCampos
], crearProducto);

// Actualizar Producto (privado) - usuario con token valido
router.put("/:id", [
    validarJWT,
    // check("categoria", "No es un ID valido").isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], actualizarProducto);

// Actualizar Producto (privado) - administrador
router.delete("/:id", [
    validarJWT,
    esAdminRole,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarCampos
], borrarProducto);

module.exports = router;