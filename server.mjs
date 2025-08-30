import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Importar la utilidad de conexión
import dbConnect from './dbConnect.js';

// Importar el modelo
import Todo from './models/Todo.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// --- Rutas de la API (con la nueva lógica de conexión) ---

app.get('/api/todos', async (req, res) => {
  await dbConnect(); // Asegura la conexión ANTES de la consulta
  const todos = await Todo.find({});
  res.status(200).json(todos);
});

app.post('/api/todos', async (req, res) => {
  await dbConnect(); // Asegura la conexión ANTES de la consulta
  const newTodo = new Todo({ text: req.body.text });
  await newTodo.save();
  res.status(201).json(newTodo);
});

app.put('/api/todos/:id', async (req, res) => {
  await dbConnect(); // Asegura la conexión ANTES de la consulta
  const todo = await Todo.findById(req.params.id);
  todo.completed = !todo.completed;
  await todo.save();
  res.status(200).json(todo);
});

app.delete('/api/todos/:id', async (req, res) => {
  await dbConnect(); // Asegura la conexión ANTES de la consulta
  const result = await Todo.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Tarea eliminada", result });
});

// Servir archivos estáticos de React en producción
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')));
  app.get('/{*any}', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Vercel exporta el manejador 'app'
export default app;