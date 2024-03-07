import React, { useState,useEffect } from "react";
import "../style/UserLeavePage.css"
import { motion } from "framer-motion";
import { useParams,useNavigate } from "react-router-dom";
import axios from 'axios';
import { Table } from "antd";
export default function UserLeavePage(){
  
  const nav = useNavigate();
  const {id}= useParams();
  const[name,setname]= useState('');
  const[startDate,setstartdate]= useState('');
  const[endDate,setenddate]= useState('');
  const[noOfDays,setnoOfDays]= useState('');
  const[reason,setreason]= useState('');
  const[leavebalance,setleavebalance]= useState('');
  const[leavestatus,setleavestatus]= useState('Pending');
  const[showForm, setShowForm] = useState(false);
  const[showStatus, setShowStatus] = useState(false);
  const [emp, setEmp] = useState([]);
  axios.get(`http://localhost:8080/divumemp/onerec/${id}`).then((response)=>{
        const resdata=response.data;
        setname(resdata.fname);
        setleavebalance(resdata.leavebalance);
        
    })
 

    useEffect(() => {
      fetch(`http://localhost:8080/divumempleave/fetchbymailid/${id}`)
          .then((res) => res.json())
          .then((result) => {
              const rev = result.reverse();
              
              setEmp(rev);
          });
  }, []);
    

    function handlestartdatechange(value){
      setstartdate(value);
    }

    function handleenddatechange(value){
      setenddate(value);
    }

    function handlereasonchange(value){
      setreason(value);
    }
    

    function back(){
      nav("/get")
    }

  

    function formsubmit(e){
      e.preventDefault();
      const start= new Date(startDate);
      const end= new Date(endDate);
      const timediff= end-start;
      const noOfDays= Math.floor(timediff/(1000*3600*24));
      const emp = { "emailid":id,"name":name,"startdate":startDate,"endDate":endDate,"numberOfDays":noOfDays,"reason":reason,"leavebalance":leavebalance,"leavestatus":leavestatus };
      fetch('http://localhost:8080/divumempleave/insertleave', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emp),
      })    

  

    }
    const coloumns=[{
      title:"Name",
      dataIndex: "name",

  },

  {
      title:"From-Date",
      dataIndex: "startdate",

  },

  {
      title:"To-Date",
      dataIndex: "endDate",

  },

  {
      title:"No of Days",
      dataIndex: "numberOfDays",

  },

  {
      title:"Reason",
      dataIndex: "reason",

  },



  {
      title:"Leave Balance",
      dataIndex: "leavebalance",

  },
  
  {
    title:"Status",
    dataIndex:"leavestatus",
    render: (text) =>{

      let cellcolor= '';

      if(text=== 'Pending'){
        cellcolor= 'yellow';
      } else if(text === 'Accepted'){
        cellcolor= 'green';
      } else if(text === 'Rejected'){
        cellcolor= 'red';
      }
      return <span style={{backgroundColor: cellcolor, display:'block', width:'50%',padding:'8px',borderRadius:'4px'}}>{text}</span>; 
    }
  }
  ]
    return(
        <>
        {  <button onClick={()=>setShowStatus(!showStatus)}> {showStatus ? ('Hide Status'):('Show Satatus') } </button>}
        { <button onClick={()=>setShowForm(!showForm)} > {showForm?('Cancel'):('Apply Leave')} </button>}
        {showStatus && <Table id="intable" columns={coloumns} dataSource={emp}/>}

       
        {showForm &&
        <motion.div
        initial={{ opacity: 0, scale: 0.25 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        >
        <div className="leave-form-container">
        <h2>Leave Request Form</h2>
        <form>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={id}
              disabled
            />
          </div>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={name}
              disabled
            />
          </div>
          <div className="form-group">
            <label className="startdate" >Start Date:</label>
            <input
              type="date"
              name="startDate"
              value={startDate}
              onChange={(e)=>handlestartdatechange(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="enddate">End Date:</label>
            <input
              type="date"
              name="endDate"
              value={endDate}
              onChange={(e)=>handleenddatechange(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label >Reason:</label>
            <textarea className="reasonlable"
        
              name="reason"
              value={reason}
              onChange={(e)=>handlereasonchange(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit" onClick={(e)=>formsubmit(e)}>Submit</button>
          
        </form>
      </div>
        </motion.div>}
        
        </>
    );
}