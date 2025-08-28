const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  text: {
    type: String,
    required: true // El texto de la tarea es obligatorio
  },
  completed: {
    type: Boolean,
    default: false // Por defecto, una tarea no está completada
  },
  timestamp: {
    type: Date,
    default: Date.now // Guarda la fecha de creación
  }
});

module.exports = mongoose.model('Todo', TodoSchema);