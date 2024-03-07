import React, { useState } from 'react';
import "../style/AdminLogin.css"
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
function AdminLogin() {
  
  const [password, setPassword] = useState('');
  const[passworderror,setPassworderror]= useState('');
  const nav = useNavigate();

 const adminpassword="admin123";

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your login logic for admin here, using 'email' and 'password' state variables.
  };
  function submit(){

    if(password === adminpassword){
        nav("/get")
    }

    else{
       setPassworderror('Your Password is incorrect');
    }
  }

  return (
    <div className="admin-login-container">
      <h2>Admin Login</h2>
      <motion.div
       
       initial={{ opacity: 0, scale: 0.25 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      
      
      >
      <form className="admin-login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label  htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value="admin@divum.in"
            
          />
        </div>
        <div className="form-group">
          <label  htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          {passworderror && < p className='error' > &nbsp; {passworderror}</p>}
        </div>
        <button type="submit" onClick={submit} className="login-button">
          Login
        </button>
      </form>
      </motion.div>
      
    </div>
  );
}

export default AdminLogin;
