// import React, { useState } from 'react'
// import "../style/LoginPage.css";

// import LogoImg from "../assert/download.png";
// import logindivimage from"../assert/Ecommerce-Engine 600x600.jpg";

// export default function LoginPage(){

//   const nav = useNavigate();
//   const [emailid, setemailid] = useState('');
//   const [address, setaddress] = useState('');

// //error variable declaration

//   const [emailidError, setemailidError] = useState('');
//   const [addressError, setaddressError] = useState('');
//   function validateEmail(email) {
//     return /^\S+@\S+\.\S+$/.test(email);
//   }

//   function validateEmail(email) {
//     return /^\S+@\S+\.\S+$/.test(email);
//   }

//   function handleEmailChange(email) {
//     setemailid(email);

//     if (!validateEmail(email)) {
//       setemailidError('Please enter a valid email address');
//     } else {
//        setemailidError('');
//     }
//   }

//   function handleAddressChange(value) {
//     setaddress(value);

//     if (value.length > 50) {
//       setaddressError('Address should be less than 50 characters');
//     } else {
//       setaddressError('');
//     }
//   }



//   function validateForm() {
//     return (
//       validateEmail(emailid) &&
//       emailidError === '' &&
//       addressError === '' 
//     );
//   }

//   function back(){
//     nav("/get")
//   }
  
//   function submit(){
//     //nav("/get")
//   }
  


//   return (
//     <>
//     <div id="body">
//       <div className='login-container'>
//         <div className='left-container'>
//         <img id="logindivimage"  src={logindivimage} alt="" />
//         </div>
//         <div className='loginright-container'>
//           <header>
//           <div >   <img id="logoimage" src={LogoImg} alt="" /> </div>
//             <div className='set'>
//               <div className='mail'>
//                 <label htmlFor='mail'data-testid="emailidbtn" >Email</label>
//                 <input
//                   id='mail'
//                   placeholder="Enter Your Email id"
//                   type='text'
//                   value={emailid}
//                   onChange={(e) => handleEmailChange(e.target.value)}
//                 />
//                 {emailidError && < p className='error' data-testid="emailid-error-msg"> &nbsp; {emailidError}</p>}
                
          
//               </div>
//               <div className='address'>
//                 <label htmlFor='address'>Address</label>
//                 <input
//                   id='address'
//                   placeholder="Enter Your address"
//                   type='text'
//                   value={address}
//                   onChange={(e) => handleAddressChange(e.target.value)}
//                 />
//                 {addressError && <p className='error'> &nbsp;{addressError}</p>}
//               </div>
//             </div>
           
           
//           </header>
//           <footer>
//             <div className='set'>
//               <button id='back' onClick={back} >Back </button>
//               <button id='submit' onClick={submit()}>Submit</button>
//             </div>
//           </footer>
//         </div>
//       </div>
//       </div>
//     </>
//   );

// }



import React, { useState } from 'react';
import '../style/LoginPage.css';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';


function LoginPage() {
  const nav = useNavigate();
  const [loginType, setLoginType] = useState('admin'); // Default to 'admin'


  const handleLoginTypeChange = (type) => {
    setLoginType(type);
  };

  const handleLogin = () => {
    // Implement your login logic here based on the selected loginType
    if (loginType === 'admin') {
      // Handle admin login
      nav("/adminlogin")

    } else {
      // Handle user login
       nav("/userlogin")
    }
  };

  return (
    <motion.div 
    initial={{ opacity: 0, scale: 0.25 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1 }}
    className="login-container">
         <div className="content-container">
        <h2>Welcome to Divum Employee Management</h2>
        <div className="login-options">
          <button id='buttondesign'
            className={loginType === 'admin' ? 'active' : ''}
            onClick={() => handleLoginTypeChange('admin')}
          >
            Login as Admin
          </button>
          <button
            className={loginType === 'user' ? 'active' : ''}
            onClick={() => handleLoginTypeChange('user')}
          >
            Login as User
          </button>
        </div>
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
      </div>
    </motion.div>
  );
}

export default LoginPage;
