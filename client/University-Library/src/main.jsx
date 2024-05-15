import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import Navbar from "./components/Navbar.jsx";
import './index.css';
import SignupPage from "./pages/Signup.jsx";
import LoginPage from "./pages/Login.jsx";
import Books from "./pages/Books.jsx";
<<<<<<< HEAD
import Settings from "./pages/Settings.jsx";
=======
import Events from "./pages/Events.jsx";
import Faq from "./pages/Faq.jsx";
import AboutUs from "./pages/AboutUs.jsx";
>>>>>>> 08a422171fa66327f0fa3a41c8187f8af1bc3300
import { AuthProvider } from "../../AuthContext.jsx";
import Mybooks from "./pages/Mybooks.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        path: "/",
        element: <Homepage />
      },
      {
        path: "/books",
        element: <Books />
      },
      {
        path: "/events",
        element: <Events /> 
      },
      {
        path: "/faq",
        element: <Faq /> 
      },
      {
        path: "/aboutus",
        element: <AboutUs /> 
      },
      {
        path: "/mybooks",
        element: <Mybooks />
      },
      {
        path: "/settings",
        element: <Settings/>
      }
      
    ]
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/signup",
    element: <SignupPage />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> {/* Wrap RouterProvider with AuthProvider */}
      <RouterProvider router={router} />
    </AuthProvider>  </React.StrictMode>,
);