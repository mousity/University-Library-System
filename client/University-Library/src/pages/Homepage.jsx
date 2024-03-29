import react, { useEffect, useState } from "react";
import './Homepage.css';
import { createClient } from "@supabase/supabase-js";
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
  console.log(books)
  return (
    <ul>
      {books.map((book) => (
        <li key={book.id}>{book.title}</li>
      ))}
    </ul>

  );
}


export default Homepage;