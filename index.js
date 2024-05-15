require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Endpoint to fetch all books
app.get('/books', async (req, res) => {
    const { data, error } = await supabase
        .from('books')
        .select();
    
    if (error) return res.status(400).send(error);
    res.send(data);
});

// Endpoint to search books
app.get('/books/search', async (req, res) => {
    const searchTerm = req.query.term;
    const { data, error } = await supabase
        .from('books')
        .select()
        .ilike('title', `%${searchTerm}%`);

    if (error) return res.status(400).send(error);
    res.send(data);
});

// Endpoint to rent books
app.post('/books/rent', async (req, res) => {
    const { book_id, user_id } = req.body;

    // Check user's current loans
    let { data: loansData, error: loansError } = await supabase
        .from('loans')
        .select('loan_id')
        .eq('user_id', user_id);

    if (loansError) return res.status(400).send(loansError);
    if (loansData.length >= 2) return res.status(400).send({ message: "User cannot loan more than 2 books." });

    // Check book availability
    let { data: bookData, error: bookError } = await supabase
        .from('books')
        .select('available')
        .eq('id', book_id)
        .single();

    if (bookError || bookData.available <= 0) return res.status(400).send({ message: "Book is not available for rent" });

    // Process the loan
    const today = new Date();
    const checkoutDate = today.toISOString().split('T')[0]; // Format for 'date' type
    const dueDate = new Date(today);
    dueDate.setDate(today.getDate() + 7);
    const formattedDueDate = dueDate.toISOString().split('T')[0]; // Format for 'date' type

    const { data, error } = await supabase.from("loans").insert([
        {
            user_id: user_id,
            book_id: book_id,
            checkout_date: checkoutDate,
            due_date: formattedDueDate,
        }
    ]);

    if (error) return res.status(400).send(error);

    // Update book availability
    const { data: updateData, error: updateError } = await supabase
        .from('books')
        .update({ available: bookData.available - 1 })
        .eq('id', book_id);

    if (updateError) return res.status(400).send(updateError);
    res.send({ message: "Book loaned successfully" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
