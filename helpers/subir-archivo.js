const path = require('path');
const {v4: uuidv4 } = require('uuid');

const subirArchivo = ( files, extensionesValidas = ["PNG", "jpg", "png"], carpeta = '' ) => {
  return new Promise((resolve, reject) => {

    const { file } = files;

    // Obtener extension
    const nombreCortado = file.name.split(".");
    const extension = nombreCortado[nombreCortado.length - 1];

    // Validar extension
    if (!extensionesValidas.includes(extension)) {
        reject(`Archivos ${extension} no son permitidos`)
    }

    // Agregar identificador y guardar en carpeta
    const nombreTemp = uuidv4() + "." + extension;
    const uploadPath = path.join(__dirname, "../uploads/", carpeta, nombreTemp);

    file.mv(uploadPath, (err) => {
      if (err) {
        reject(err);
      }

      resolve(nombreTemp);
    });
  });
};

module.exports = {
  subirArchivo,
};
