const { response, request } = require("express");
const Usuario = require("../models/users");
const bcryptjs = require("bcryptjs");

const getUsers = async (req = request, res = response) => {

  // Obtener usuario intervalo
  const {limite = 5, desde = 0} = req.query;
  const query = { estado:true}

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query)
    .skip(Number(desde))
    .limit(Number(limite))
  ]);

  res.json({ total, usuarios});
};

const postUsers = async (req, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  // Encriptar pass
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  // Guardar en BD
  await usuario.save();

  res.json({
    msg: 'Usuario añadido',
    usuario,
  });
};

const putUsers = async (req, res = response) => {

  const id = req.params.id;
  const { _id, password, google, correo, ...resto } = req.body;

  // Validar contra base de datos
  if (password) {
    // Encriptar
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.status(201).json({ 
    msg: 'Usuario actualizado',
    usuario });
};

const deleteUsers = async (req, res = response) => {

  const {id} = req.params;

  // Eliminar fisicamente
  // const usuario = await Usuario.findByIdAndDelete(id);
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

  res.json({
    msg: 'Usuario eliminado',
    usuario
  });
};

const patchUsers = (req, res = response) => {
  res.status(201).json({
    msg: "patch API - Controller",
  });
};

module.exports = {
  getUsers,
  putUsers,
  deleteUsers,
  postUsers,
  patchUsers,
};
