import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
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
import { Provider } from 'react-redux';
import store from './store/store';

import './index.css'; 
import LoginLayout from "./pages/Login/loginLayout.jsx";

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
        element: <Ai />,
      },
      {
        path: '/profile', 
        element: <UserProfile />,
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

// Kiểm tra quyền admin ngay trong main.jsx
function RequireAdmin({ children }) {
  // Lấy state từ Redux store
  const profile = store.getState().user.profile;
  const token = store.getState().auth.token;

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!profile || profile.role !== 'ADMIN') {
    return <Navigate to="/" replace />;
  }

  return children;
}

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);