import { createSlice } from '@reduxjs/toolkit'

const initState = [{
  id: 1,
  text: "Learn React",
  completed: true,
  color: 'green'
}];

const calcID = (todos) => {
  const maxID = todos.reduce((maxID, todo) => Math.max(maxID, todo.id), -1);
  return maxID+1;
}


const todoSlice = createSlice({
  name: 'todos',
  initialState : initState,
  reducers: {
    addNote: (state, action) => {
        state.push({
          id: calcID(state),
          text: action.payload
        });
    },
    deleteNote: (state, action) => {
        return state.filter(note => note.id !== action.payload);
    },
    toggleCompleted: (state, action) => {
      const todo = state.find(todo => todo.id === action.payload);
      todo.completed = !todo.completed;
    },
    changeColor: (state, action) => {
      const todo = state.find(todo => todo.id === action.payload.id);
      todo.color = action.payload.color;
    },
    clearCompleted: (state) => {
      return state.filter(todo => !todo.completed);
    },
    completeAll: (state) => {
      state.forEach(todo => todo.completed = true)
    }
  },
})

export const { addNote, deleteNote, toggleCompleted, changeColor, clearCompleted, completeAll } = todoSlice.actions
export default todoSlice.reducer