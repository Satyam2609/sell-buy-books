import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  newArrivals: []
};

const newArrivalsSlice = createSlice({
  name: 'newArrivals',
  initialState,
  reducers: {
    addNewArrival: (state, action) => {
      state.newArrivals = [action.payload, ...state.newArrivals.slice(0, 11)]; // Keep only latest 12 items
    }
  }
});

export const { addNewArrival } = newArrivalsSlice.actions;
export default newArrivalsSlice.reducer;
