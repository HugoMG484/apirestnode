// Importa la configuración de la base de datos desde el archivo "db.config.js"
const dbConfig = require("../config/db.config.js");

// Importa el módulo "mongoose" para trabajar con MongoDB en Node.js
const mongoose = require("mongoose");

// Establece la promesa de mongoose para utilizar la promesa global de Node.js
mongoose.Promise = global.Promise;

// Crea un objeto "db" para almacenar propiedades relacionadas con la base de datos
const db = {};

// Almacena la instancia de mongoose para su uso posterior en la aplicación
db.mongoose = mongoose;

// Almacena la URL de conexión a la base de datos obtenida de la configuración
db.url = dbConfig.url;

// Esto permite que el modelo de libros utilice la instancia de mongoose para definir y trabajar con los datos en la base de datos.
db.libros = require("./libros.model.js")(mongoose);

// Exporta el objeto "db" para que esté disponible para otros módulos de la aplicación.
module.exports = db;
