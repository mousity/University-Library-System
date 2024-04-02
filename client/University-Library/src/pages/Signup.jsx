import React, { useState } from 'react';
import "./Signup.css";
import { Outlet, Link } from "react-router-dom";
import { createClient } from '@supabase/supabase-js';
import logo from '../assets/Logo.png';

function SignupPage() {

  //SUPABASE CONNECTION DATA
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
  const supabase = createClient(supabaseUrl, supabaseKey)
  //SUPABASE CONNECTION DATA


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signUpMessage, setSignUpMessage] = useState('');

  async function signUp() {
    const { user, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      console.error('Signup error:', error);
      setSignUpMessage(error.message);
    } else {
      console.log('User signed up successfully.',);
      setSignUpMessage("Success, please check ", user.user.email, " and verify your email");

      // Handle successful signup, e.g., redirect or show success message
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setSignUpMessage(''); // Clear any existing errors
    if (!email || !password) {
      setSignUpMessage('Email and password are required');
      return;
    }
    signUp();
  };


  return (
    <div className='SignupBackground'>
      <Link to="/"> <img className='logo' src={logo}/> </Link> 
      <h2 className='Signup'>Signup</h2>
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
        {signUpMessage ? <h4>{signUpMessage}</h4> : null}
        <button className='loginButton' type="submit">Sign up</button>
        <h3 className="loginHere">Already have an account with us? <Link className="loginHere1"to="/login">Login here!</Link></h3>
      </form>

    </div>
  );
}

export default SignupPage;
