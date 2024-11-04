import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import App from "./App.jsx";
import Login from "./pages/Login/login.jsx";
import HomePage from "./pages/HomePage/home.jsx";

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