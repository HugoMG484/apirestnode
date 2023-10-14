const db = require("../models");
const Libro = db.libros;

// Crear y guardar un nuevo Libro
exports.create = (req, res) => {
  // Validar la solicitud
  if (!req.body.titulo) {
    res.status(400).send({ message: "¡El contenido no puede estar vacío!" });
    return;
  }

  // Crear un Libro
  const libro = new Libro({
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    publicado: req.body.publicado ? req.body.publicado : true
  });

  // Guardar el Libro en la base de datos
  libro
    .save(libro)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Se produjo un error al crear el Libro."
      });
    });
};

// Recuperar todos los Libros de la base de datos.
exports.findAll = (req, res) => {
  const titulo = req.query.titulo;
  var condition = titulo ? { titulo: { $regex: new RegExp(titulo), $options: "i" } } : {};

  Libro.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Se produjo un error al recuperar los libros."
      });
    });
};

// Encontrar un solo Libro por su ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  Libro.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "No se encontró un Libro con ID " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error al recuperar el Libro con ID=" + id });
    });
};

// Actualizar un Libro por su ID en la solicitud
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "¡Los datos a actualizar no pueden estar vacíos!"
    });
  }

  const id = req.params.id;

  Libro.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `No se puede actualizar el Libro con ID=${id}. ¡Tal vez no se encontró el Libro!`
        });
      } else res.send({ message: "El Libro se actualizó exitosamente." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al actualizar el Libro con ID=" + id
      });
    });
};

// Eliminar un Libro con el ID especificado en la solicitud
exports.delete = (req, res) => {
  const id = req.params.id;

  Libro.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `No se puede eliminar el Libro con ID=${id}. ¡Tal vez no se encontró el Libro!`
        });
      } else {
        res.send({
          message: "¡El Libro se eliminó exitosamente!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se pudo eliminar el Libro con ID=" + id
      });
    });
};

// Eliminar todos los Libros de la base de datos.
exports.deleteAll = (req, res) => {
  Libro.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Libros se eliminaron exitosamente!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Se produjo un error al eliminar todos los libros."
      });
    });
};

// Encontrar todos los Libros publicados
exports.findAllPublished = (req, res) => {
  Libro.find({ publicado: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Se produjo un error al recuperar los libros."
      });
    });
};
