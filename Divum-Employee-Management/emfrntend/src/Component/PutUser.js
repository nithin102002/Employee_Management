import React, { useState, useEffect } from 'react';
import Img from "../assert/download.png";
import { useNavigate, useParams } from "react-router-dom";
import Divumimg from "../assert/Ecommerce-Engine 600x600.jpg"
import Swal from 'sweetalert2';

export default function PutUser() {
  const nav = useNavigate();
  const { id } = useParams();
  const [emailid, setemailid] = useState(id);
  const [address, setaddress] = useState("");
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [mbno, setmbno] = useState("");
  const [dob, setdob] = useState("");
  const [userData, setUserData] = useState({});
  
  // Variables for error messages
  const [addressError, setAddressError] = useState('');
  const [fnameError, setFnameError] = useState('');
  const [lnameError, setLnameError] = useState('');
  const [mbnoError, setMbnoError] = useState('');

  useEffect(() => {
    // Fetch all user data
    fetch(`http://localhost:8080/divumemp/fetch`)
      .then((res) => res.json())
      .then((result) => {
        // Filter the data based on the email id
        const user = result.find((user) => user.emailid === id);
        if (user) {
          setUserData(user);
          setaddress(user.address);
          setfname(user.fname);
          setlname(user.lname);
          setmbno(user.mbno);
          setdob(user.dob);
        }
      });
  }, [id]);

  function validateAddress(value) {
    if (value.length > 50) {
      setAddressError('Address should be less than 50 characters');
      return false;
    } else {
      setAddressError('');
      return true;
    }
  }

  function validateName(value, field) {
    if (!/^[A-Za-z]+$/.test(value)) {
      if (field === 'fname') {
        setFnameError('First Name should only contain alphabets');
      } else if (field === 'lname') {
        setLnameError('Last Name should only contain alphabets');
      }
      return false;
    } else {
      if (field === 'fname') {
        setFnameError('');
      } else if (field === 'lname') {
        setLnameError('');
      }
      return true;
    }
  }

  function validateMbno(value) {
    const sanitizedValue = String(value).replace(/\D/g, ''); // Ensure value is a string
    if (!/^\d+$/.test(sanitizedValue) || sanitizedValue.length > 10) {
      setMbnoError('Mobile Number should be 10 digits or less and contain only numbers');
      return false;
    } else {
      setMbnoError('');
      return true;
    }
  }
  
  function validateForm() {
    return (
      validateAddress(address) &&
      validateName(fname, 'fname') &&
      validateName(lname, 'lname') &&
      validateMbno(mbno)
    );
  }

  function handleformSubmit() {
    if (validateForm()) {
      const emp = { address, fname, lname, mbno, dob };
      fetch(`http://localhost:8080/divumemp/update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emp),
      }).then(() => nav('/'))
        .then(Swal.fire({
          title:"Updation Success!",
          text:"One Employee Updated!",
          icon:"success",
          timer : 2500
        }
        )

        )
      ;
    }
  }

  function back(){
    nav("/");
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
                <label htmlFor='mail'>Email</label>
                <input id='mail' placeholder='Enter Your Email id' type='text' value={emailid} disabled />
              </div>
              <div className='address'>
                <label htmlFor='address'>Address</label>
                <input
                  id='address'
                  placeholder='Enter Your address'
                  type='text'
                  value={address}
                  onChange={(e) => {
                    setaddress(e.target.value);
                    validateAddress(e.target.value);
                  }}
                />
                {addressError && <p className='error' >{addressError}</p>}
              </div>
            </div>
            <div className='set'>
              <div className='fname'>
                <label htmlFor='fname'>First Name</label>
                <input
                  id='fname'
                  placeholder='Enter Your First Name'
                  type='text'
                  value={fname}
                  onChange={(e) => {
                    setfname(e.target.value);
                    validateName(e.target.value, 'fname');
                  }}
                />
                {fnameError && <p className='error'>{fnameError}</p>}
              </div>
              <div className='lname'>
                <label htmlFor='lname'>Last Name</label>
                <input
                  id='lname'
                  placeholder='Enter Your Last Name'
                  type='text'
                  value={lname}
                  onChange={(e) => {
                    setlname(e.target.value);
                    validateName(e.target.value, 'lname');
                  }}
                />
                {lnameError && <p className='error'>{lnameError}</p>}
              </div>
            </div>
            <div className='set'>
              <div className='mbno'>
                <label className='mbnoh'>Mobile Number</label>
                <input
                  id='mbno'
                  placeholder='Enter Your Mobile Number'
                  type='text'
                  value={mbno}
                  onChange={(e) => {
                    setmbno(e.target.value);
                    validateMbno(e.target.value);
                  }}
                />
                {mbnoError && <p className='error'>{mbnoError}</p>}
              </div>
              <div className='dob'>
                <label className='dob'>Date Of Birth</label>
                <input
                  id='dob'
                  placeholder='Enter Your Date Of Birth'
                  type='date'
                  value={dob}
                  onChange={(e) => setdob(e.target.value)}
                />
              </div>
            </div>
          </header>
          <footer>
            <div className='set'>
              <button id='back' onClick={back}>Back</button>
              <button id='submit' onClick={handleformSubmit}>Submit</button>
            </div>
          </footer>
        </div>
      </div>
      </div>
      
    </>
  );
}
