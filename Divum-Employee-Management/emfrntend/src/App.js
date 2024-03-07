import './App.css';
import AddUser from './Component/AddUser';
import GetUser from './Component/GetUser';
import PutUser from './Component/PutUser';
import UserHome from './Component/UserHome'
import loginPage from './Component/LoginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './Component/LoginPage';
import AdminLogin from './Component/AdminLogin';
import UserLogin from './Component/UserLogin';
import UserLeavePage from './Component/UserLeavePage';
import AdminLeaveApplication from './Component/AdminLeaveApllication';
function App() {
  return (
    <div className="App">

      <Routes>
        <Route index element={<LoginPage/>} />
        <Route path='/get' element={<GetUser />} />
        <Route path='/add' element={<AddUser />} />
        <Route path='/put/:id' element={<PutUser />} />
        <Route path='/adminlogin' element={<AdminLogin/>}/>
        <Route path='/userlogin' element={<UserLogin/>}/>
        <Route path='/userhome/:id' element={<UserHome/>}/>
        <Route path='/leavepage/:id' element={<UserLeavePage/>}/>
        <Route path='/adminleavepage' element={<AdminLeaveApplication/>}/>
      </Routes>


    </div>
  );
}

export default App;
