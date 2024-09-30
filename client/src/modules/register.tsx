import React, { useState } from "react";
import '../styles/registerModule.css'

interface RegisterInputProps {
  onRegister: (email: string, 
            password: string) => void;
}

const RegisterForm:React.FC<RegisterInputProps> = ({ onRegister }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const postRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // May remove to reload with user logged in
    if (email || password === '') {
      return console.log('Empty Prompt');
    }
    onRegister(email, password);
  };

  function openForm() {
    document.getElementById("register")!.style.display = "block";
  }

  function closeForm() {
    document.getElementById("register")!.style.display = "none";
  }


  return (
      <div className="register-area">
        <button className="register-btn" onClick={openForm}>
          Register
        </button>

        <div className="register-popup" id="register">
          <form className="register-container" onSubmit={postRegister}>
            
            <h1>Register</h1>   

            <label>
              <b>Email</b>
            </label>
            <input
            id="email" 
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

            <button id="postregister" className="post-register" type="submit">
              Register
            </button>

            <button id="close" className="close-btn" onClick={closeForm}>
              Close
            </button>
          </form>
        </div>
        
      </div>
  );
};

export default RegisterForm