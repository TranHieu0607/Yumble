import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import App from "./App.jsx";
import Login from "./pages/Login/login.jsx";
import HomePage from "./pages/HomePage/home.jsx";
import About from "./pages/About/about.jsx";
import Search from "./pages/Search/search.jsx";
import Premium from "./pages/Premium/premium.jsx";
import Recipe from "./pages/Recipe/recipe.jsx";
import RecipeDetail from "./pages/Recipe/recipedetail.jsx";
import Ai from "./pages/AI/ai.jsx";
import AdminDashboard from "./pages/Admindashboard/adminDashboard.jsx";


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
        path: "search",
        element: <Search />,
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
        path: "recipedetail",
        element: <RecipeDetail />,
      },
      {
        path: "/ai",
        element: <Ai />,
      },
      {
        path: "admin",
        element: <AdminDashboard />,
      },
    ],
  },
  {
    path: "login",
    element: <LoginLayout><Login /></LoginLayout>,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);