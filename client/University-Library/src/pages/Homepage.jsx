import react, { useEffect, useState } from "react";
import './Homepage.css';
import { createClient } from "@supabase/supabase-js";
function Homepage() {

    //SUPABASE CONNECTION DATA
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
    const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
    const supabase = createClient(supabaseUrl, supabaseKey)
    //SUPABASE CONNECTION DATA

    const [countries, setCountries] = useState([]);
    
    useEffect(() => {
      getCountries();
      
    }, []);
    
    async function getCountries() {
      const { data } = await supabase.from("books").select();
      setCountries(data);
    }
    console.log(countries)
    return (
      <ul>
        {countries.map((country) => (
          <li key={country.id}>{country.title}</li>
        ))}
      </ul>

    );
}


export default Homepage;