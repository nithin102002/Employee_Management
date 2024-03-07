import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For expect(...).toBeInTheDocument()
import GetUser from '../src/Component/GetUser'; // Adjust the import path as needed
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Object.defineProperty(window, 'matchMedia', {
//   writable: true,
//   matchMedia : ()=>{}
// });

global.matchMedia = global.matchMedia || function () {
  return {
    matches: false,
    addListener: function () { },
    removeListener: function () { }
  }
}

test('test0', () => {
  render(<BrowserRouter>
    < App />
  </BrowserRouter>
  );
  const add = screen.getByTestId('adduserbtn');
  fireEvent.click(add);
  //test for a invalid mail
  const adduserpage = screen.getByPlaceholderText('Enter Your Email id');
  fireEvent.change(adduserpage,{target:{value:'ragu'}});
  const message=screen.getByText("Please enter a valid email address");
  expect(message).toBeInTheDocument();
  
})

test('test1', () => {
  render(<BrowserRouter>
    < App />
  </BrowserRouter>
  );
  
  //test for a valid mail
  const adduserpage = screen.getByPlaceholderText('Enter Your Email id');
  fireEvent.change(adduserpage,{target:{value:'nithin10@gmail.com'}});
  expect("")


})
//test for invalid address data
test('test3', () => {
  render(<BrowserRouter>
    < App />
  </BrowserRouter>
  );
  //test for a invalid address
  const adduserpage = screen.getByPlaceholderText('Enter Your address');
  fireEvent.change(adduserpage,{target:{value:'qwertyuiortyuiortyuiortyuioertyuirtyurtyuiortyuirtyuiert'}});
  const message=screen.getByText("Address should be less than 50 characters");
  expect(message).toBeInTheDocument();
})

//test for valid address data
test('test4', () => {
  render(<BrowserRouter>
    < App />
  </BrowserRouter>
  );
  //test for a valid address
  const adduserpage = screen.getByPlaceholderText('Enter Your address');
  fireEvent.change(adduserpage,{target:{value:'4/43 college pudur veerapandi post tiruppur'}});
  expect("")
})
//test for a invalid firstname
test('test5', () => {
  render(<BrowserRouter>
    < App />
  </BrowserRouter>
  );
  //test for a invalid firstname
  const adduserpage = screen.getByPlaceholderText('Enter Your First Name');
  fireEvent.change(adduserpage,{target:{value:'345678gg'}});
  const message=screen.getByText("First Name should only contain letters and spaces");
  expect(message).toBeInTheDocument();
})

//test for a inavalid lastname
test('test6', () => {
  render(<BrowserRouter>
    < App />
  </BrowserRouter>
  );
  //test for a invalid lastname
  const adduserpage = screen.getByPlaceholderText('Enter Your Last Name');
  fireEvent.change(adduserpage,{target:{value:'Nageshwaran.k'}});
  const message=screen.getByText("Last Name should only contain letters and spaces");
  expect(message).toBeInTheDocument();
})

//test case for invalid mobile number
test('test7', () => {
  render(<BrowserRouter>
    < App />
  </BrowserRouter>
  );
  //test for a invalid mobile number
  const adduserpage = screen.getByPlaceholderText('Enter Your Mobile Number');
  fireEvent.change(adduserpage,{target:{value:'086677124'}});
  const message=screen.getByText("Mobile Number should be 10 digits");
  expect(message).toBeInTheDocument();
})