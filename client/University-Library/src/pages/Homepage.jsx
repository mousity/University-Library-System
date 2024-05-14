import react, { useEffect, useState } from "react";
import './Homepage.css';
import { createClient } from "@supabase/supabase-js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faHome, faBook, faSearch, faArrowAltCircleLeft, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import Footer from "./Footer";
function Homepage() {


  //SUPABASE CONNECTION DATA
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
  const supabase = createClient(supabaseUrl, supabaseKey)
  //SUPABASE CONNECTION DATA

  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks();

  }, []);

  async function getBooks() {
    const { data } = await supabase.from("books").select();
    setBooks(data);
  }
  console.log(books);

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
      <div>
      <div className="prompt">
        <span>I Want To </span>
      </div>
      
      <div className="icon-container">
      <Link to="/books">
        <div className="icon-with-label">
          <FontAwesomeIcon icon={faSearch} />
          <span>Search Book</span>
        </div>
        </Link>
        <div className="icon-with-label">
          <FontAwesomeIcon icon={faArrowAltCircleLeft} />
          <span>Return Book</span>
        </div>
        <Link to="/Mybooks">
          <div className="icon-with-label">
            <FontAwesomeIcon icon={faBook} />
            <span>My Books</span>
          </div>
        </Link>
      </div>
      </div>

      {/* Temporary! 
      <ul>
      {books.map((book) => (
        <li key={book.id}>{book.title}</li>
      ))}
      </ul>
      */}
      <Footer></Footer>
    </>
  );

}
export default Homepage;
