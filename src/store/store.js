import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import userReducer from './userSlice';
import foodReducer from './food';
import registerReducer from './register';
import favoriteReduce from './favorite';
import dietaryReducer from './dietary';
import allergyReducer from './allergy';
import paymentReducer from './payment';
import aiReducer from './ai';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    food: foodReducer,
    register: registerReducer,
    favorite: favoriteReduce,
    dietary: dietaryReducer,
    allergy: allergyReducer,
    payment: paymentReducer,
    ai: aiReducer,
  },
});

export default store;
