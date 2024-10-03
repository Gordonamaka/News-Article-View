import React, { useState } from "react";
import '../styles/loginModule.css'

interface LoginInputProps {
  onLogin: (
    email: string, 
    password: string) => void;
}

const LoginForm:React.FC<LoginInputProps> = ({ onLogin }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const postLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if ( !email || !password ) {
      return console.log('Empty Prompt');
    }
    onLogin(email, password);
  };

  function openForm() {
    document.getElementById("login")!.style.display = "block";
  }

  function closeForm() {
    document.getElementById("login")!.style.display = "none";
  }


  return (
      <div className="login-area">
        <button className="login-btn" onClick={openForm}>
          Login
        </button>

        <div className="login-popup" id="login">
          <form className="login-container" onSubmit={postLogin}>
            
            <h1>Login</h1>   

            <label>
              <b>Email</b>
            </label>
            <input
            id="email-log" 
            type="text"
            className="email-input" 
            placeholder="Enter Email" 
            name="email" 
            aria-label="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            required/>

            <label>
              <b>Password</b>
            </label>
            <input 
            type="password"
            className="password-input" 
            placeholder="Enter Password" 
            name="password" 
            aria-label="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            required/>

            <button id="postLogin" className="post-login" type="submit">
              Login
            </button>

            <button id="close-log" className="close-btn" type="button" onClick={closeForm}>
              Close
            </button>
          </form>
        </div>
        
      </div>
  );
};

export default LoginForm