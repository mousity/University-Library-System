import { createClient } from "@supabase/supabase-js"
import { useAuth } from "../../../AuthContext"
import { useState, useEffect } from "react"
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
        const { data: loanData } = await supabase.from('loans').select("book_id").eq("user_id", user.user.id).eq("status", "active") //select from loans , book_id where userid = userid
        const bookIds = loanData.map(loan => loan.book_id);

        if (bookIds.length > 0) {
            const { data: bookData } = await supabase.from('books').select("*").in('id', bookIds)
            setData(bookData);
        }
        else {
            setData("No books found for the user")
        }
    }

    return (
        <h1>hello</h1>
    )

}

export default Mybooks