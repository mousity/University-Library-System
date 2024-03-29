import React, { useState } from 'react';
import "./Login.css";
import { Outlet, Link } from "react-router-dom";
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../AuthContext';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signUpError, setSignUpError] = useState('');
  const { setUser } = useAuth()

  //SUPABASE CONNECTION DATA
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
  const supabase = createClient(supabaseUrl, supabaseKey)
  //SUPABASE CONNECTION DATA
  const navigate = useNavigate();


  async function signInWithEmail() {

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })


    if (error) {
      console.error('Login error:', error);
      setSignUpError(error.message);
    } else {
      console.log('User logged in:', data);
      setUser(data)
      navigate('/'); // Redirect to homepage

      // Handle successful signup, e.g., redirect or show success message
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setSignUpError(''); // Clear any existing errors
    if (!email || !password) {
      setSignUpError('Email and password are required');
      return;
    }
    signInWithEmail()
  };
  console.log(signUpError)


  return (
    <div className='LoginBackground'>
      <h2 className='Login'>Login</h2>
      <form className="Form" onSubmit={handleSubmit}>
        <div>
          <label className='Label'>Email:</label>
          <input className='inputbox'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className='Label'>Password:</label>
          <input className='inputbox'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className='loginButton' type="submit">Login</button>
        <h3>Don't have an account with us? <Link to="/signup">Sign up here!</Link></h3>
      </form>

    </div>
  );
}

export default LoginPage;
