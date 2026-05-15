import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Login from './pages/Login.tsx';
import Employess from './pages/Employess.tsx';
import Attendance from './pages/Attendance.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children : [
      {
        index: true,
        Component: Login
      },
      {
        path: "login",
        Component: Login
      },
      {
        path: "employess",
        Component: Employess
      },
      {
        path: "attendance",
        Component: Attendance
      }
    ]
  },
],{
  basename:import.meta.env.VITE_BASE_PATH
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
