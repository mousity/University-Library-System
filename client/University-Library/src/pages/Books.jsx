
import { createClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import { useAuth } from "../../../AuthContext";
function Books() {

    //SUPABASE CONNECTION DATA
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
    const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
    const supabase = createClient(supabaseUrl, supabaseKey)
    //SUPABASE CONNECTION DATA

    const { user } = useAuth(); //check if user is logged in

    const [books, setBooks] = useState([]);

    useEffect(() => {
        getBooks();

    }, []);

    async function getBooks() {
        const { data } = await supabase.from("books").select();
        setBooks(data);
    }

    console.log(books)

    const handleSubmit = () => {

    }


    return (
        <div>
            <h1>Book List</h1>
            <ul>
                {books.map((book) => (
                    <li key={book.isbn}>
                        <strong>{book.title}</strong> by {book.author} (Genre: {book.genre}, Available: {book.available})
                        {/* Conditional rendering based on user's login state */}
                        {!user ? (
                            <button onClick={handleSubmit()}>rent</button>
                        ) : <h1></h1>}

                    </li>
                ))}
            </ul>
        </div>
    );
}





export default Books