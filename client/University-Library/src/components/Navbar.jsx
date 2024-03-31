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
            <div className="dropdown">

              <h3 className="subTopOption">Hours</h3>
              <div className="dropdown-content">
                <p>Monday: 9AM - 10PM</p>
                <p>Tuesday: 9AM - 12PM</p>
                <p>Wednesday: 9AM - 2AM</p>
                <p>Thursdy: 9AM - 8PM</p>
                <p> Friday: 9AM - 10PM</p>
                <p> Saturday/Sunday: Closed</p>
              </div>
            </div>
            <div className="dropdown">
              <h3 className="subTopOption">Contact Us</h3>
              <div className="dropdown-content">
                <p>Phone: 718-564-9089</p>
                <p>Email: CountyLibrary@gmail.com</p>
              </div>
            </div>
          </div>
          <h1 className="logo">COUNTY UNIVERSITY LIBRARY</h1>
          <div className="options">
            <h2 className="subOption">Events & Workshops</h2>
            <h2 className="subOption">Research Studies</h2>
            <h2 className="subOption">FAQ</h2>
            <h2 className="subOption">About Us</h2>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}


export default NavBar;