// Exporta el modelo de libro utilizando la instancia de mongoose
module.exports = mongoose => {
  // Define el esquema del libro con los campos: titulo, descripcion y publicado
  var schema = mongoose.Schema(
    {
      titulo: String,
      descripcion: String,
      publicado: Boolean
    },
    // Configura opciones del esquema, incluyendo timestamps para el registro de fechas de creación y actualización
    { timestamps: true }
  );

  // Define un método "toJSON" en el esquema para personalizar la representación JSON de los objetos Libro
  schema.method("toJSON", function() {
    // Desestructura el objeto "this.toObject()" para eliminar __v y _id, y asigna el _id como "id"
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  // Crea el modelo "Libro" utilizando el esquema definido
  const Libro = mongoose.model("libro", schema);
  return Libro;
};
