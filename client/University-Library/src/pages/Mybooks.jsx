import { createClient } from "@supabase/supabase-js"
import { useAuth } from "../../../AuthContext"
import { useState, useEffect } from "react"
import Footer from "./Footer"
function Mybooks() {
    //SUPABASE CONNECTION DATA
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
    const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
    const supabase = createClient(supabaseUrl, supabaseKey)
    //SUPABASE CONNECTION DATA
    const { user } = useAuth(); //check if user is logged in

    const [data, setData] = useState()//contains books that user has loaned out activerly



    useEffect(() => {

        getLoanData();
        console.log(data)

    }, []);

    async function getLoanData() {
        console.log('hello')
        const { data: loanData } = await supabase.from('loans').select("book_id").eq("user_id", user.user.id) //select from loans , book_id where userid = userid
        console.log(loanData)
        const bookIds = loanData.map(loan => loan.book_id);
        if (bookIds.length > 0) {
            const { data: bookData } = await supabase.from('books').select("*").in('id', bookIds)
            setData(bookData);
            console.log(bookData)
        }
        else {
            setData("No books found for the user")
        }
    }
    async function returnBook(book_id) {
        //remove from loans table, book with book id, user with user id
        const { data: deleted } = await supabase.from('loans').delete().eq("book_id", book_id).eq("user_id", user.user.id) //select from loans , book_id where userid = userid
        console.log(deleted)
        if (deleted) {
            console.log("deletion successful")
        }
        else {
            console.log("error has occured")
        }
        getLoanData()

    }

    return (
    <><div>
        <h1>My Books:</h1>
        <ul>
            {user ? (Array.isArray(data) && data.length > 0 ? data.map((book) => (//BUG HERE, CANNOT MAP OVER EMPTY BOOKS
                <li key={book.id}>
                    {book.title}
                    <button onClick={() => returnBook(book.id)}>return</button>

                </li>
            ))
                :
                <h1>You do not have any books</h1>
            ) : <h1>Sign in to view books</h1>}


        </ul>
    </div>
    <Footer></Footer>
    </>
    )

}

export default Mybooks
