import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import userReducer from './userSlice';
import foodReducer from './food';
import registerReducer from './register';
import favoriteReduce from './favorite';
import dietaryReducer from './dietary';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    food: foodReducer,
    register: registerReducer,
    favorite: favoriteReduce,
    dietary: dietaryReducer,
  },
});

export default store;
