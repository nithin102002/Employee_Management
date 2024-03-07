import React, { useState } from 'react';
import "../style/AddUser.css";
import Img from "../assert/download.png";
import Divumimg from "../assert/Ecommerce-Engine 600x600.jpg"
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


export default function AddUser() {
  const nav = useNavigate();
  const [emailid, setemailid] = useState('');
  const [address, setaddress] = useState('');
  const [fname, setfname] = useState('');
  const [lname, setlname] = useState('');
  const [mbno, setmbno] = useState('');
  const [dob, setdob] = useState('');
  const [isPresent, setIsPresent] = useState('');
  const emp = { emailid, address, fname, lname, mbno, dob };

  const [emailidError, setemailidError] = useState('');
  const [addressError, setaddressError] = useState('');
  const [fnameError, setfnameError] = useState('');
  const [lnameError, setlnameError] = useState('');
  const [mbnoError, setmbnoError] = useState('');
  const [dobError, setdobError] = useState('');

  function validateEmail(email) {
    return /^\S+@\S+\.\S+$/.test(email);
  }

  function handleEmailChange(email) {
    setemailid(email);

    if (!validateEmail(email)) {
      setemailidError('Please enter a valid email address');
    } else {
       setemailidError('');
    }
  }

  function handleAddressChange(value) {
    setaddress(value);

    if (value.length > 50) {
      setaddressError('Address should be less than 50 characters');
    } else {
      setaddressError('');
    }
  }

  function validateName(name) {
    return /^[A-Za-z\s]+$/.test(name);
  }

  function handleFirstNameChange(value) {
    setfname(value);

    if (!validateName(value)) {
      setfnameError('First Name should only contain letters and spaces');
    } else {
      setfnameError('');
    }
  }

  function handleLastNameChange(value) {
    setlname(value);

    if (!validateName(value)) {
      setlnameError('Last Name should only contain letters and spaces');
    } else {
      setlnameError('');
    }
  }

  function validateMbno(mbno) {
    return /^\d+$/.test(mbno);
  }

  function handleMbnoChange(value) {
    let sanitizedValue = value.replace(/\D/g, ''); // Remove non-digit characters

    if (sanitizedValue.length > 10) {
      sanitizedValue = sanitizedValue.slice(0, 10); // Limit to 10 digits
    }

    setmbno(sanitizedValue);

    if (sanitizedValue.length < 10) {
      setmbnoError('Mobile Number should be 10 digits');
    } else {
      setmbnoError('');
    }
  }

  function validateDob(dob) {
    const currentDate = new Date();
    const selectedDate = new Date(dob);
    const eighteenYearsAgo = new Date();
    eighteenYearsAgo.setFullYear(currentDate.getFullYear() - 18);

    return selectedDate <= currentDate && selectedDate <= eighteenYearsAgo;
  }

  function handleDobChange(value) {
    setdob(value);

    if (!validateDob(value)) {
      setdobError('Date of Birth should be a valid one ');
    } else {
      setdobError('');
    }
  }


  function validateForm() {
    return (
      validateEmail(emailid) &&
      emailidError === '' &&
      addressError === '' &&
      validateName(fname) &&
      fnameError === '' &&
      validateName(lname) &&
      lnameError === '' &&
      mbnoError === '' &&
      dobError === ''
    );
  }

  function back(){
    nav("/get")
  }
  
 function submit(email) 
{
  console.log( "Email is:"+ email);
  fetch(`http://localhost:8080/divumemp/checkemail/${email}`)
  .then(response => {
    return response.text(); 
  })
  .then(data => {
    
    console.log("Response from the server:", data);
    if(data==="true")
  {
    
    setemailidError('Email Aleady Exists!!!!!!!!');
  }
  else
  {
    if (validateForm()) {
      fetch('http://localhost:8080/divumemp/insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emp),
      })
        .then(response => {
          if (response.ok) {
            nav('/get');
          } else {
            console.error('Server returned an error:', response.statusText);
          }
        })
        .then(Swal.fire({
          title:"Addition Success!",
          text:"One Employee Added!",
          icon:"success",
          timer : 2500
        }
        ))
        ;
    }
  }
  
  })
  
  
  
}

  return (
    <>
    <div id="body">
      <div className='signup-container'>
        <div className='left-container'>
        <img id="divimage"  src={Divumimg} alt="" />
        </div>
        <div className='right-container'>
          <header>
          <div >   <img id="image" src={Img} alt="" /> </div>
            <div className='set'>
              <div className='mail'>
                <label htmlFor='mail'data-testid="emailidbtn" >Email</label>
                <input
                  id='mail'
                  placeholder="Enter Your Email id"
                  type='text'
                  value={emailid}
                  onChange={(e) => handleEmailChange(e.target.value)}
                />
                 {emailidError && < p className='error' data-testid="emailid-error-msg"> &nbsp; {emailidError}</p>}

          
              </div>
              <div className='address'>
                <label htmlFor='address'>Address</label>
                <input
                  id='address'
                  placeholder="Enter Your address"
                  type='text'
                  value={address}
                  onChange={(e) => handleAddressChange(e.target.value)}
                />
                {addressError && <p className='error'> &nbsp;{addressError}</p>}
              </div>
            </div>
            <div className='set'>
              <div className='fname'>
                <label htmlFor='fname'>First Name</label>
                <input
                  id='fname'
                  placeholder="Enter Your First Name"
                  type='text'
                  value={fname}
                  onChange={(e) => handleFirstNameChange(e.target.value)}
                />
                {fnameError && <p className='error'>&nbsp;{fnameError}</p>}
              </div>
              <div className='lname'>
                <label htmlFor='lname'>Last Name</label>
                <input
                  id='lname'
                  placeholder='Enter Your Last Name'
                  type='text'
                  value={lname}
                  onChange={(e) => handleLastNameChange(e.target.value)}
                />
                {lnameError && <p className='error'>&nbsp;{lnameError}</p>}
              </div>
            </div>
            <div className='set'>
              <div className='mbno'>
                <label htmlFor='mbno'>Mobile Number</label>
                <input
                  id='mbno'
                  placeholder='Enter Your Mobile Number'
                  type='text'
                  value={mbno}
                  onChange={(e) => handleMbnoChange(e.target.value)}
                />
                {mbnoError && <p className='error'>&nbsp;{mbnoError}</p>}
              </div>
              <div className='dob'>
                <label id="dobh" htmlFor='dob'>Date Of Birth</label>
                <input
                  id='dob'
                  placeholder='Enter Your Date Of Birth'
                  type='date'
                  value={dob}
                  onChange={(e) => handleDobChange(e.target.value)}
                />
                {dobError && <p className='error'>&nbsp;{dobError}</p>}
              </div>
            </div>
          </header>
          <footer>
            <div className='set'>
              <button id='back' onClick={back} >Back </button>
              <button id='submit' onClick={()=>submit(emailid)}>Submit</button>
            </div>
          </footer>
        </div>
      </div>
      </div>
    </>
  );
}


