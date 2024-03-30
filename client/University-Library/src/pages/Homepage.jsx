import react, { useEffect, useState } from "react";
import './Homepage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faHome, faBook, faSearch, faArrowAltCircleLeft, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

function Homepage() {


    return (
        <>
        <img className="banner" src="https://149747948.v2.pressablecdn.com/wp-content/uploads/homepage-still3.jpg" />
        <div className="search-container">
            <input 
                type="text" 
                placeholder="Search for Library Resources..." 
            />
            <button>Search</button>
        </div>
             <div className="prompt">
                 <span>I Want To </span>
             </div>
           <div className="icon-container">
           <div className="icon-with-label">
             <FontAwesomeIcon icon={faSearch} />
             <span>Search Book</span>
           </div>
           <div className="icon-with-label">
             <FontAwesomeIcon icon={faArrowAltCircleLeft} />
             <span>Return Book</span>
           </div>
           <div className="icon-with-label">
             <FontAwesomeIcon icon={faBook} />
             <span>My Books</span>
           </div>
    </div>

        <footer className="footer">
                <div className="footer-content">
                    <p><FontAwesomeIcon icon={faEnvelope} />Contact Us: Countylibrary@Gmail.com</p>
                    <p><FontAwesomeIcon icon={faPhone} />Phone: 718-564-9089</p>
                    <p>&copy; 2024 County University Library</p>
                </div>
            </footer>
        </>
    );


}


export default Homepage;