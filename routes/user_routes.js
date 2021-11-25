const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();
const {
  getUsers,
  postUsers,
  deleteUsers,
  putUsers,
  patchUsers,
} = require("../controllers/usersController");
const {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId,
} = require("../database/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");

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
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos
  ],
  deleteUsers
);

router.patch("/", patchUsers);

module.exports = router;
