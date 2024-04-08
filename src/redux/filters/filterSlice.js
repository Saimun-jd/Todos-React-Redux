import { createSlice } from '@reduxjs/toolkit'

const initState = {
    status: "all",
    colors: []
};


const filterSlice = createSlice({
  name: 'filter',
  initialState : initState,
  reducers: {
    filterByColor: (state, action) => {
        let { color, type } = action.payload;
        const { colors } = state;
        switch (type) {
          case 'ADD': {
            if (!colors.includes(color)) {
              colors.push(color)
            }
            break
          }
          case 'REMOVE': {
            state.colors = colors.filter(
              (existingColor) => existingColor !== color
            )
          }
          // eslint-disable-next-line no-fallthrough
          default:
            return;
        }
    },
    filterByStatus: (state, action) => {
        state.status = action.payload;
    }
  },
})

export const { filterByColor, filterByStatus } = filterSlice.actions
export default filterSlice.reducer