import {useState,useEffect} from "react";
// import {Link} from "react-router-dom";
import "../Styles/Dashboard.css";
import axios from "axios";
import Addvehicles from "./Addvehicles";
import Addinsurances from "./Addinsurances"
import Addmaintenances from "./Addmaintenances"
import Addfuellogs from "./Addfuellogs";

const Dashboard = () => {
  const [userData,setUserData] = useState({
    fullName:"",
    email:"",
    dob:"",
    licenseNo:""
  });
  const [stats,setStats] = useState({
    count:0,
    expiryDates:[{
      vehicleName:"",
      expDate:"",
    }],
  });

  const [selectedComponent,setSelectedComponent] = useState(0);


  useEffect(()=>{
  const userId =localStorage.getItem("userId");
  console.log(userId);
    axios.post("http://localhost:5500/getUserData",{
      userId:userId,
    })
      .then(res=>{
        console.log(res);
        console.log(res.data[0].FULLNAME);
        setUserData({
          fullName:res.data[0].FULLNAME,
          email:res.data[0].EMAIL,
          dob:res.data[0].DOB,
          licenseNo:res.data[0].LICENSENO
        })
      })
      .catch(err=>console.log(err));

    axios.post("http://localhost:5500/getStats",{
      userId:userId,
    })
      .then(res=>{
        console.log(res);
        console.log(res.data);     
        console.log(res.data.expiryDate[0].VEHICLE_NAME);  
          setStats({
            count:res.data.count,
            expiryDates:[{
              vehicleName:res.data.expiryDate[0].VEHICLE_NAME,
              expDate:res.data.expiryDate[0].EXPIRY_DATE
            }]
          });
      })
      .catch(err=>console.log(err));
  },[]);

  const handleSubmit = ()=>{
    setSelectedComponent(0);
  }
  
  return (
    <>
      <div className="dashboard">
        <h1>Dashboard</h1>
        <div className="userDetails">
          <h3>FullName:{userData.fullName}</h3>
          <h3>Email:{userData.email}</h3>
          <h3>DOB:{userData.dob}</h3>
          <h3>LicenseNo:{userData.licenseNo}</h3>
        </div>
        <div className="stats">
          <div className="box">
            <h3>Vehicles Owned</h3>
            <h3>{stats.count}</h3>
        </div>
        <div className="box">
          <h3>Insurance Expiry dates</h3>
          {stats.expiryDates.map((obj,index)=>(
            <p key={index}>{obj.vehicleName}:{obj.expDate}</p>
          )
          )}  
        </div>
        </div>
        <div className="addBtns">
            <h3>Add</h3>
            <button onClick={()=>setSelectedComponent(1)}>Add Vehicle</button>
            <button onClick={()=>setSelectedComponent(2)}>Add Insurance</button>
            <button onClick={()=>setSelectedComponent(3)}>Add Maintenace</button>
            <button onClick={()=>setSelectedComponent(4)}>Add Fuel Log</button>
            </div>
        <div className="views">
            <h3>View</h3>
        </div>
      </div>
            {selectedComponent === 1 && 
              <div className="formCont1">
                <div className="formCont2">
                  <button className="closeBtn" onClick={()=>setSelectedComponent(0)}>
                  <i className="fa-solid fa-rectangle-xmark"></i></button>
                  <Addvehicles onSubmit={handleSubmit}/>
                </div>
              </div>
            }
            {selectedComponent === 2 && 
              <div className="formCont1">
                <div className="formCont2">
                  <button className="closeBtn" onClick={()=>setSelectedComponent(0)}>
                  <i className="fa-solid fa-rectangle-xmark"></i></button>
                  <Addinsurances onSubmit={handleSubmit}/>
                </div>
              </div>
            }
            {selectedComponent === 3 && 
              <div className="formCont1">
                <div className="formCont2">
                  <button className="closeBtn" onClick={()=>setSelectedComponent(0)}>
                  <i className="fa-solid fa-rectangle-xmark"></i></button>
                  <Addmaintenances onSubmit={handleSubmit}/>
                </div>
              </div>
            }
            {selectedComponent === 4 && 
              <div className="formCont1">
                <div className="formCont2">
                  <button className="closeBtn" onClick={()=>setSelectedComponent(0)}>
                  <i className="fa-solid fa-rectangle-xmark"></i></button>
                  <Addfuellogs onSubmit={handleSubmit}/>
                </div>
              </div>
            }
    </>
  );
};

export default Dashboard;
