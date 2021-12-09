const { response } = require("express");
const { Producto } = require("../models");

// Obtener productos
const obtenerProductos = async (req, res = response) => {
  // Obtener usuario intervalo
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  const [total, productos] = await Promise.all([
    Producto.countDocuments(query),
    Producto.find(query).populate('usuario', 'nombre').populate('categoria', 'nombre').skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({ total, productos });
};

// Obtener Producto por ID
const obtenerProductoPorID = async (req, res = response) => {
    
    const {id} = req.params;
    const producto = await Producto.findById(id).populate('usuario', 'nombre').populate('categoria', 'nombre');

    res.json(producto);
};

// Crear Producto
const crearProducto = async (req, res = response) => {

  const {estado, usuario, ...body} = req.body

  const productoDB = await Producto.findOne({ nombre: body.nombre });

  if (productoDB) {
    return res.status(400).json({
      msg: `El producto ${productoDB.nombre}, ya existe`,
    });
  }

  // Generar la data a guardar
  const data = {
    ...body,
    nombre: body.nombre.toUpperCase(),
    usuario: req.usuario._id
  };

  const producto = new Producto(data);

  await producto.save();

  res.status(201).json(producto);
};

// Actualizar Producto
const actualizarProducto = async (req, res = response) => {

    const id = req.params.id;
    const { estado, usuario, ...data } = req.body;
    
    if(data.nombre){
        data.nombre = data.nombre.toUpperCase();
    }
    data.usuario = req.usuario._id;
  
    const producto = await Producto.findByIdAndUpdate(id, data, { new: true});
  
    res.status(201).json({ 
      msg: 'Producto actualizada',
      producto });
};

// Borrar Producto
const borrarProducto = async (req, res = response) => {

    const {id} = req.params;

    const producto = await Producto.findByIdAndUpdate(id, { estado: false }, {new : true});
    // const usuarioAutenticado = req.usuario;
  
    res.json({
      msg: 'Producto eliminado',
      producto
    });
}

module.exports = {
    obtenerProductoPorID,
    obtenerProductos,
    crearProducto,
    actualizarProducto,
    borrarProducto
};
