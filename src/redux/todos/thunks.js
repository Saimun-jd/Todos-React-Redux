import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos", async () => {
    const response = await axios.get('http://localhost:9000/todos');
    return response?.data;
  }
);

export const addNewNote = createAsyncThunk(
  'todos/addNewTodo',
  async (newTodo) => {
    const response = await axios.post('http://localhost:9000/todos', newTodo);
    return response.data;
  }
)

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
  const response = await axios.delete(`http://localhost:9000/todos/${id}`);
  return response.data.id;
})

export const toggleCompleted = createAsyncThunk('todos/toggleCompleted', async (initTodo) => {
  const newTodo = {id: initTodo.id, text: initTodo.text, completed: !initTodo.completed, color: initTodo.color}
  const response = await axios.put(`http://localhost:9000/todos/${initTodo.id}`, newTodo);
  return response.data;
})

export const clearCompleted = createAsyncThunk('todos/clearCompleted', async (arg, {getState}) => {
  const todos = getState().todos.entities;
  await Promise.all(todos.map(async todo => {
    if(todo.completed) {
      await axios.delete(`http://localhost:9000/todos/${todo.id}`)
    }
  }))
})

export const changeColor = createAsyncThunk('todos/changeColor', async (newTodo) => {
  const {id} = newTodo;
  const response = await axios.put(`http://localhost:9000/todos/${id}`, newTodo)
  return response.data;
}) 

export const completeAll = createAsyncThunk('todos/completeAll', async (arg, {getState}) => {
  const todos = getState().todos.entities;
  todos.forEach(async (todo) => {
    await axios.put(`http://localhost:9000/todos/${todo.id}`, {...todo, completed: true})
  });
})