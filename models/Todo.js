import mongoose from 'mongoose';
const { Schema } = mongoose;

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

// Usamos la sintaxis 'export default' de ES Modules
export default mongoose.models.Todo || mongoose.model('Todo', TodoSchema);