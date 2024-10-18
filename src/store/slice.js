// src/store/slice.js
import { createSlice } from '@reduxjs/toolkit';

const countrySlice = createSlice({
  name: 'countries',
  initialState: {
    countries: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    setCountries(state, action) {
      state.countries = action.payload;
      state.status = 'succeeded';
    },
    setLoading(state) {
      state.status = 'loading';
    },
    setError(state, action) {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const { setCountries, setLoading, setError } = countrySlice.actions;
export default countrySlice.reducer;
