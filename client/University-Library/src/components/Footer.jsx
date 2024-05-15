import React from "react";
import './Navbar.css';
import { Outlet, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function Footer() {

    return (
        <>
        <footer className="footer">
        <div className="footer-content">
            <p><FontAwesomeIcon icon={faEnvelope} />Contact Us: Countylibrary@Gmail.com</p>
            <p><FontAwesomeIcon icon={faPhone} />Phone: 718-564-9089</p>
            <p>&copy; 2024 County University Library</p>
            </div>
        </footer>
        </>
    )
}