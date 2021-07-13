const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentSchema = new Schema({
  zona: String,
  distrito: String,
  amie: String,
  institucion: String,
  sostenimiento: String,
  especialidad: String,
  grado: String,
  cedula: String,
  nombres: String
});

module.exports = mongoose.model('Student', studentSchema);