
import { createClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import { useAuth } from "../../../AuthContext";
import "./Books.css";
import Footer from "./Footer";
function Books() {

    //SUPABASE CONNECTION DATA
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
    const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
    const supabase = createClient(supabaseUrl, supabaseKey)
    //SUPABASE CONNECTION DATA

    const { user } = useAuth(); //check if user is logged in

    const [books, setBooks] = useState([]);
    const [showForm, setShowForm] = useState(null); // Tracks which book's form to show
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        getBooks();
    }, []);

    async function getBooks() {
        const { data } = await supabase.from("books").select();
        setBooks(data);
    }

    function handleSearchChange(event) {
        setSearchTerm(event.target.value);
    }

    function handleSearch() {
        getBooksFilteredBySearch();
    }

    async function getBooksFilteredBySearch() {
        const { data, error } = await supabase
            .from('books')
            .select()
            .ilike('title', `%${searchTerm}%`); // Using ilike for case-insensitive partial matching

        if (error) {
            console.log('Error fetching filtered books:', error);
            return;
        }

        setBooks(data);
    }

    async function rentBooks(book_id) {
        const { data: loansData, error: loansError } = await supabase
            .from('loans')
            .select('loan_id')
            .eq('user_id', user.user.id)

        if (loansError) {
            console.log('Error checking user loans:', loansError);
            return;
        }
        if (loansData.length >= 2) {
            console.log('User cannot loan more than 2 books.');
            return;
        }
        //check availability
        let { data: bookData, error: bookError } = await supabase
            .from('books')
            .select('available')
            .eq('id', book_id)
            .single();
        if (bookError) {
            console.log('Error fetching book:', bookError);
            return;
        }

        if (bookData.available <= 0) {
            console.log('Book is not available for rent');
            return;
        }

        //SET CHECKOUT DATE
        const today = new Date();
        const checkoutDate = today.toISOString().split('T')[0]; // Format for 'date' type
        const dueDate = new Date(today);
        dueDate.setDate(today.getDate() + 7);
        const formattedDueDate = dueDate.toISOString().split('T')[0]; // Format for 'date' type

        // Insert into 'loans' table, not 'books'
        const { data, error } = await supabase.from("loans")
            .insert([
                {
                    user_id: user.user.id,
                    book_id: book_id,
                    checkout_date: checkoutDate, // Use formatted date
                    due_date: formattedDueDate, // Use formatted date
                }
            ])

        if (error) {
            console.log('Error loaning book:', error);
            // Optionally, handle the case where the decrement fails
        } else {
            console.log('Book loaned successfully:', data);
            const { data: updateData, error: updateError } = await supabase
                .from('books')
                .update({ available: bookData.available - 1 })
                .eq('id', book_id);
            getBooks();

        }
    }

    return (
        <>
        <div className="search-container">
                <input
                    type="text"
                    placeholder="Search for Library Resources..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
        <div className="book-list">
            {books.map((book) => (
                <div className="book-item" key={book.id}>
                    <img className="book-image" src={book.image} alt={book.title} />
                    <div className="book-info">
                        <strong>{book.title}</strong> by {book.author}
                        <div>(Genre: {book.genre}, Available: {book.available})</div>
                    </div>
    
                    {user && (
                        <button className="rent-button" onClick={() => rentBooks(book.id)}>Rent</button>
                    )}
                </div>
            ))}
        </div>
        <Footer></Footer>
        </>
    );
}

export default Books