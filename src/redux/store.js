import { configureStore } from '@reduxjs/toolkit'
import todosReducer from './todos/todoSlice';
import filterReducer from './filters/filterSlice';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    filters: filterReducer
  },
})