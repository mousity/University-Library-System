import { createClient } from "@supabase/supabase-js"
import { useAuth } from "../../../AuthContext"
import { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons"
function Admin () {
    //SUPABASE CONNECTION DATA
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
    const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
    const supabase = createClient(supabaseUrl, supabaseKey)
    //SUPABASE CONNECTION DATA

    //function of this page is to allow admin to add/delete books, and change quantity 
    const { user } = useAuth(); 

    const [books, setBooks] = useState([]);
    useEffect(() => {
        getBooks();
    }, [books]);
    async function getBooks() {
        const { data } = await supabase.from("books").select();
        setBooks(data);
    }

    const deleteBook = async (book_id) => {
        let { data } = await supabase.from("books").delete().eq('id', book_id)
        if (error) {
            console.error('Error deleting book:', error);
            return;
        }
    
        console.log('Book deleted:', data);
    }
    const addBook = async (book_id) => {
         // Prompt the user for book details
    const title = prompt('Enter book title:');
    const author = prompt('Enter book author:');
    const quantity = prompt('Enter book quantity:');
    const isbn = prompt('Enter book isbn:');
    const genre = prompt('Enter book genre:');
    const available = prompt('Enter book available:');
    const image = prompt('Enter book image:');


    // Ensure the inputs are valid
    if (!title || !author || isNaN(quantity)) {
        alert('Please enter valid book details');
        return;
    }

    // Insert the new book into the database
    const { data, error } = await supabase
        .from('books')
        .insert([
            { isbn: isbn, genre: genre, available: available, image: image, title: title, author: author, quantity: parseInt(quantity, 10) }
        ]);

    if (error) {
        console.error('Error adding book:', error);
        return;
    }

    console.log('Book added:', data);
    }

    const  updateBookQuantity = async (book_id, newQuantity ) => {
    // update the quantity of the selected book
    let { data: updatedData, error: updateError } = await supabase
        .from('books')
        .update({ available: newQuantity })
        .eq('id', book_id);

    if (updateError) {
        console.error('Error updating book quantity:', updateError);
        return;
    }

    console.log('Book quantity updated:', updatedData);
                                  
    }

    const handleEditQuantity = async (bookid) => {
        const newQuantity = prompt('Enter new quantity:');
    
        // Ensure the new quantity is a valid number
        if (newQuantity !== null && !isNaN(newQuantity)) {
            await updateBookQuantity(bookid, parseInt(newQuantity, 10));
        } else {
            alert('Please enter a valid number');
        }
    };
    

    //Only is_anonymous==true users can view this page, otherwise, unauthorized.  
    return (<>
        {user && user.user.is_anonymous == true ? (<>
            <div className="book-list">
            <button className="rent-button" onClick={() => addBook()}>Add book</button>

            {books.map((book) => (
                <div className="book-item" key={book.id}>
                    <img className="book-image" src={book.image} alt={book.title} />
                    <div className="book-info">
                        <strong>{book.title}</strong> by {book.author}
                        <div>(Genre: {book.genre}, Available: {book.available})</div>
                    </div>
    
                    {user && (<>
                        <button className="rent-button" onClick={() => deleteBook(book.id)}>Delete</button>
                        <button className="rent-button" onClick={() => handleEditQuantity(book.id)}>Edit Quantity</button>
                        </>)}
                </div>
            ))}
        </div>
        
        
        
        
        
        <footer className="footer">
        <div className="footer-content">
          <p><FontAwesomeIcon icon={faEnvelope} />Contact Us: Countylibrary@Gmail.com</p>
          <p><FontAwesomeIcon icon={faPhone} />Phone: 718-564-9089</p>
          <p>&copy; 2024 County University Library</p>
        </div>
      </footer>
      
      
      
      
      
      
      
      </>) : (<h1>Unauthorized.</h1>)}


      </>
    )
}


export default Admin