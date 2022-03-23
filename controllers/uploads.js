const path = require("path");
const fs = require("fs");
const { response } = require("express");
const { subirArchivo } = require("../helpers/subir-archivo");
const { Usuario, Producto } = require("../models");

const loadFile = async (req, res = response) => {
  try {
    const nombre = await subirArchivo(req.files, undefined, "imgs");
    res.json({ nombre });
  } catch (msg) {
    res.status(400).json({ msg });
  }
};

const updateUserImage = async (req, res = response) => {
  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res
          .status(400)
          .json({ msg: `No existe usuario con el id ${id}` });
      }
      break;

    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res
          .status(400)
          .json({ msg: `No existe producto con el id ${id}` });
      }
      break;

    default:
      return res.status(500).json({ msg: "Se olvido validar esto" });
  }

  // Limpiar imagenes previas
  try {
    if (modelo.img) {
      // Borrar la imagen del servidor
      const pathImage = path.join(
        __dirname,
        "../uploads",
        coleccion,
        modelo.img
      );
      if (fs.existsSync(pathImage)) {
        fs.unlinkSync(pathImage);
      }
    }
  } catch (msg) {
    res.status(400).json({ msg });
  }

  const nombre = await subirArchivo(req.files, undefined, coleccion);
  modelo.img = nombre;

  await modelo.save();

  res.json(modelo);
};


const mostrarImage = async (req, res = response) => {

  const {id, coleccion} = req.params;
  let modelo;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res
          .status(400)
          .json({ msg: `No existe usuario con el id ${id}` });
      }
      break;

    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res
          .status(400)
          .json({ msg: `No existe producto con el id ${id}` });
      }
      break;

    default:
      return res.status(500).json({ msg: "Se olvido validar esto" });
  }

  // Limpiar imagenes previas
  try {
    if (modelo.img) {
      // Borrar la imagen del servidor
      const pathImage = path.join(
        __dirname,
        "../uploads",
        coleccion,
        modelo.img
      );
      if (fs.existsSync(pathImage)) {
        return res.sendFile(pathImage);
      }
    }
  } catch (msg) {
    res.status(400).json({ msg });
  }

  const pathImage = path.join(
    __dirname,
    "../assets/no-image.jpg",
  );
  res.sendFile(pathImage);
}

module.exports = {
  loadFile,
  updateUserImage,
  mostrarImage
};
