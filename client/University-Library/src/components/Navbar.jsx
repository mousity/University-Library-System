import React from "react";
import './Navbar.css';
import { useAuth } from "../../../AuthContext";
import { Outlet, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();  
    window.location.href = '/';
  };

  return (
    <>
      <div className="navBox">
        <div className="Navbar">
          <div className="topBar">
            {/* Conditional rendering based on user's login state */}
            {user ? (
              <div className="contain1">
                <h3 className="subTopOption">Welcome, {user.user.email}</h3>
                <Link to="/settings" className="subTopOption">Settings</Link>
                <Link to="/" className="subTopOption" onClick={handleLogout}>Logout</Link>
              </div>
            ) : (
              <Link to="/Login"><h3 className="subTopOption">Login/Signup</h3></Link>
            )}
            <Link to="/mybooks"><h3 className="subTopOption">My Books</h3></Link>
            <Link to="/admin"><h3 className="subTopOption">ADMIN</h3></Link>

            <div className="dropdown">

              <h3 className="subTopOption">Hours</h3>
              <div className="dropdown-content">
                <p>Monday: 9AM - 10PM</p>
                <p>Tuesday: 9AM - 10PM</p>
                <p>Wednesday: 9AM - 10PM</p>
                <p>Thursdy: 9AM - 10PM</p>
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
          <Link className="logoLink" to="/"><h1 className="logoMain">COUNTY UNIVERSITY LIBRARY</h1></Link>
          <div className="options">
            <Link to="/events" className="subOption">Events & Workshops</Link>
            <a href="https://www.nypl.org/research/collections/articles-databases/academic-search-premier" className="subOption" target="_blank" rel="noopener noreferrer">Research Studies</a>
            <Link to="/Faq" className="subOption">FAQ</Link>
            <Link to="/AboutUs" className="subOption">About Us</Link>
            <Link to="/books" className="subOption">The Library</Link>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}


export default NavBar;