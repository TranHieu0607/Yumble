import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchFoods } from './store/food';
import { fetchUserProfile } from './store/userSlice';
import { fetchUserDietaries } from './store/dietary';
import { fetchFavoriteFoods } from './store/favorite';
import { fetchUserAllergies } from './store/allergy';
import { fetchFoodSuggestions } from './store/food';

import Header from './component/header';
import Footer from './component/footer';


const App = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isAiPage = location.pathname === '/ai';
  const isAdminPage = location.pathname === '/admin';

  useEffect(() => {
    // Fetch initial data when app loads
    dispatch(fetchFoods());
    const userId = localStorage.getItem('userId');
    if (userId) {
      dispatch(fetchUserProfile(userId));
      dispatch(fetchUserDietaries(userId));
      dispatch(fetchFavoriteFoods(userId));
      dispatch(fetchUserAllergies(userId));
      dispatch(fetchFoodSuggestions(userId))
    }
  }, [dispatch]);



  return (
    <div>
      {!isAdminPage && <Header />}
      <main>
        {children}
      </main>
      {!isAiPage && !isAdminPage && <Footer />}
    </div>
  );
};

export default App;
