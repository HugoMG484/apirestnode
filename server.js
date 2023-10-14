const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://mongo:27017"
};

app.use(cors(corsOptions));

// Analizar solicitudes con contenido tipo - application/json
app.use(express.json());

// Analizar solicitudes con contenido tipo - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("¡Conectado a la base de datos!");
  })
  .catch(err => {
    console.log("No se puede conectar a la base de datos:", err);
    process.exit();
  });

// Ruta simple
app.get("/", (req, res) => {
  res.json({ message: "API Rest v2." });
});

require("./app/routes/libros.routes")(app);

// Establecer el puerto y escuchar las solicitudes
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`El servidor se está ejecutando en el puerto ${PORT}.`);
});
