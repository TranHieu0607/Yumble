import React from 'react';
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import App from "./App.jsx";
import Login from "./pages/Login/login.jsx";
import HomePage from "./pages/HomePage/home.jsx";
import About from "./pages/About/about.jsx";
import Premium from "./pages/Premium/premium.jsx";
import Recipe from "./pages/Recipe/recipe.jsx";
import RecipeDetail from "./pages/Recipe/recipedetail.jsx";
import Ai from "./pages/AI/ai.jsx";
import AdminDashboard from "./pages/Admindashboard/adminDashboard.jsx";
import UserProfile from './pages/Profile/user';
import FavoriteFoodPage from "./pages/Favoritefood/favoritefood.jsx";
import { Provider } from 'react-redux';
import store from './store/store';

import './index.css'; 
import LoginLayout from "./pages/Login/loginLayout.jsx";

// Kiểm tra đăng nhập
function RequireAuth({ children }) {
  const token = useSelector(state => state.auth.token);
  const navigate = useNavigate();

  // Kiểm tra token ngay khi component được render
  if (token === undefined) {
    return null; // Hoặc có thể hiển thị một loading spinner
  }

  if (!token) {
    alert("Bạn cần đăng nhập để xem trang này!");
    return <Navigate to="/login" replace />;
  }

  return children;
}

// Kiểm tra quyền admin ngay trong main.jsx
function RequireAdmin({ children }) {
  const token = useSelector(state => state.auth.token);
  const profile = useSelector(state => state.user.profile);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!profile || profile.role !== 'ADMIN') {
    return <Navigate to="/" replace />;
  }

  return children;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App><Outlet /></App>,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "premium",
        element: <Premium />,
      },
      {
        path: "recipe",
        element: <Recipe />,
      },
      {
        path: "recipe/:id",
        element: <RecipeDetail />,
      },
      {
        path: "/ai",
        element: (
          <RequireAuth>
            <Ai />
          </RequireAuth>
        ),
      },
      {
        path: "/profile", 
        element: <UserProfile />,
      },
      {
        path: "/favoriteFood", 
        element: (
          <RequireAuth>
            <FavoriteFoodPage />
          </RequireAuth>
        ),
      },
      {
        path: "admin",
        element: (
          <RequireAdmin>
            <AdminDashboard />
          </RequireAdmin>
        ),
      },
    ],
  },
  {
    path: "login",
    element: <LoginLayout><Login /></LoginLayout>,
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
