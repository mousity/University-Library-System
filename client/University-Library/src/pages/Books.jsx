
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
    const [showForm, setShowForm] = useState(null); // Tracks which book's form to show

    useEffect(() => {
        getBooks();
    }, []);

    async function getBooks() {
        const { data } = await supabase.from("books").select();
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
                    status: "active"
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

    console.log(user.user.id)




    return (
        <div>
            <h1>Book List</h1>
            <ul>
                {books.map((book) => (
                    <li key={book.id}>
                        <strong>{book.title}</strong> by {book.author} (Genre: {book.genre}, Available: {book.available})
                        {/* Conditional rendering based on user's login state */}
                        {user ? (
                            <button onClick={() => rentBooks(book.id)}>Rent</button>
                        ) : <h1></h1>}

                    </li>
                ))}
            </ul>
        </div>
    );
}





export default Books