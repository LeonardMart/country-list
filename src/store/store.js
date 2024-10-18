import { configureStore } from '@reduxjs/toolkit';
import countryReducer from './slice';
import associatedReducer from './associatedSlice';

export const store = configureStore({
  reducer: {
    countries: countryReducer,
    associated: associatedReducer
  }
});
