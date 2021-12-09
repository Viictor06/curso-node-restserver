require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config')

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            usersPath: '/api/users',
            authPath: '/api/auth',
            categoriasPath: '/api/categorias',
            productosPath: '/api/productos',
            buscarPath: '/api/buscar'
        }

        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){

        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio publico
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.paths.authPath, require('../routes/auth_route'));
        this.app.use(this.paths.usersPath, require('../routes/user_routes'));
        this.app.use(this.paths.categoriasPath, require('../routes/categorias_routes'));
        this.app.use(this.paths.productosPath, require('../routes/productos_routes'));
        this.app.use(this.paths.buscarPath, require('../routes/buscar_route'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Server running at port', this.port);
        });
    }
}

module.exports = Server;