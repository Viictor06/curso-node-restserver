const { response, request } = require('express');

const getUsers = (req = request, res = response) => {

    const { q, nombre = "no name"} = req.query

    res.json({
      msg: "get API - Controller",
      q,
      nombre
    });
}

const postUsers = (req, res) => {

    const {nombre, edad} = req.body;

    res.status(201).json({
      msg: "post API - Controller",
      nombre,
      edad
    });
}

const putUsers = (req, res) => {

    const id = req.params.id;

    res.status(201).json({
      msg: "put API - Controller",
      id
    });
}

const deleteUsers = (req, res) => {
    res.status(201).json({
      msg: "delete API - Controller",
    });
}

const patchUsers = (req, res) => {
    res.status(201).json({
      msg: "patch API - Controller",
    });
}

module.exports = {
    getUsers,
    putUsers,
    deleteUsers,
    postUsers,
    patchUsers
}