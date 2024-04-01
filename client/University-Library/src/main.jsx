import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage.jsx";
import Navbar from "./components/Navbar.jsx";
import './index.css';
import SignupPage from "./pages/Signup.jsx";
import LoginPage from "./pages/Login.jsx";
import Books from "./pages/Books.jsx";
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
      {path: "/books",
      element: <Books />}
    ]
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/signup",
    element: <SignupPage />
  },{
    path: "/mybooks",
    element: <Mybooks />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> {/* Wrap RouterProvider with AuthProvider */}
      <RouterProvider router={router} />
    </AuthProvider>  </React.StrictMode>,
);