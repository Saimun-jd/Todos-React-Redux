import {  createSlice } from '@reduxjs/toolkit'
import { fetchTodos, addNewNote, deleteTodo, toggleCompleted, clearCompleted, changeColor, completeAll } from './thunks';

const initState = {
  entities: [],
  status: 'idle',
  error: null
};

const todoSlice = createSlice({
  name: 'todos',
  initialState : initState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state, action) => {
      state.status = 'pending';
      state.error = null;
    })

    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.status = 'success';
      state.entities = action.payload;
      state.error = null;
    })

    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.status = 'failed';
      state.entities = [];
      state.error = action.payload.messagel;
    })
    builder.addCase(addNewNote.fulfilled, (state, action) => {
      state.error = null;
      state.entities = state.entities.concat(action.payload);
    })
    builder.addCase(addNewNote.rejected, (state, action) => {
      state.error = action.payload;
    })
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      console.log(action.payload)
      state.entities = state.entities.filter(note => note.id !== action.payload);
    })
    builder.addCase(toggleCompleted.fulfilled, (state, action) => {
      const {id} = action.payload;
      const todo = state.entities.find(todo => todo.id === id);
      todo.completed = !todo.completed;
    })
    builder.addCase(clearCompleted.fulfilled, (state, action) => {
      state.entities = state.entities.filter(todo => !todo.completed);
    })
    builder.addCase(changeColor.fulfilled, (state, action) => {
      const {id, color} = action.payload;
      const todo = state.entities.find(todo => todo.id === id);
      todo.color = color;
    })
    builder.addCase(completeAll.fulfilled, (state, action) => {
      state.entities.forEach(todo => todo.completed = true);
    })
  }
})

// export const { completeAll } = todoSlice.actions
export default todoSlice.reducer