import React, { useState } from 'react';
import "./Signup.css";
import { Outlet, Link } from "react-router-dom";

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Signup with:', email, password);
  };

  return (
    <div className='SignupBackground'>
        <img src="./assets/Logo.png" />
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
        <button className='loginButton' type="submit">Login</button>
        <h3>Already have an account with us? <Link to="/login">Login here!</Link></h3>
      </form>
      
    </div>
  );
}

export default SignupPage;
