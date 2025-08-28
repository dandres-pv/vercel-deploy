const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Este es el "plano" de cada tarea
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

// Exportamos el modelo para poder usarlo en otras partes de la app
module.exports = mongoose.model('Todo', TodoSchema);