import React from "react";
import './Navbar.css';
import { Outlet } from "react-router-dom";

function NavBar(){
return (
    <>
    <div className="navBox">
        <div className="Navbar">
            <div className="topBar">
                <h3 className="subTopOption">My account</h3>
                <h3 className="subTopOption">Hours</h3>
                <h3 className="subTopOption">Contact us</h3>
            </div>
            <h1 className="logo">UNIVERSITY OF GENERIC COUNTY</h1>
            <div className="options">
                <h2 className="subOption">About Us</h2>
                <h2 className="subOption">Reserve a book</h2>
                <h2 className="subOption">FAQ</h2>
            </div>
        </div>
    </div>
    <Outlet />
    </>


)
}

export default NavBar;