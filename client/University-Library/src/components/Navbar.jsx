import React from "react";
import './NavBar.css';
import { Outlet } from "react-router-dom";

function NavBar(){
return (
    <>
        <div className="Navbar">
            <h1 className="logo"></h1>
        </div>
        <Outlet />
    </>
)
}

export default NavBar;