import React from "react";
import './Navbar.css';
import { useAuth } from "../../../AuthContext";
import { Outlet, Link } from "react-router-dom";

function NavBar() {
  const { user } = useAuth();
  return (
    <>
      <div className="navBox">
        <div className="Navbar">
          <div className="topBar">
            {/* Conditional rendering based on user's login state */}
            {user ? (
              <h3 className="subTopOption">Welcome, {user.user.email}</h3> // Assuming the user object has an email. Adjust as needed.
            ) : (
              <Link to="/Login"><h3 className="subTopOption">Login/Signup</h3></Link>
            )}
            <h3 className="subTopOption">Hours</h3>
            <h3 className="subTopOption">Contact us</h3>
          </div>
          <h1 className="logo">COUNTY UNIVERSITY LIBRARY</h1>
          <div className="options">
            <h2 className="subOption">About Us</h2>
            <h2 className="subOption">Reserve a book</h2>
            <h2 className="subOption">FAQ</h2>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}


export default NavBar;