import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../AuthContext';
import { createClient } from '@supabase/supabase-js';
import Footer from './Footer';

function MyBooks() {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { user } = useAuth();
    const [books, setBooks] = useState([]);

    useEffect(() => {
        if (user) {
            getLoanData();
        }
    }, [user]);

    async function getLoanData() {
        const { data: loanData, error } = await supabase
            .from('loans')
            .select("book_id")
            .eq("user_id", user.user.id);
        
        if (error) {
            console.error('Error fetching loan data:', error);
            return;
        }

        const bookIds = loanData.map(loan => loan.book_id);
        if (bookIds.length > 0) {
            const { data: bookData, error: bookError } = await supabase
                .from('books')
                .select("*")
                .in('id', bookIds);

            if (bookError) {
                console.error('Error fetching books:', bookError);
                return;
            }

            setBooks(bookData);
        } else {
            setBooks([]);
        }
    }

    async function returnBook(book_id) {
        const { data, error } = await supabase
            .from('loans')
            .delete()
            .match({ book_id: book_id, user_id: user.user.id });

        if (error) {
            console.error('Error deleting book loan:', error);
            return;
        }

        getLoanData();  // Refresh the book list after a book is returned
    }

    return (
        <>
            <div className='my-books-container'>
                <h1 className='my-books'>My Books:</h1>
                <div className="book-list">
                    {books.length > 0 ? books.map(book => (
                        <div className="book-item" key={book.id}>
                            <img className="book-image" src={book.image} alt={book.title} />
                            <div className="book-info">
                                <strong>{book.title}</strong>
                                <div>Author: {book.author}</div>
                                <div>Genre: {book.genre}</div>
                                <div>Available: {book.available ? 'Yes' : 'No'}</div>
                                <button className="rent-button" onClick={() => returnBook(book.id)}>Return</button>
                            </div>
                        </div>
                    )) : <h2>You do not have any books.</h2>}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default MyBooks;
