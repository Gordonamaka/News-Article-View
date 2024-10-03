import React, { useState } from "react";
import '../styles/registerModule.css'

interface RegisterInputProps {
  onRegister: (
  email: string, 
  password: string,
  firstName: string,
  lastName: string) => void;
}

const RegisterForm:React.FC<RegisterInputProps> = ({ onRegister }) => {
  // Refactor into State Object
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  
  const postRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!firstName|| !lastName|| !email || !password) {
      return console.log('Empty Prompt');
    }
    onRegister(firstName, lastName, email, password);
    closeForm();
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
              <b>First Name</b>
            </label>
            <input
            id="firstName" 
            type="text"
            className="firstName-input" 
            placeholder="Enter First Name" 
            name="firstName" 
            aria-label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)} 
            required/>

            <label>
              <b>Last Name</b>
            </label>
            <input 
            type="text"
            className="lastName-input" 
            placeholder="Enter Last Name" 
            name="lastName" 
            aria-label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)} 
            required/>

            <label>
              <b>Email</b>
            </label>
            <input
            id="email-reg" 
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

            <button id="close-reg" className="close-btn" type="button" onClick={closeForm}>
              Close
            </button>
          </form>
        </div>
        
      </div>
  );
};

export default RegisterForm