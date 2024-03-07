import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useAsyncError, useNavigate } from "react-router-dom";
import "../style/GetUser.css";
import Img from '../assert/Divum_Logo.svg';
import Swal from 'sweetalert2';
import axios from 'axios';
export default function GetUser() {

    const navigate = useNavigate();
    const coloumns = [
        {
            title:"S.No",
            render:(_,record,index)=>index+1,
        },
        {

            title: "Email-id",
            dataIndex: "emailid",

        },
        {
            title: "First Name",
            dataIndex: "fname"
        },
        {

            title: "Last Name",
            dataIndex: "lname",

        },
        {
            title: "Mobile Number",
            dataIndex: "mbno"
        },
        {

            title: "DOB",
            dataIndex: "dob",

        },
        {
            title: "Address",
            dataIndex: "address"
        },
        {
            title: "Update",
            render: (res) => (
                <button id="Edit" onClick={() => navigate(`/put/${res.emailid}`)}> Edit </button>
            ),
        },
        {
            title: "Delete",
            render: (res) => (<button id='Delete' onClick={() => handleDelete(res.emailid)}>Delete</button>
            )
        }


    ];

    const [emp, setEmp] = useState([]);
    const [defaultEmp,setDefaultEmp] = useState([]);
    const [searchemp,setSearchemp] = useState([]);
    const[searchempmail,setSearchempmail]= useState('');
    useEffect(() => {
        fetch("http://localhost:8080/divumemp/fetch")
            .then((res) => res.json())
            .then((result) => {
                const rev = result.reverse();
                setEmp(rev);
                setDefaultEmp(rev);
                console.log("First Employee: "+emp);
            });
    }, []);

    const handleDelete = (record) => {
        Swal.fire(
            {
                title:"Delete Alert!",
                text:"Are you sure you want to delte the record?",
                icon:"warning",
                timer:2500
            }
        ).then((result)=>
        {
            if(result.isConfirmed)
            {
                fetch(`http://localhost:8080/divumemp/delete/${record}`, { method: "DELETE", })
                .then(Swal.fire({
                    title:"Deleted!",
                    text:"User Deleted Successfully!",
                    icon:"success",
                    timer:1500
                }))
                .then(() => window.location.reload());
            }
        })
    };
//sort functionality
    function sortfunction(option){

        if(option == "Default"){
            setEmp(defaultEmp);
        }
        else if(option == "Name"){
            setEmp([...emp].sort((a,b) => a.fname.localeCompare(b.fname)));
          
        }
        else if(option == "Email"){
            setEmp([...emp].sort((a,b) => a.emailid.localeCompare(b.emailid)));
            
        }
        else if(option== "DOB"){
            setEmp([...emp].sort((a,b) => a.dob.localeCompare(b.dob)));
        }
    }
    const [show, setShow]=useState(false);
//search functionality
function searchfunctionality(email)
{
    axios.get(`http://localhost:8080/divumemp/onerec/${email}`).then((response)=>{
        const resdata=response.data;
        setSearchemp(resdata);
        setShow(true);
    })
}

//filter functionality
    const [filteredEmployee, setFilteredEmployee] = useState([]);

function filterfunctionality(data){
         axios.get(`http://localhost:8080/divumemp/getname?query=${data}`)
         .then((response)=>{
            const responsedata= response.data;
            setEmp(responsedata);
         })
}

    return (
        <>  
        { show && (<div id="singleDetail" >  
        <div id="innerSingleDetail">  
        <h1>Details of {searchemp.fname+" "+searchemp.lname}  </h1>
               <span> First name: </span> <span> {searchemp.fname} </span><br/>
               <span> Last name: </span> <span> {searchemp.lname} </span><br/>
               <span> Mobile:  </span> <span> {searchemp.mbno} </span><br/>
               <span> DOB: </span> <span> {searchemp.dob} </span><br/>
               <span> Address: </span> <span> {searchemp.address} </span><br/>
               </div>
        </div>) }
           
         { !show && ( <div><header>
           <nav className='navbar'>
                 <img id="divlogoimage"  src={Img} alt="" />
                 <div className='navbar-button'>
                 <select id="sortSelect" name="sortOption" class="custom-select" onChange={(e)=>sortfunction(e.target.value)} >
    <option  value="Default">Default</option>
    <option  value="Name">Sort By First Name</option>
    <option  value="Email">Sort By Email</option>
    <option  value="DOB">Sort By DOB</option>
</select>

                        <input type='text' placeholder='search' onChange={(e)=>setSearchempmail(e.target.value)}/>
                        <button className='search-button' onClick={()=> searchfunctionality(searchempmail)} >&#128269;</button>
                 </div>
              </nav>
           </header>
           
           
            <div className="table">
                {/* <h1>Employee Details</h1> */}
                <button onClick={()=> navigate('/adminleavepage')} id="leavapplication-btn">Leave Apllication</button>
                <input id="filterbox" onChange={(e)=>filterfunctionality(e.target.value)} type="text" required autoComplete='="off' placeholder='Fiter your data by name..'/>
                <Table id="innertable" columns={coloumns} dataSource={emp}></Table>
                <button onClick={() => navigate('/add')} id="button" data-testid="adduserbtn"> Add User </button>

                
            </div>
</div> )}  
        

        </>
    );  

}