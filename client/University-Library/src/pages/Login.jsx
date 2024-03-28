import React, { useState } from 'react';
import "./Login.css";
import { Outlet, Link } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Login with:', email, password);
  };

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
