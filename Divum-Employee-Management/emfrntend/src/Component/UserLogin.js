import React, { useState, useEffect } from 'react';

import "../style/UserLogin.css";
import { motion } from "framer-motion";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


function UserLogin() {
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError,setemailidError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const navigate=useNavigate();
    
  

    
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();

      fetch(`http://localhost:8080/divumemp/checkemail/${email}`)
  .then(response => {
    return response.text(); 
  })
  .then(data => {
    
    console.log("Response from the server:", data);
    if(data==="true")
  {
      axios.get(`http://localhost:8080/divumemp/onerec/${email}`).then((response)=>{
      const resdata=response.data;
      if(response.data.password==password)
      {
        navigate(`/userhome/${email}`);
      }
      else
      {
        setPasswordError('Password Incorrect!')
      }
  })
  }
  else
  {
    setemailidError('Email Doesnot Exists!');
  }});
      
    };

  
  
    return (
      <div className="user-login-container">
        <h2>Employee Login</h2>
        <motion.div
        initial={{ opacity: 0, scale: 0.25 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}>
        <form className="user-login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className='loginlable' htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              onChange={ (e)=> {handleEmailChange(e); setemailidError('');}}
              required
            />
            <p id="loginErrors" > &nbsp;{emailError} </p>
          </div>
          <div className="userform-group">
            <label  htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={ (e)=> {handlePasswordChange(e); setPasswordError('');}}
              required
            />
            <p id="loginErrors" > &nbsp;{passwordError} </p>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        </motion.div>
        
      </div>
    );
  }
  
  export default UserLogin;
  