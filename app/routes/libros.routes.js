module.exports = app => {
  const libros = require("../controllers/libros.controller.js");

  var router = require("express").Router();

  // Crear un nuevo Libro
  router.post("/", libros.create);

  // Recuperar todos los Libros
  router.get("/", libros.findAll);

  // Recuperar todos los Libros publicados
  router.get("/publicado", libros.findAllPublished);

  // Recuperar un solo Libro por su ID
  router.get("/:id", libros.findOne);

  // Actualizar un Libro por su ID
  router.put("/:id", libros.update);

  // Eliminar un Libro por su ID
  router.delete("/:id", libros.delete);

  // Eliminar todos los Libros
  router.delete("/", libros.deleteAll);

  app.use("/api/libros", router);
};
