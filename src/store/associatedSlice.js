import { createSlice } from '@reduxjs/toolkit';

const associatedSlice = createSlice({
  name: 'associated',
  initialState: {
    associatedCountries: [],
  },
  reducers: {
    setAssociatedCountries(state, action) {
      state.associatedCountries.push(action.payload);
    },
    removeAssociatedCountry(state, action){
      state.associatedCountries = state.associatedCountries.filter((country)=>country.cca3 !== action.payload.cca3)
    }
  },
});

export const { setAssociatedCountries, removeAssociatedCountry } = associatedSlice.actions;
export default associatedSlice.reducer;
