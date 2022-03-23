const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const { getUsers, postUsers, deleteUsers, putUsers} = require("../controllers/usersController");
const { esRoleValido, emailExiste, existeUsuarioPorId } = require("../helpers/db-validators");
const { validarCampos, validarJWT, tieneRole, esAdminRole} = require('../middlewares');


router.get("/", getUsers);

router.put(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    check("rol").custom(esRoleValido),
    validarCampos,
  ],
  putUsers
);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El password debe contener mas de 6 caracteres").isLength(
      { min: 6 }
    ),
    check("correo", "El correo no es valido").isEmail(),
    check("correo").custom(emailExiste),
    check("rol").custom(esRoleValido),
    validarCampos,
  ],
  postUsers
);

router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos
  ],
  deleteUsers
);

module.exports = router;
