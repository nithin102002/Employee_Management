import React from "react";
import { useState,useEffect } from "react";
import { Button, Table } from "antd";
import "../style/AdminLeaveApplication.css" 

export default function AdminLeaveApplication(){

    const [emp, setEmp] = useState([]);
    const obj={
        "email":'',
        "name":'',
        "startdate":'',
        "endDate":'',
        "numberOfDays":'',
        "reason":'',
        "leavebalance":'',
        "leavestatus":''
    }

    useEffect(() => {
        fetch("http://localhost:8080/divumempleave/fetchleave")
            .then((res) => res.json())
            .then((result) => {
                const rev = result.reverse();
                
                setEmp(rev);
            });
    }, []);

    function accepted(record)
    {
        obj.email=record.email;
        obj.name= record.name;
        obj.startdate=record.startdate;
        obj.endDate=record.endDate;
        obj.numberOfDays=record.numberOfDays;
        obj.reason=record.reason;
        obj.leavebalance= parseInt(record.leavebalance) - parseInt(record.numberOfDays);
        obj.leavestatus='Accepted';
        console.log("Acitbve");
            fetch(`http://localhost:8080/divumempleave/editleave/${record.emailid}`,{
                method:'PUT',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(obj)
            }
            ).then(window.location.reload())
    }

    function rejeced(record)
    {
        obj.email=record.email;
        obj.name= record.name;
        obj.startdate=record.startdate;
        obj.endDate=record.endDate;
        obj.numberOfDays=record.numberOfDays;
        obj.reason=record.reason;
        obj.leavebalance= record.leavebalance;
        obj.leavestatus='Rejected';
        console.log("Acitbve");
            fetch(`http://localhost:8080/divumempleave/editleave/${record.emailid}`,{
                method:'PUT',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(obj)
            }
            ).then(window.location.reload())
    }
    const coloumns=[

        {
            title:"Email-id",
            dataIndex: "emailid",

        },

        {
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
            title: "Approval Status",
            render: (res) => (
                <>
                <button id="Accept" onClick={()=> accepted(res)} > Accept </button>
                <button id="Denied" onClick={()=> rejeced(res)}>Denied</button></>
            ),
        },
    ]

    return(
        <>
        <div>Leave Applications</div>
        <Table id="innertable" columns={coloumns} dataSource={emp}></Table>
        </>
    )
}