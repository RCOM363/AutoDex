import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import "../Styles/Signup.css";

const Signup = () => {
  const [signupData,setSignupData] = useState({
    fullName:"",
    dateOfBirth:"",
    email:"",
    phoneNumber:"",
    password:"",
    licenseNumber:""
  });

const navigate = useNavigate();

  const handleSubmit = (event)=>{
    event.preventDefault();
    console.log(signupData);
    const {fullName,dateOfBirth,email,phoneNumber,password,licenseNumber} = signupData
    console.log(fullName,dateOfBirth,email,phoneNumber,password,licenseNumber);    
    axios.post("http://localhost:5500/signup",signupData)
      .then(res=>{
        console.log(res);
        console.log(res.data);
        localStorage.setItem("userId",JSON.stringify(res.data.user_id));
        navigate("/Dashboard");
        
      })
      .catch(err=>console.log(err));
  }

  const handleChange = (event) =>{
    event.preventDefault();
    setSignupData((prevState)=>({...prevState,[event.target.name]:event.target.value}));
  }

  return (
    <>
      <form onSubmit={(event)=>handleSubmit(event)} className="signup">
        <h3>Fill in the below Details to create an Account</h3>
        <div className="incont">
          <input id="fullName" name="fullName" type="text" placeholder=" " required value={signupData.fullName} onChange={(event)=> handleChange(event)} />
          <label htmlFor="fullName">Full Name</label>
        </div>
        <div className="incont">
          <input id="dateOfBirth" name="dateOfBirth" type="text" placeholder=" " required value={signupData.dateOfBirth} onChange={(event)=> handleChange(event)}/>
          <label htmlFor="dateOfBirth">Date of Birth(yyyy-mm-dd)</label>
        </div>
        <div className="incont">
          <input id="email" name="email" type="email" placeholder=" " required value={signupData.email} onChange={(event)=> handleChange(event)}/>
          <label htmlFor="email">Email</label>
        </div>
        <div className="incont">
          <input id="phoneNumber" name="phoneNumber" type="number" placeholder=" " required value={signupData.phoneNumber} onChange={(event)=> handleChange(event)}/>
          <label htmlFor="phoneNumber">Phone Number</label>
        </div>
        <div className="incont">
          <input id="password" name="password" type="password" placeholder=" " required value={signupData.password} onChange={(event)=> handleChange(event)}/>
          <label htmlFor="password">Password</label>
        </div>
        <div className="incont">
          <input id="licenseNumber" name="licenseNumber" type="text" placeholder=" " required value={signupData.licenseNumber} onChange={(event)=> handleChange(event)}/>
          <label htmlFor="licenseNumber">License Number</label>
        </div>
        <button type="submit">Signup</button>
        <div className="link">
        <p>Already have an account?&nbsp;<Link to="/Signin"><b>Signin</b></Link> </p>
        </div>
      </form>
      
    </>
  );
};

export default Signup;
